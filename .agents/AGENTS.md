# Developer Mistakes Log & Prevention Guidelines

This workspace customization file outlines the core coding mistakes made during development, their underlying causes, and guidelines to avoid them in future turns.

---

## 1. Missing Lucide Icon Imports
- **Mistake**: Used the `TrendingUp` icon inside a dynamic data structure without importing it at the top of the file, causing a build failure.
- **Root Cause**: Adding visual indicators without cross-checking the file's imports header.
- **Rule**: Every time a Lucide icon component is added, explicitly verify that it is listed in the `lucide-react` import statement at the top of that file.

---

## 2. Sticky Element Overlaps
- **Mistake**: Positioned the e-commerce sub-header bar with `sticky top-0`, which caused it to be hidden behind or overlap the main sticky navbar (`sticky top-0 z-50`).
- **Root Cause**: Failing to evaluate page layouts relative to global layout components.
- **Rule**: Any sub-header sticky elements must use `top-16` (or `64px` corresponding to the height of the main navigation header) instead of `top-0` to stack properly.

---

## 3. Grid Column Misalignments in Footers
- **Mistake**: Configured a footer layout with 6 child columns but set the wrapper class to `lg:grid-cols-5`, causing alignment issues and unwanted row wrapping.
- **Root Cause**: Inconsistent layout grids not matching the count of child links columns.
- **Rule**: Double-check that the grid columns count matching classes (e.g. `lg:grid-cols-X`) match the count of child columns.

---

## 4. Unrelated Placeholder Images
- **Mistake**: Used camping forest and tent placeholder images (`hero-camping.jpg`) on medical and corporate wellness pages.
- **Root Cause**: Reusing placeholder files without considering their visual context.
- **Rule**: Do not use placeholders showing unrelated concepts (like camping tents) for healthcare portals. Use medical, yoga, or nutrition assets.

---

## 5. Duplicate Input Controls
- **Mistake**: Left a "Subscribe to Newsletter" card on the homepage right above the footer when one already exists inside the footer itself.
- **Root Cause**: Adding widgets in adjacent view sections without checking adjacent blocks.
- **Rule**: Avoid adjacent duplication of input captures (like newsletter inputs) to keep layouts clean and professional.

---

## 6. Radix Dropdown Animation Support
- **Mistake**: Used standard Radix `DropdownMenuContent` wrappers without adding transition animation classes, making the menus open abruptly.
- **Root Cause**: Relying on default behavior without checking styling details.
- **Rule**: Always append Radix animation classes (`animate-in fade-in-80 slide-in-from-top-1 duration-200`) to dropdown wrappers.

---

## 7. Over-Explaining Text & Layout Height Misalignments
- **Mistake**: Placed long paragraphs describing features and clinical details on the Programmes Detail page, and positioned unequal cards side-by-side causing empty vertical spaces.
- **Root Cause**: Over-explaining features in paragraphs instead of listing them inside visual grids, and failing to balance column heights.
- **Rule**:
  - Keep all web copy short and concise (maximum 1-2 sentences).
  - Break long descriptions down into lists, cards, or grids with specific icons.
  - Balance side-by-side layout columns to ensure matching vertical heights.

