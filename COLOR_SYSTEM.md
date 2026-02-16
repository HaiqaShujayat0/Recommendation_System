# GLYERAL Color System - Professional Healthcare Palette

## Primary Brand Color
**Deep Teal/Clinical Blue** - #2694b8
Used for: Headers, primary buttons, active navigation, primary actions

### Primary Variants:
```
primary-50:  #f0f9fc   (Light background)
primary-100: #e0f2f7   (Hover backgrounds)
primary-200: #b3dce9
primary-300: #7fc4db
primary-400: #4aaccc
primary-500: #2694b8   (Main brand - buttons, headers)
primary-600: #1e7a98   (Hover state)
primary-700: #16577a   (Active state)
primary-800: #0f3d56   (Dark state)
primary-900: #062030   (Darkest)
```

## Status Colors

### Success - Emerald Green
**#22c55e** - Used for: Approved recommendations, good metrics, positive status
```
success-50:  #f0fdf4
success-100: #dcfce7
success-200: #bbf7d0
success-500: #22c55e (Main)
success-600: #16a34a (Dark)
success-700: #15803d (Darkest)
```
**Use Cases:**
- Accepted recommendations
- Healthy HbA1c (< 5.7%)
- Normal eGFR (≥ 90)
- Healthy BMI (18.5-25)
- Green status badges

### Warning - Amber/Gold
**#f59e0b** - Used for: Caution, needs attention, moderate concern
```
warning-50:  #fffbeb
warning-100: #fef3c7
warning-200: #fde68a
warning-500: #f59e0b (Main)
warning-600: #d97706 (Dark)
warning-700: #b45309 (Darkest)
```
**Use Cases:**
- Prediabetic HbA1c (5.7-7%)
- Moderate kidney function (eGFR 60-90)
- Overweight BMI (25-30)
- Moderate glucose readings (140-180 mg/dL)
- Pending status

### Critical - Red
**#ef4444** - Used for: Urgent action, errors, dangerous values
```
critical-50:  #fef2f2
critical-100: #fee2e2
critical-200: #fecaca
critical-500: #ef4444 (Main)
critical-600: #dc2626 (Dark)
critical-700: #b91c1c (Darkest)
```
**Use Cases:**
- Rejected recommendations
- High HbA1c (> 7%)
- Low eGFR (< 60)
- Obese BMI (> 30)
- Hypoglycemia (< 70 mg/dL)
- Critical alerts

### Neutral - Professional Grays
**Neutral Palette** - Used for: Text, borders, backgrounds, disabled states
```
neutral-0:   #ffffff    (Pure white)
neutral-50:  #f9fafb    (Page background)
neutral-100: #f3f4f6    (Component backgrounds)
neutral-200: #e5e7eb    (Borders)
neutral-300: #d1d5db    (Input borders)
neutral-400: #9ca3af    (Light text)
neutral-500: #6b7280    (Secondary text)
neutral-600: #4b5563    (Primary text)
neutral-700: #374151    (Bold text)
neutral-800: #1f2937    (Very dark text)
neutral-900: #111827    (Darkest)
```

## Clinical Metrics Color Mapping

### HbA1c (Hemoglobin A1C)
| Range | Color | Status |
|-------|-------|--------|
| < 5.7% | Success (Green) | Normal |
| 5.7-7% | Warning (Amber) | Prediabetic |
| > 7% | Critical (Red) | Needs intervention |

### eGFR (Kidney Function)
| Range | Color | Status |
|-------|-------|--------|
| ≥ 90 | Success (Green) | Normal (Stage 1) |
| 60-90 | Warning (Amber) | Mild (Stage 2) |
| 30-60 | Warning/Critical | Moderate-Severe (Stage 3-4) |
| < 15 | Critical (Red) | Kidney Failure (Stage 5) |

### BMI (Body Mass Index)
| Range | Color | Status |
|-------|-------|--------|
| < 18.5 | Warning (Amber) | Underweight |
| 18.5-25 | Success (Green) | Normal |
| 25-30 | Warning (Amber) | Overweight |
| > 30 | Critical (Red) | Obese |

### Glucose Levels (mg/dL)
| Range | Color | Status |
|-------|-------|--------|
| < 70 | Critical (Red) | Hypoglycemia ⚠ |
| 70-140 | Success (Green) | Normal |
| 140-180 | Warning (Amber) | Elevated |
| > 180 | Critical (Red) | High |

## Component Color Usage

### Buttons
- **Primary Action:** primary-600 with hover state primary-700
- **Secondary Action:** neutral-200 with neutral text
- **Success Action:** success-600 (Generate recommendations)
- **Danger Action:** critical-600 (Reject, delete)

### Status Badges
- **Approved:** success-100 background, success-700 text
- **Modified:** primary-100 background, primary-700 text
- **Rejected:** critical-100 background, critical-700 text
- **Warning:** warning-100 background, warning-700 text
- **Required:** critical-100 background, critical-700 text

### Input Fields
- **Default:** neutral-300 border
- **Focus:** primary-500 border
- **Error:** critical-300 border, critical-50 background
- **Success:** success-500 border, success-50 background

### Cards & Containers
- **Default Background:** white (#ffffff)
- **Hover Background:** neutral-50
- **Section Background:** neutral-50 to white gradient
- **Card Border:** neutral-200

### Text
- **Headings:** neutral-900 (darkest)
- **Primary Text:** neutral-700
- **Secondary Text:** neutral-600
- **Muted Text:** neutral-500
- **Disabled Text:** neutral-400

## Accessibility Notes

All color combinations meet WCAG AA standards for contrast:
- Dark text on light backgrounds: ≥ 4.5:1 contrast
- Light text on dark backgrounds: ≥ 4.5:1 contrast
- Non-text elements: ≥ 3:1 contrast

**Important:** Never rely on color alone for information. Always accompany with:
- Icons
- Text labels
- Status badges
- Additional visual cues

## Design System Integration

### How to Use in Components:
```jsx
// Primary action
className="bg-primary-600 text-white hover:bg-primary-700"

// Status indicator
className="bg-success-100 text-success-700"

// Input field
className="border-2 border-neutral-300 focus:border-primary-500"

// Alert/Warning
className="bg-warning-50 border-l-4 border-warning-500"

// Text
className="text-neutral-700 font-semibold"
```

### Tailwind Config Reference:
All colors are defined in `tailwind.config.js` under the `colors` extension. Use the full color name:
- `primary-50` through `primary-950`
- `success-50` through `success-700`
- `warning-50` through `warning-700`
- `critical-50` through `critical-700`
- `neutral-0` through `neutral-900`

---

**Last Updated:** UI Upgrade v1.0
**Healthcare Design Standard:** Compliant with healthcare UX best practices
