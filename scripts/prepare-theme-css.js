import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const sourcePath = resolve(projectRoot, "src/styles/theme.css");
const outputPath = resolve(projectRoot, "src/styles/theme.generated.css");

const sourceCss = readFileSync(sourcePath, "utf8");

const fixedCss = sourceCss.replace(
  /(\.source-group-heading\s*\{[\s\S]*?border-bottom:\s*1px solid rgba\(255,\s*255,\s*255,\s*0\.06\);\s*)(\.source-list-row\s*\{)/,
  "$1}\n\n$2",
);

if (fixedCss === sourceCss) {
  console.log("Theme CSS checked. No generated syntax repair was needed.");
} else {
  console.log("Theme CSS generated with repaired .source-group-heading block.");
}

writeFileSync(outputPath, fixedCss, "utf8");
