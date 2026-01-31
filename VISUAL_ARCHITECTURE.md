# 📐 INSTAMART UI - VISUAL ARCHITECTURE & DIAGRAMS

## Component Hierarchy Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    MUMMY APP - Main Container                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           VEGETABLES SECTION (.fresh-vegetables-section) │  │
│  │                                                          │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │  VEGETABLES CONTAINER (flex layout)                 │ │  │
│  │  │                                                     │ │  │
│  │  │  ┌──────────────┐  ┌────────────────────────────┐  │ │  │
│  │  │  │   SIDEBAR    │  │     MAIN CONTENT AREA     │  │ │  │
│  │  │  │ (220px wide) │  │   (flex: 1)               │  │ │  │
│  │  │  │              │  │                            │  │ │  │
│  │  │  │ ┌──────────┐ │  │ ┌────────────────────────┐ │  │ │  │
│  │  │  │ │ Header   │ │  │ │ FILTER BAR             │ │  │ │  │
│  │  │  │ │ CATEGOR. │ │  │ │ ┌──────────────────┐   │ │  │ │  │
│  │  │  │ └──────────┘ │  │ │ │ Filter Pills     │   │ │  │ │  │
│  │  │  │              │  │ │ │ ├─ All (active) │   │ │  │ │  │
│  │  │  │ ┌──────────┐ │  │ │ │ ├─ Fresh Veg    │   │ │  │ │  │
│  │  │  │ │ NAV      │ │  │ │ │ ├─ Leafy        │   │ │  │ │  │
│  │  │  │ │ ┌─────┐  │ │  │ │ │ └─ Exotic       │   │ │  │ │  │
│  │  │  │ │ │ 🥕  │  │ │  │ │ └──────────────────┘   │ │  │ │  │
│  │  │  │ │ │Frsh │  │ │  │ │                        │ │  │ │  │
│  │  │  │ │ └─────┘  │ │  │ │ ┌──────────────────┐   │ │  │ │  │
│  │  │  │ │          │ │  │ │ │ Sort Dropdown    │   │ │  │ │  │
│  │  │  │ │ ┌─────┐  │ │  │ │ │ ├─ Price L→H    │   │ │  │ │  │
│  │  │  │ │ │ 🌿  │  │ │  │ │ │ ├─ Price H→L    │   │ │  │ │  │
│  │  │  │ │ │Leaf │  │ │  │ │ │ └─ Name A→Z     │   │ │  │ │  │
│  │  │  │ │ └─────┘  │ │  │ │ └──────────────────┘   │ │  │ │  │
│  │  │  │ │          │ │  │ └────────────────────────┘ │  │ │  │
│  │  │  │ │ ┌─────┐  │ │  │                            │  │ │  │
│  │  │  │ │ │ ✨  │  │ │  │ ┌──────────────────────────┐ │  │ │  │
│  │  │  │ │ │Exot │  │ │  │ │ VEGETABLES GRID          │ │  │ │  │
│  │  │  │ │ └─────┘  │ │  │ │                          │ │  │ │  │
│  │  │  │ │          │ │  │ │ ┌──┐ ┌──┐ ┌──┐ ┌──┐    │ │  │ │  │
│  │  │  │ │ ┌─────┐  │ │  │ │ │Cd│ │Cd│ │Cd│ │Cd│... │ │  │ │  │
│  │  │  │ │ │ 🍎  │  │ │  │ │ └──┘ └──┘ └──┘ └──┘    │ │  │ │  │
│  │  │  │ │ │Fru  │  │ │  │ │ ┌──┐ ┌──┐ ┌──┐ ┌──┐    │ │  │ │  │
│  │  │  │ │ └─────┘  │ │  │ │ │Cd│ │Cd│ │Cd│ │Cd│... │ │  │ │  │
│  │  │  │ │          │ │  │ │ └──┘ └──┘ └──┘ └──┘    │ │  │ │  │
│  │  │  │ │ [Sticky] │ │  │ │ [Scrollable if needed]  │ │  │ │  │
│  │  │  │ └──────────┘ │  │ └──────────────────────────┘ │  │ │  │
│  │  │  │              │  │                            │  │ │  │
│  │  │  └──────────────┘  └────────────────────────────┘  │ │  │
│  │  │                                                     │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Card Component Detail

```
┌─ INSTAMART VEG CARD ─────────────────────────┐
│ (Hover: elevation, border glow, btn appears)  │
│                                              │
│ ┌────────────────────────────────────────┐   │
│ │   IMAGE CONTAINER (180px height)       │   │
│ │   ┌──────────────────────────────────┐ │   │
│ │   │                                  │ │   │
│ │   │  ┌──────────────────────────┐    │ │   │
│ │   │  │   Product Image 🥕       │    │ │   │
│ │   │  │  (Scales on hover 1.15x) │    │ │   │
│ │   │  └──────────────────────────┘    │ │   │
│ │   │                 ┏━━━━━┓           │ │   │
│ │   │                 ┃ +  ┃ ← Button   │ │   │
│ │   │                 ┃ 44p┃  (appears │ │   │
│ │   │                 ┗━━━━━┛  on hover) │ │   │
│ │   └──────────────────────────────────┘ │   │
│ │ IMAGE SECTION                           │   │
│ └────────────────────────────────────────┘   │
│                                              │
│ ┌────────────────────────────────────────┐   │
│ │   INFO SECTION (flex column)           │   │
│ │                                        │   │
│ │   Pumpkin Disco                        │   │ (white)
│ │   Petha                                │   │ (light gray)
│ │   Fresh yellow pumpkin...              │   │ (muted gray)
│ │   250 g                                │   │ (dim gray)
│ │                                        │   │
│ │   ₹20          ₹28                     │   │ (green | strikethrough)
│ │                                        │   │
│ └────────────────────────────────────────┘   │
│ INFO SECTION                                 │
└──────────────────────────────────────────────┘
 CARD (gradient bg, border, shadow, transitions)
```

---

## Filter & Sort Flow Diagram

```
USER INTERACTION

Sidebar Click              Filter Pill Click         Sort Dropdown Change
     │                           │                           │
     ├─ Get category             ├─ Get filter value         ├─ Get sort option
     │  from data-category       │  from data-filter         │
     │                           │                           │
     └─→ categoryFilter()        └─→ filterBy()              └─→ sortVegetables()
                │                          │                         │
                │                          │                         │
                ├─ Remove all active       ├─ Remove all active      ├─ Get all cards
                │  from sidebar            │  pills                  │  from grid
                │                          │                         │
                ├─ Add active to clicked   ├─ Add active to clicked  ├─ Sort by:
                │                          │                         │  - price ASC
                ├─ Update pills:           ├─ Update sidebar:        │  - price DESC
                │  Remove all active       │  Remove all active      │  - name ASC
                │  Add active to match     │  Add active to match    │
                │                          │                         │
                └─→ Filter vegetables      └─→ Filter vegetables    └─→ Clone sorted
                   by category                by filter category         cards back
                                                                        to grid
                        ↓
                  renderVegetables()
                        ↓
                  Display updated grid
```

---

## CSS Animation Sequence

```
CARD HOVER ANIMATION TIMELINE

t=0ms        t=150ms      t=300ms
│            │            │
└─ Default   ┼─ Elevating ┼─ Elevated + Glow
   scale:1   │            │  scale: 1
   y: 0      │            │  y: -8px
   opacity:0 │            │  opacity: 1 (btn)
   shadow: 0 │            │  shadow: enhanced

    ┌─────────────────────────────────┐
    │ Transform: translateY(-8px)     │ ← Elevation
    │ Box-shadow: 0 12px 30px rgba... │ ← Green glow
    │ Border: rgba(79,187,144,0.4)    │ ← Green tint
    └─────────────────────────────────┘

BUTTON HOVER (on card hover)

    ┌──────────────────────────┐
    │ opacity: 0 → 1           │ Fade in
    │ transform: scale(0.7→1)  │ Scale up
    │ transition: 0.3s ease    │ Smooth
    └──────────────────────────┘
      On click:
    ┌──────────────────────────┐
    │ transform: scale(1.1)    │ Scale button
    │ box-shadow: enhanced     │ More shadow
    └──────────────────────────┘
```

---

## Responsive Layout Transformation

```
DESKTOP (1400px+)
┌────────────────────────────────────────────────────────┐
│ SIDEBAR 220px  │ MAIN CONTENT                          │
│ - Vertical     │ - Filter bar                          │
│ - Sticky       │ - 6-7 column grid                     │
│ - Icons + Text │ - Full descriptions                   │
└────────────────────────────────────────────────────────┘

                    ↓ Shrink to 1024px

TABLET (1024px)
┌──────────────────────────────────────────────────────┐
│ Sidebar becomes horizontal tabs                       │
├──────────────────────────────────────────────────────┤
│ Filter bar                                            │
├──────────────────────────────────────────────────────┤
│ 4-5 column grid                                       │
└──────────────────────────────────────────────────────┘

                    ↓ Shrink to 768px

MOBILE (768px)
┌──────────────────────────────────────┐
│ Category icons (horizontal scroll)    │
├──────────────────────────────────────┤
│ Filter bar (stacked)                  │
├──────────────────────────────────────┤
│ 3 column grid                         │
│ No descriptions (hidden)              │
└──────────────────────────────────────┘

                    ↓ Shrink to 480px

SMALL MOBILE (480px)
┌──────────────────────────┐
│ Icons only (2px sidebar) │
├──────────────────────────┤
│ Filter bar (stacked)     │
├──────────────────────────┤
│ 2 column grid            │
│ Minimal text             │
└──────────────────────────┘
```

---

## Data Flow Architecture

```
vegetables.json (16 items, 4 categories)
    │
    ↓
loadFreshVegetables()
    │
    ├─ Fetch vegetables.json
    │
    ↓
displayFreshVegetables(vegetables)
    │
    ├─ Store in window.allVegetables
    │
    ├─ Set window.currentCategory = 'fresh-vegetables'
    │
    ├─ Filter: vegetables.filter(v => v.category === 'fresh-vegetables')
    │
    ├─ renderVegetables(filtered)
    │       └─ Generate HTML for each vegetable
    │       └─ Create .instamart-veg-card DOM elements
    │       └─ Append to .vegetables-grid
    │
    ├─ Setup Event Listeners:
    │
    ├─ Sidebar Click Handler
    │   └─ Get data-category
    │   └─ Update active states
    │   └─ Filter vegetables
    │   └─ renderVegetables()
    │
    ├─ Filter Pill Click Handler
    │   └─ Get data-filter
    │   └─ Filter or show all
    │   └─ Update active states
    │   └─ renderVegetables()
    │
    └─ Sort Dropdown Change Handler
        └─ Get sort option
        └─ Sort card elements in DOM
        └─ Re-append in new order
            
Card Click (+ button)
    └─ Call addVegetableToRecipe(name)
    └─ Add to selectedIngredients
    └─ Update basket
    └─ Save to localStorage
```

---

## CSS Cascade Structure

```
Global Styles
│
├─ Root Variables (colors defined)
│
├─ .fresh-vegetables-section
│  └─ Background: gradient
│  └─ Padding, margins
│
├─ .vegetables-container (flex)
│  │
│  ├─ .vegetables-sidebar
│  │  ├─ Width, background, position (sticky)
│  │  ├─ .sidebar-header
│  │  └─ .sidebar-nav
│  │     ├─ Flex column, gap
│  │     ├─ .sidebar-nav-item (button)
│  │     │  ├─ Padding, colors
│  │     │  ├─ Border (3px left)
│  │     │  ├─ :hover, :active
│  │     │  └─ .active (green left, background)
│  │     ├─ .nav-icon (emoji)
│  │     └─ .nav-label (text)
│  │
│  └─ .vegetables-main (flex: 1)
│     ├─ Padding, overflow-y
│     │
│     ├─ .vegetables-filter-bar (flex space-between)
│     │  ├─ .filter-pills (flex, gap)
│     │  │  ├─ .filter-pill (button)
│     │  │  │  ├─ Background (transparent with opacity)
│     │  │  │  ├─ Border (1px)
│     │  │  │  ├─ Border-radius (25px)
│     │  │  │  ├─ :hover, :active
│     │  │  │  └─ .active (green gradient)
│     │  │  └─ (multiple filter-pills)
│     │  │
│     │  └─ .filter-sort
│     │     └─ .sort-dropdown (select)
│     │        ├─ Background, color
│     │        ├─ Border, radius
│     │        ├─ :hover, :focus
│     │        └─ option styles
│     │
│     └─ .vegetables-grid (CSS Grid)
│        ├─ Grid-template-columns (auto-fill)
│        ├─ Gap spacing
│        ├─ Animation (fadeIn)
│        │
│        └─ .instamart-veg-card
│           ├─ Background: gradient
│           ├─ Border, shadow
│           ├─ Flex column
│           ├─ Transition (all 0.3s)
│           ├─ :hover (translateY, shadow, border)
│           │
│           ├─ .instamart-veg-img-container
│           │  ├─ Position: relative
│           │  ├─ Background: gradient
│           │  ├─ Display: flex
│           │  ├─ .instamart-veg-img
│           │  │  └─ :hover (scale, rotate)
│           │  └─ .instamart-add-btn-float
│           │     ├─ Position: absolute (top-right)
│           │     ├─ Circular (44px)
│           │     ├─ Green gradient background
│           │     ├─ Opacity: 0, Scale: 0.7 (hidden)
│           │     ├─ On card :hover → Opacity: 1, Scale: 1
│           │     └─ :hover, :active states
│           │
│           └─ .instamart-veg-info (flex column)
│              ├─ Padding, gap
│              ├─ .instamart-veg-name (white text, bold)
│              ├─ .instamart-veg-local (light gray text)
│              ├─ .instamart-veg-description (muted text)
│              ├─ .instamart-veg-size (dim text)
│              └─ .instamart-veg-price-section
│                 ├─ Flex, gap
│                 ├─ .instamart-veg-price (green, bold, large)
│                 └─ .instamart-veg-strike (strikethrough)

Media Queries (1024px, 768px, 480px)
│
├─ Sidebar: flex-direction change
├─ Grid: columns adjustment
├─ Cards: size adjustment
├─ Text: visibility toggle
└─ Layout: responsive transformations
```

---

## State Management

```
Global Variables:
├─ window.allVegetables → Full array of 16 items
└─ window.currentCategory → Current active category

App State (appState):
├─ selectedIngredients[] → Added vegetables
├─ selectedHealth → User's health status
├─ userName → Current user
└─ isLoggedIn → Auth status

DOM Elements Tracked:
├─ .sidebar-nav-item (buttons)
├─ .filter-pill (pills)
├─ .sort-dropdown (select)
└─ #vegetablesGrid (container)

Active States:
├─ .sidebar-nav-item.active (green left border)
├─ .filter-pill.active (green background)
├─ .instamart-veg-card (hover pseudo-class)
└─ .instamart-add-btn-float (hover pseudo-class)
```

---

## Browser Rendering Path

```
1. HTML Parse
   └─ Create DOM tree
   └─ Link CSS file: vegetables-instamart.css

2. CSS Parse & Render
   ├─ Load all CSS rules
   ├─ Parse color values (#0f172a, #4FBB90, etc.)
   ├─ Create stylesheet object
   └─ Apply to DOM elements

3. JavaScript Execute
   ├─ DOMContentLoaded event
   ├─ loadFreshVegetables()
   │  └─ Fetch vegetables.json
   │  └─ displayFreshVegetables(vegetables)
   │     ├─ renderVegetables() → Create cards
   │     └─ Attach event listeners
   │
   └─ Ready for user interaction

4. User Interaction (e.g., click)
   ├─ Event fires (click)
   ├─ Event handler executes
   ├─ Update window.currentCategory
   ├─ Filter vegetables array
   ├─ renderVegetables(filtered)
   │  ├─ Clear grid: grid.innerHTML = ''
   │  ├─ Create new cards
   │  └─ Append to DOM
   │
   ├─ Browser reflow (layout change)
   ├─ Browser repaint (visual change)
   │
   └─ Animation starts
      ├─ CSS transition: 0.3s
      ├─ GPU accelerated (transform, opacity)
      ├─ 60fps smooth animation
      └─ Animation complete

5. Continuous Polling
   ├─ Sort dropdown attached
   ├─ Filter pills attached
   ├─ Sidebar buttons attached
   └─ All ready for next interaction
```

---

## Mobile Touch Interaction

```
TOUCH SEQUENCE

1. User touches sidebar button
   ├─ :active pseudo-class applied (visual feedback)
   └─ Event handler executes

2. JavaScript processes click
   ├─ Category determined
   ├─ Filter applied
   └─ renderVegetables()

3. Grid updates
   ├─ Cards fade in (CSS animation)
   ├─ Images display
   ├─ Touch targets enlarged (44x44px minimum)
   └─ Ready for next interaction

4. User touches filter pill
   ├─ Same flow as sidebar
   ├─ Pills stay in viewport (sticky top)
   └─ Grid scrolls independently

5. User touches card "+" button
   ├─ :active visual feedback
   ├─ addVegetableToRecipe() called
   ├─ Basket updates
   ├─ Toast notification
   └─ Button remains responsive
```

---

**Architecture Version**: 1.0
**Created**: 2024
**Status**: Production Ready ✅
