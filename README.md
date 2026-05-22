Interactive Art Appreciation Gallery
Filipino Art in This Day and Age: Identity Beyond Borders
Overview
This project is an interactive web application developed for MO-HUM034 Art Appreciation. It presents a digital exhibition of original artworks created by Group 15, showing how Filipino art continues to evolve through diverse mediums, personal stories, local places, and global cultural connections.
The project combines the group advocacy Filipino Art in This Day and Age: Diversity, Evolution, and Identity with the concept of Filipino Identity Beyond Borders. Through an interactive globe, moving artwork cards, and hover-based artwork effects, the exhibition highlights how Filipino identity can be expressed through modern, traditional, digital, and personal forms of art.
Purpose
This project aims to show that Filipino art is not limited to one form, style, or location. Instead, it continues to grow through the personal experiences, cultural background, and creative choices of Filipino artists today.
The exhibition emphasizes:
the diversity of Filipino art in the present day
the connection between art, identity, culture, and place
the evolution of Filipino artistic expression through different mediums
the role of personal stories in shaping meaningful artwork
the idea that Filipino identity can extend beyond borders through art and digital presentation
Featured Artworks
The project includes original artworks by members of Group 15:
Pixel Across Borders by Ongo, James
Ang Original Artwork by Ang, Monica
The Weight of Tradition and Vivid Identity by Jadloc, Ly-anne
Viloria Original Artwork by Viloria, Robert
Locations
The artworks are mapped using each artist's local location:
Ongo, James: Bacolod City, Negros Occidental
Ang, Monica: Davao City
Jadloc, Ly-anne: Sagay City, Negros Occidental
Viloria, Robert: Las Piñas City
Features
Interactive globe interface showing local and international markers
Moving artwork card carousel with manual forward and backward navigation
Hover-triggered artwork transition effects
Vertical blinds reveal effect for Pixel Across Borders
Collage assembly effect for Ang's artwork
Charcoal-to-vivid transition with mini navigation for Jadloc's two artworks
Split-and-combine transition effect for Viloria's artwork
Artwork detail panel with title, artist, location, and advocacy connection
Responsive dark cinematic interface with gold accent styling
Group information footer section
Group Information
Section: A1101  
Group: 15
Members:
Ang, Monica
Jadloc, Ly-anne
Ongo, James
Viloria, Robert
Project Structure
```txt
src/
  app/
    components/
      artwork/
      globe/
      layout/
  data/
  styles/

public/
  resources/
```
Tech Stack
React
Vite
TypeScript
Three.js / Globe visualization
CSS animations
Figma Make for UI prototyping
Cloudflare Pages for deployment
Running the Project Locally
Install dependencies:
```bash
npm install
npm install
```

Run the development server:

Run the development server:
```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

If PowerShell blocks `npm.ps1`, use the Windows command shim instead:

```bash
npm.cmd run build
```

## Deployment

This project can be deployed using Cloudflare Pages.

For direct upload deployment:

1. Run the production build.
2. Open the generated `dist` folder.
3. Upload the `dist` folder to Cloudflare Pages using Direct Upload.

Build settings for Git-based deployment:

```txt
Build command: npm run build
Build output directory: dist
```

## Notes

* The artworks are used for academic presentation purposes under MO-HUM034 Art Appreciation.
* The interactive effects are applied as overlays and transitions only.
* The original artwork compositions are preserved and are not redrawn or altered.
* The project is designed as a digital exhibition for presenting Filipino art, identity, and creative diversity in this day and age.

## Author

Developed by Group 15 for MO-HUM034 Art Appreciation, Section A1101.
Build the production version:
```bash
npm run build
```
If PowerShell blocks `npm.ps1`, use the Windows command shim instead:
```bash
npm.cmd run build
```
Deployment
This project can be deployed using Cloudflare Pages.
For direct upload deployment:
Run the production build.
Open the generated `dist` folder.
Upload the `dist` folder to Cloudflare Pages using Direct Upload.
Build settings for Git-based deployment:
```txt
Build command: npm run build
Build output directory: dist
```
Notes
The artworks are used for academic presentation purposes under MO-HUM034 Art Appreciation.
The interactive effects are applied as overlays and transitions only.
The original artwork compositions are preserved and are not redrawn or altered.
The project is designed as a digital exhibition for presenting Filipino art, identity, and creative diversity in this day and age.
Author
Developed by Group 15 for MO-HUM034 Art Appreciation, Section A1101.
