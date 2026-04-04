
# Interactive Art Appreciation UI

**Mapping Filipino Heritage Abroad**

## Overview

This project is an interactive web application developed for Art Appreciation. It visualizes Filipino arts, artifacts, and cultural heritage found around the world using a globe-based interface.

The goal of the project is to show not only where these objects are located, but also their cultural meaning, historical context, and how Filipino identity is represented and appreciated globally.

## Purpose

Rather than focusing solely on ownership or acquisition, this project emphasizes:

* the global presence of Filipino culture
* the cultural and artistic significance of each object
* how Filipino heritage is preserved and interpreted in international spaces

Through an interactive globe, users can explore how Filipino identity extends beyond national borders.

## Features

* Interactive 3D globe visualization of artifact locations
* Clickable markers representing Filipino cultural objects worldwide
* Artifact detail panel with description and cultural significance
* Category-based filtering (Art, Religious, Indigenous, Historical, Contemporary)
* Featured items highlighting selected artifacts

## Project Structure

* `src/data/` - JSON datasets (objects, categories, locations, institutions)
* `public/images/` - image assets for artifacts
* `scripts/` - data import and transformation scripts
* `src/components/` - UI and globe components

## Tech Stack

* React (frontend framework)
* Globe.gl / Three.js (3D globe visualization)
* Figma Make (UI design and layout prototyping)
* Netlify (deployment)

## Running the Project

Install dependencies:

```bash
npm i
```

Run development server:

```bash
npm run dev
```

## Notes

* The dataset is currently in preparation and will be populated from an Excel source file.
* Images are stored separately and linked via structured data (ID-based references).
* Geographic coordinates will be added to enable accurate globe plotting.

## Author

Developed as part of an Art Appreciation project exploring the global presence and cultural significance of Filipino heritage.
