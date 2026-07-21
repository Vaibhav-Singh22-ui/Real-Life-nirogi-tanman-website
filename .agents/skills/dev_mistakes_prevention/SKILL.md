---
name: dev-mistakes-prevention
description: Rules to prevent development mistakes like missing utility imports, tag mismatch errors, and wrong path structures.
---

# Development Mistakes Prevention Guidelines

To maintain continuous build integrity and premium quality, adhere to the following checklist to avoid repeating past mistakes:

## 1. Verify Imports Before Building
- **Imports check**: Always verify that any added utility function (e.g., `cn`), React hooks, or styling modules are imported at the top of the file.
- **Icon check**: Check that all Lucide icon components are imported correctly.

## 2. Element and Tag Consistency
- **Close tags correctly**: When porting elements (like `Sheet`, `Dialog`, or custom wrapper blocks) from one component to another, ensure they are closed with their exact tag name (e.g. `</Sheet>`) and not generic elements or empty fragments (`</>`).
- **Nesting validation**: Ensure all children tags correspond properly to their parent elements.

## 4. Fixed Sidebar Positioning & Independent Content Scrolling
- **Sidebar Position**: Ensure the dashboard sidebar container is locked to the viewport height (`fixed inset-y-0 z-10 h-svh` or `sticky top-0 h-screen`) so that it remains static on screen while page content scrolls independently.
- **Internal Scrolling**: Enable `overflow-y-auto` only inside `<SidebarContent>`, preserving independent scrolling for menu items without moving the overall sidebar position.

