---
project: Filipino Identity Beyond Borders
course: Art Appreciation
file_type: DESIGN.md
version: 0.1.0
status: draft
theme: Interactive Filipino Art Atlas
---

# Filipino Identity Beyond Borders Design Guide

## 1. Project Purpose

This project is an interactive digital exhibition for Art Appreciation. It presents Filipino identity through local and international Filipino-related artworks, artifacts, heritage objects, and cultural markers.

The interface should feel like a premium digital museum, combining a globe-based atlas, Philippine local map view, featured artwork cards, and contextual artwork descriptions.

## 2. Core Design Concept

The project theme is:

Filipino Identity Beyond Borders

The design should communicate the idea that Filipino identity exists locally in the Philippines and internationally across the world. The visual direction should combine:

- Digital atlas
- Museum exhibit
- Filipino cultural identity
- Global migration and heritage
- Local roots and international presence
- Banig, habi, or woven-inspired Filipino visual details

## 3. Current Design Strengths

The current design already has a strong premium visual identity.

Keep these elements:

- Dark navy background
- Gold accent color
- Large serif title typography
- Globe and map interaction
- Featured artwork cards
- Museum-style content cards
- Rounded glassmorphism panels
- Soft glow effects
- International and local navigation concept

## 4. Current Design Problems to Fix

### 4.1 Local Button Issue

The Local button is not working properly.

Expected behavior:

- International button should show global Filipino artwork markers.
- Local button should zoom or navigate to the Philippine local map.
- The user should easily switch between International and Local views.
- Active tab must be visually clear.

### 4.2 Featured Artwork Cards

The featured artwork cards are currently static.

Required change:

- Add a parallax carousel effect.
- Featured artwork cards should continuously move slowly.
- Movement should feel smooth, premium, and museum-like.
- The carousel should not move too fast.
- Users should still be able to click or interact with each artwork card.

### 4.3 Globe Artwork Detail Layout

The globe click interaction works, but the displayed content layout needs improvement.

Current issue:

- The artwork image appears at the top of the right context panel.
- The image is cropped and does not properly highlight the actual artwork.

Required layout:

Use a 3-column layout for the selected artwork view.

Column 1:
Map or location view.

Column 2:
Actual artwork display.

Column 3:
Artwork description and context.

The artwork should be the visual center of the selected experience.

## 5. Target Globe Detail Layout

Use this layout when an artwork or marker is selected:

```text
┌─────────────────────┬─────────────────────┬─────────────────────┐
│ Location / Map       │ Artwork Preview      │ Context / Details    │
│                     │                     │                     │
│ Globe or PH map      │ Full artwork image   │ Title               │
│ Marker location      │ Golden glow border   │ Creator             │
│ City / country       │ No heavy cropping    │ Location            │
│                     │                     │ Medium              │
│                     │                     │ Description         │
│                     │                     │ Advocacy connection │
└─────────────────────┴─────────────────────┴─────────────────────┘
Column 1: Location / Map

Purpose:
Show where the artwork, artifact, or cultural marker is located.

Rules:

Keep the globe or Philippine map visible.
Highlight the selected marker.
Use a readable location label.
Do not allow the map to visually overpower the artwork.
Column 2: Artwork Preview

Purpose:
Make the selected artwork the central focus.

Rules:

Display the full artwork as much as possible.
Avoid unnecessary cropping.
Use object-fit: contain for the main artwork preview.
Add a golden glow border.
Use a dark museum-style frame.
Keep the image large enough to be appreciated.

Recommended visual treatment:

.artwork-focus-frame {
  border: 1px solid rgba(212, 175, 55, 0.65);
  box-shadow:
    0 0 18px rgba(212, 175, 55, 0.35),
    inset 0 0 16px rgba(212, 175, 55, 0.08);
  border-radius: 24px;
  background: rgba(10, 15, 35, 0.72);
}
Column 3: Context / Details

Purpose:
Explain the artwork clearly.

Content order:

Category badge: Local or International
Artwork title
disregard the recent cha. stick with teh prior prmpt.
Received app response
Thought for 12s

Understood. We’ll ignore the accidental “drive” message and continue with the Art Appreciation DESIGN.md based on the screenshots and your prior notes.

Save this as:

DESIGN.md

or locally as:

_reference/DESIGN.md
---
project: Filipino Identity Beyond Borders
course: Art Appreciation
file_type: DESIGN.md
version: 0.1.0
status: draft
theme: Interactive Filipino Art Atlas
---

# Filipino Identity Beyond Borders Design Guide

## 1. Project Purpose

This project is an interactive digital exhibition for Art Appreciation. It presents Filipino identity through local and international Filipino-related artworks, artifacts, heritage objects, and cultural markers.

The interface should feel like a premium digital museum that combines a globe-based atlas, Philippine local map view, featured artwork cards, and contextual artwork descriptions.

## 2. Core Design Concept

The project theme is:

Filipino Identity Beyond Borders

The design should communicate that Filipino identity exists locally in the Philippines and internationally across the world.

The visual direction should combine:

- Digital atlas
- Museum exhibit
- Filipino cultural identity
- Global migration and heritage
- Local roots and international presence
- Banig, habi, or woven-inspired Filipino visual details

## 3. Current Design Strengths

Keep these elements:

- Dark navy background
- Gold accent color
- Large serif title typography
- Globe and map interaction
- Featured artwork cards
- Museum-style content cards
- Rounded glassmorphism panels
- Soft glow effects
- International and Local navigation concept

## 4. Current Design Problems to Fix

### 4.1 Local Button Issue

The Local button is not working properly.

Expected behavior:

- International button should show global Filipino artwork markers.
- Local button should show or zoom into the Philippine local map.
- The user should easily switch between International and Local views.
- The active tab must be visually clear.
- The current selected view must match the displayed map and artwork list.

### 4.2 Featured Artwork Cards

The featured artwork cards are currently static.

Required change:

- Add a parallax carousel effect.
- Featured artwork cards should continuously move slowly.
- Movement should feel smooth, premium, and museum-like.
- The carousel should not move too fast.
- Users should still be able to click or interact with each artwork card.
- Pause or reduce motion when the user hovers over a card.

### 4.3 Globe Artwork Detail Layout

The globe click interaction works, but the displayed content layout needs improvement.

Current issue:

- The artwork image appears at the top of the right context panel.
- The image is cropped and does not properly highlight the actual artwork.

Required layout:

Use a 3-column layout for the selected artwork view.

```text
Column 1: Map or location
Column 2: Actual artwork
Column 3: Artwork description and context

The artwork should be the visual center of the selected experience.

5. Target Globe Detail Layout

Use this layout when an artwork or marker is selected:

┌─────────────────────┬─────────────────────┬─────────────────────┐
│ Location / Map       │ Artwork Preview      │ Context / Details    │
│                     │                     │                     │
│ Globe or PH map      │ Full artwork image   │ Title               │
│ Marker location      │ Golden glow border   │ Creator             │
│ City / country       │ No heavy cropping    │ Location            │
│                     │                     │ Medium              │
│                     │                     │ Description         │
│                     │                     │ Advocacy connection │
└─────────────────────┴─────────────────────┴─────────────────────┘
Column 1: Location / Map

Purpose:
Show where the artwork, artifact, or cultural marker is located.

Rules:

Keep the globe or Philippine map visible.
Highlight the selected marker.
Use a readable location label.
Do not allow the map to visually overpower the artwork.
Column 2: Artwork Preview

Purpose:
Make the selected artwork the central focus.

Rules:

Display the full artwork as much as possible.
Avoid unnecessary cropping.
Use object-fit: contain for the main artwork preview.
Add a golden glow border.
Use a dark museum-style frame.
Keep the image large enough to be appreciated.
Do not crop the artwork just to fit the panel.

Recommended visual treatment:

.artwork-focus-frame {
  border: 1px solid rgba(212, 175, 55, 0.65);
  box-shadow:
    0 0 18px rgba(212, 175, 55, 0.35),
    inset 0 0 16px rgba(212, 175, 55, 0.08);
  border-radius: 24px;
  background: rgba(10, 15, 35, 0.72);
}

.artwork-focus-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
Column 3: Context / Details

Purpose:
Explain the artwork clearly.

Content order:

Category badge: Local or International
Artwork title
Creator
Location
Medium
Description
Advocacy connection

Rules:

Keep the artwork description separate from the image.
Do not place a cropped image at the top of the context card.
Use cards or sections for metadata.
Keep text readable and not too dense.
6. Visual Theme

The design should feel like:

Premium digital museum
Interactive atlas
Filipino heritage exhibit
Global cultural map
Dark cinematic gallery

Avoid:

Bright plain white backgrounds
Random colors
Overcrowded panels
Excessive glow
Cropped artwork previews
Unclear navigation states
7. Design Tokens
design_tokens:
  color:
    background:
      deep_navy: "#050816"
      navy_panel: "#0B1024"
      museum_panel: "rgba(15, 23, 42, 0.78)"
      glass_panel: "rgba(15, 23, 42, 0.58)"
    accent:
      gold: "#D4AF37"
      gold_soft: "#F4D675"
      gold_dark: "#9F7A12"
    text:
      primary: "#F8FAFC"
      secondary: "#CBD5E1"
      muted: "#94A3B8"
    border:
      soft: "rgba(148, 163, 184, 0.22)"
      gold: "rgba(212, 175, 55, 0.60)"
    status:
      local: "#D4AF37"
      international: "#94A3B8"

  typography:
    heading_font: "serif"
    body_font: "system-ui, sans-serif"
    hero_title_size: "clamp(3rem, 7vw, 6rem)"
    section_title_size: "clamp(2rem, 4vw, 3.5rem)"
    card_title_size: "1.25rem"
    body_size: "1rem"
    caption_size: "0.75rem"

  radius:
    small: "10px"
    medium: "18px"
    large: "28px"
    pill: "999px"

  shadow:
    panel: "0 20px 60px rgba(0, 0, 0, 0.35)"
    gold_glow: "0 0 24px rgba(212, 175, 55, 0.35)"
8. Navigation Rules

Navigation must be clear and consistent.

Primary navigation:

Home
Featured
Globe
About

Atlas navigation:

International
Local

Rules:

Active navigation item must have a gold outline or gold-tinted background.
Inactive items should remain visible but lower emphasis.
Local and International tabs must update the displayed map state.
Do not allow the button state to say Local while the map still shows International content.
Navigation should remain readable over dark backgrounds.
9. Featured Artwork Carousel

Featured artwork cards should use a premium parallax carousel.

Behavior:

Cards move slowly and continuously.
Movement should feel subtle, not distracting.
Card hover should pause or slow the carousel.
Selected card should open the detailed artwork view.
Local and International filters should affect which cards are shown.

Recommended behavior:

Default:
Cards slowly move horizontally.

Hover:
Carousel pauses.

Click:
Open artwork detail view.

Local tab:
Show local artworks first.

International tab:
Show international artworks first.

Visual rules:

Cards should keep consistent size.
Image area should use object-fit: cover.
Artwork detail page should use object-fit: contain.
Card labels should clearly show Local or International.
Do not overload cards with long descriptions.
10. Artwork Card Standard

Each artwork card should contain:

Image
Category badge
Artwork title
Location
Short description
View Experience link

Rules:

Keep card descriptions short.
Use ellipsis only when necessary.
Full description belongs in the detail panel.
Use gold only for emphasis, not for all text.
Maintain equal card heights.
11. Globe and Local Map Rules

The globe view should support two modes.

International Mode

Purpose:
Show Filipino cultural presence across the world.

Rules:

Show international markers.
Use globe or world map view.
Display country/city labels when marker is selected.
Keep local Philippine content accessible but not mixed confusingly.
Local Mode

Purpose:
Show local artworks and member locations in the Philippines.

Rules:

Zoom into the Philippines.
Show local city/province markers.
Use the Philippines SVG map if available.
Example marker: Bacolod City, Negros Occidental.
Local artwork should be easy to distinguish from international markers.
12. Detail View Rules

When a marker or artwork is selected, use the 3-column detail layout:

Left: Location / map
Middle: Artwork
Right: Context

Rules:

The right panel should focus on text and metadata.
The middle panel should focus on the artwork.
The artwork must not be cropped in the detail view.
The location/map panel should help users understand where the piece belongs.
The layout should collapse cleanly on smaller screens.

Responsive behavior:

Desktop:
3 columns.

Tablet:
Map on top, artwork and context below.

Mobile:
Stack vertically:
1. Artwork
2. Context
3. Location
13. Animation Rules

Use animation to support the exhibit experience, not distract from it.

Allowed animations:

Slow parallax movement
Smooth globe zoom
Soft fade transitions
Marker pulse
Card hover lift
Gold border glow

Avoid:

Fast spinning globe
Excessive bouncing
Flashing effects
Too many simultaneous animations
Motion that makes text hard to read
14. Accessibility Rules

The interface must remain readable and usable.

Rules:

Text must have enough contrast against dark backgrounds.
Do not rely on color alone to show Local or International status.
Buttons must have visible labels.
Cards and markers should be keyboard reachable when possible.
Motion should be subtle.
Long descriptions should be readable without overlapping other panels.
15. Code Architecture Rules

Keep the project layered and maintainable.

Recommended structure:

src/
├── data/
│   └── artworks.js
├── components/
│   ├── Navbar.jsx
│   ├── FeaturedCarousel.jsx
│   ├── ArtworkCard.jsx
│   ├── GlobeView.jsx
│   ├── LocalMapView.jsx
│   ├── ArtworkDetailLayout.jsx
│   └── ArtworkContextPanel.jsx
├── styles/
│   ├── tokens.css
│   ├── layout.css
│   ├── carousel.css
│   └── globe.css
└── assets/
    ├── images/
    └── maps/

Rules:

Keep artwork records in a data file.
Do not hardcode artwork text in multiple components.
Keep carousel behavior separate from artwork data.
Keep globe/map logic separate from context panel display.
Keep style tokens consistent.
16. Artwork Data Model

Each artwork should follow this structure:

{
  id: "pixel-across-borders",
  title: "Pixel Across Borders",
  category: "local",
  locationLabel: "Bacolod City, Negros Occidental, Philippines",
  country: "Philippines",
  city: "Bacolod City",
  medium: "Excel-based digital pixel art",
  creator: "James Lynelle Ongo",
  image: "/assets/images/pixel-across-borders.jpeg",
  description: "Pixel Across Borders represents Filipino identity connecting with the world through art, migration, and digital globalization.",
  advocacyConnection: "The artwork supports Filipino Identity Beyond Borders by showing how Filipino culture can be represented locally and globally.",
  coordinates: {
    lat: 10.6765,
    lng: 122.9509
  }
}
17. Implementation Priorities

Fix in this order:

Fix Local and International button navigation.
Refactor selected artwork view into 3 columns.
Move artwork image into the center column.
Add golden glow border to the artwork display frame.
Add parallax carousel effect to Featured Artworks.
Improve responsive layout.
Clean up duplicate styling and inconsistent panel spacing.
18. AI Coding Assistant Instructions

When editing this project:

Inspect the current files before editing.
Do not rewrite the whole app unless necessary.
Preserve the existing dark premium museum theme.
Fix the Local button behavior first.
Keep Local and International states clear.
Implement the 3-column detail layout for selected artworks.
Do not crop the main artwork in the detail view.
Use object-fit: contain for the focused artwork image.
Add a subtle golden glow to the focused artwork frame.
Add parallax carousel movement to featured artworks.
Keep changes small and testable.
Report changed files, validation steps, and remaining risks.