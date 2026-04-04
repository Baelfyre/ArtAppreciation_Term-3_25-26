import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REQUIRED_HEADERS = [
  'Object Name',
  'Category',
  'Current Location',
  'Institution',
  'Philippine Origin',
  'Date/Period',
  'Material/Medium',
  'Description',
  'Artistic/Cultural Significance',
  'How It Reached That Location',
  'Why It Matters Today',
];

const FIELD_MAP = {
  'Object Name': 'object_name',
  Category: 'category',
  'Current Location': 'current_location',
  Institution: 'institution',
  'Philippine Origin': 'philippine_origin',
  'Date/Period': 'date_period',
  'Material/Medium': 'material_medium',
  Description: 'description',
  'Artistic/Cultural Significance': 'artistic_cultural_significance',
  'How It Reached That Location': 'how_it_reached_location',
  'Why It Matters Today': 'why_it_matters_today',
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const inputCandidates = [
  {
    relativePath: path.join('src', 'data', 'raw', 'Map Datasets.xlsx'),
    required: true,
  },
  {
    // This fallback keeps the scaffold usable with the workbook currently in the repo.
    relativePath: path.join('src', 'data', 'raw', 'Map', 'Map Datasets.xlsx'),
    required: false,
  },
];

const outputFiles = {
  objects: path.join(projectRoot, 'src', 'data', 'objects.json'),
  categories: path.join(projectRoot, 'src', 'data', 'categories.json'),
  locations: path.join(projectRoot, 'src', 'data', 'locations.json'),
  institutions: path.join(projectRoot, 'src', 'data', 'institutions.json'),
};

function normalizeValue(value) {
  if (value === undefined || value === null) {
    return '';
  }

  return String(value).trim();
}

function normalizeLookupKey(value) {
  return normalizeValue(value).toLowerCase();
}

function formatId(prefix, index) {
  return `${prefix}${String(index).padStart(3, '0')}`;
}

function ensureDirectory(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeJson(filePath, data) {
  ensureDirectory(filePath);
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

async function loadXlsx() {
  try {
    const xlsxModule = await import('xlsx');
    return xlsxModule.default ?? xlsxModule;
  } catch (error) {
    if (
      error?.code === 'ERR_MODULE_NOT_FOUND' ||
      error?.message?.includes("Cannot find package 'xlsx'")
    ) {
      throw new Error(
        'The "xlsx" package is not installed. Run `npm install` before running `npm run import:dataset`.',
      );
    }

    throw error;
  }
}

function resolveInputPath() {
  for (const candidate of inputCandidates) {
    const absolutePath = path.join(projectRoot, candidate.relativePath);
    if (fs.existsSync(absolutePath)) {
      return {
        absolutePath,
        relativePath: candidate.relativePath,
        isFallback: !candidate.required,
      };
    }
  }

  const expectedPaths = inputCandidates.map((candidate) => candidate.relativePath).join(' or ');
  throw new Error(`Excel file not found. Expected the workbook at ${expectedPaths}.`);
}

function validateHeaders(headerRow) {
  const normalizedHeaders = new Set(headerRow.map((header) => normalizeValue(header)));
  const missingHeaders = REQUIRED_HEADERS.filter((header) => !normalizedHeaders.has(header));

  if (missingHeaders.length > 0) {
    console.log('Required headers found: no');
    throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
  }

  console.log('Required headers found: yes');
}

function normalizeRow(row) {
  return Object.fromEntries(
    Object.entries(FIELD_MAP).map(([header, key]) => [key, normalizeValue(row[header])]),
  );
}

function isEmptyRow(row) {
  return Object.values(row).every((value) => value === '');
}

function createCategoryStore() {
  const categories = [];
  const categoryIdsByName = new Map();

  function getCategoryId(categoryName) {
    const normalizedName = normalizeValue(categoryName);
    if (!normalizedName) {
      return '';
    }

    const lookupKey = normalizeLookupKey(normalizedName);
    const existingId = categoryIdsByName.get(lookupKey);
    if (existingId) {
      return existingId;
    }

    const categoryId = formatId('CAT', categories.length + 1);
    categoryIdsByName.set(lookupKey, categoryId);
    categories.push({
      category_id: categoryId,
      category_name: normalizedName,
    });

    return categoryId;
  }

  return {
    categories,
    getCategoryId,
  };
}

function createLocationStore() {
  const locations = [];
  const locationIdsByName = new Map();

  function getLocationId(currentLocation) {
    const normalizedLocation = normalizeValue(currentLocation);
    if (!normalizedLocation) {
      return '';
    }

    const lookupKey = normalizeLookupKey(normalizedLocation);
    const existingId = locationIdsByName.get(lookupKey);
    if (existingId) {
      return existingId;
    }

    const locationId = formatId('LOC', locations.length + 1);
    locationIdsByName.set(lookupKey, locationId);
    locations.push({
      location_id: locationId,
      current_location: normalizedLocation,
      city: '',
      country: '',
      lat: null,
      lng: null,
    });

    return locationId;
  }

  return {
    locations,
    getLocationId,
  };
}

function createInstitutionStore() {
  const institutions = [];
  const institutionIdsByKey = new Map();

  function getInstitutionId(institutionName, locationId) {
    const normalizedInstitution = normalizeValue(institutionName);
    if (!normalizedInstitution) {
      return '';
    }

    const lookupKey = `${normalizeLookupKey(normalizedInstitution)}::${locationId}`;
    const existingId = institutionIdsByKey.get(lookupKey);
    if (existingId) {
      return existingId;
    }

    const institutionId = formatId('INS', institutions.length + 1);
    institutionIdsByKey.set(lookupKey, institutionId);
    institutions.push({
      institution_id: institutionId,
      institution_name: normalizedInstitution,
      location_id: locationId,
    });

    return institutionId;
  }

  return {
    institutions,
    getInstitutionId,
  };
}

async function main() {
  const XLSX = await loadXlsx();
  const inputFile = resolveInputPath();

  if (inputFile.isFallback) {
    console.log(
      `Primary workbook not found. Using fallback workbook at ${inputFile.relativePath}.`,
    );
  }

  const workbook = XLSX.readFile(inputFile.absolutePath);
  if (workbook.SheetNames.length === 0) {
    throw new Error('The Excel workbook does not contain any sheets.');
  }

  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const [headerRow = []] = XLSX.utils.sheet_to_json(firstSheet, {
    header: 1,
    raw: false,
    defval: '',
  });

  validateHeaders(headerRow);

  // Read rows using the header row, then normalize values into the JSON schema we want.
  const normalizedRows = XLSX.utils
    .sheet_to_json(firstSheet, {
      raw: false,
      defval: '',
    })
    .map((row) => normalizeRow(row))
    .filter((row) => !isEmptyRow(row));

  console.log(`Data rows detected: ${normalizedRows.length}`);

  const categoryStore = createCategoryStore();
  const locationStore = createLocationStore();
  const institutionStore = createInstitutionStore();

  const objects = normalizedRows.map((row, index) => {
    const categoryId = categoryStore.getCategoryId(row.category);
    const locationId = locationStore.getLocationId(row.current_location);
    const institutionId = institutionStore.getInstitutionId(row.institution, locationId);

    return {
      object_id: formatId('OBJ', index + 1),
      object_name: row.object_name,
      category_id: categoryId,
      location_id: locationId,
      institution_id: institutionId,
      philippine_origin: row.philippine_origin,
      date_period: row.date_period,
      material_medium: row.material_medium,
      description: row.description,
      artistic_cultural_significance: row.artistic_cultural_significance,
      how_it_reached_location: row.how_it_reached_location,
      why_it_matters_today: row.why_it_matters_today,
      image_file: '',
      featured: false,
    };
  });

  writeJson(outputFiles.objects, objects);
  writeJson(outputFiles.categories, categoryStore.categories);
  writeJson(outputFiles.locations, locationStore.locations);
  writeJson(outputFiles.institutions, institutionStore.institutions);

  console.log(`Objects exported: ${objects.length}`);
  console.log(`Categories exported: ${categoryStore.categories.length}`);
  console.log(`Locations exported: ${locationStore.locations.length}`);
  console.log(`Institutions exported: ${institutionStore.institutions.length}`);
}

main().catch((error) => {
  console.error(`Dataset import failed: ${error.message}`);
  process.exit(1);
});
