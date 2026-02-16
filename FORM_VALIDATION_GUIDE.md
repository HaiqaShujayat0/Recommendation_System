# GLYERAL Form Validation System

## Overview
GLYERAL uses **react-hook-form** for comprehensive form validation across all patient data collection forms. All validation rules are enforced both on the form level and displayed with real-time feedback to the user.

---

## Form Validation by Section

### 1. DEMOGRAPHICS FORM
**Purpose:** Collect patient basic information and calculate derived metrics

#### Fields & Validation Rules:

| Field | Type | Required | Validation Rules | Notes |
|-------|------|----------|-----------------|-------|
| MR Number | Text | ✅ Yes | Format: `MR-YYYY-XXX` (regex) | Medical Record ID |
| First Name | Text | ✅ Yes | Min 2 characters | Alphanumeric allowed |
| Last Name | Text | ✅ Yes | Min 2 characters | Alphanumeric allowed |
| Date of Birth | Date | ✅ Yes | Not future date, age 0-150 | Auto-calculates age |
| Gender | Radio | ✅ Yes | Male or Female | Required selection |
| Weight | Number | ✅ Yes | 20-300 kg | Used for BMI calculation |
| Height | Number | ✅ Yes | 100-250 cm | Used for BMI calculation |
| Age | Display | - | Auto-calculated | Read-only field |
| BMI | Display | - | Auto-calculated | Formula: weight / (height/100)² |

**Validation Mode:** `onChange` (real-time feedback)

**Example Validation:**
```javascript
register('dob', {
  required: 'Date of Birth is required',
  validate: (value) => {
    const birth = new Date(value);
    const today = new Date();
    if (birth > today) return 'Date of Birth cannot be in the future';
    const age = today.getFullYear() - birth.getFullYear();
    if (age > 150) return 'Please enter a valid date of birth';
    return true;
  },
})
```

---

### 2. CONDITIONS FORM
**Purpose:** Collect patient medical conditions that affect medication recommendations

#### Fields & Validation Rules:

| Condition | Type | Required | Notes |
|-----------|------|----------|-------|
| Diabetes Mellitus | Checkbox | ✅ Yes (Locked) | Always checked, cannot uncheck |
| Chronic Kidney Disease | Checkbox | ❌ Optional | Affects Metformin dosing |
| Coronary Artery Disease | Checkbox | ❌ Optional | Favors SGLT2i/GLP-1 RA |
| Hypertension | Checkbox | ❌ Optional | CV risk factor |
| Pregnancy | Checkbox | ❌ Optional | ⚠️ BLOCKS oral medications |
| Neuropathy | Checkbox | ❌ Optional | Diabetes complication |
| Retinopathy | Checkbox | ❌ Optional | Diabetes complication |
| Obesity | Checkbox | ❌ Optional | BMI > 30 or clinical diagnosis |

**Validation Logic:**
- DM (Diabetes) is ALWAYS required and cannot be unchecked
- Pregnancy shows warning badge "Blocks Oral" when selected
- At least DM must be selected (enforced by default)

**Example:**
```javascript
// Ensure DM is always checked
useEffect(() => {
  if (!watchedData.dm) {
    setValue('dm', true);
  }
}, [watchedData.dm, setValue]);

// Prevent toggling DM
const toggle = (key) => {
  if (key === 'dm') return; // Cannot uncheck DM
  setValue(key, !watchedData[key]);
};
```

---

### 3. LABORATORY VALUES FORM
**Purpose:** Collect critical lab values for ML prediction and clinical assessment

#### Fields & Validation Rules:

| Lab Value | Type | Required | Range | Status | Normal | Notes |
|-----------|------|----------|-------|--------|--------|-------|
| HbA1c | Number | ✅ Yes | 0-20% | PRIMARY | < 5.7% | Glycemic control indicator |
| eGFR | Number | ✅ Yes | 0-200 mL/min | PRIMARY | > 90 | Kidney function |
| Creatinine | Number | ❌ Optional | 0-10 mg/dL | - | 0.7-1.3 | Kidney marker |
| LDL | Number | ❌ Optional | 0-500 mg/dL | - | < 100 | Lipid panel |
| Urine Albumin | Number | ❌ Optional | 0-1000 mg/L | - | < 30 | Kidney damage indicator |

**Validation Mode:** `onChange` (real-time feedback)

**Color Coding:**
- **HbA1c:**
  - Green: < 5.7%
  - Amber: 5.7-7%
  - Red: > 7%

- **eGFR (CKD Stage):**
  - Green (Stage 1): ≥ 90
  - Amber (Stage 2): 60-90
  - Orange (Stage 3): 30-60
  - Red (Stage 4-5): < 15

**Example Validation:**
```javascript
register('hba1c', {
  required: 'HbA1c is required',
  min: { value: 0, message: 'HbA1c must be positive' },
  max: { value: 20, message: 'Please enter a valid HbA1c value' },
  valueAsNumber: true,
})
```

---

### 4. BLOOD GLUCOSE FORM
**Purpose:** Collect daily glucose readings at different times

#### Fields & Validation Rules:

| Time Slot | Type | Required | Range | Target | Notes |
|-----------|------|----------|-------|--------|-------|
| Before Breakfast | Number | ❌ Optional | 0-600 mg/dL | 80-130 | Fasting glucose |
| Before Lunch | Number | ❌ Optional | 0-600 mg/dL | 80-130 | |
| Before Dinner | Number | ❌ Optional | 0-600 mg/dL | 80-130 | |
| Before Bed | Number | ❌ Optional | 0-600 mg/dL | 100-140 | |
| Average | Number | - | Auto-calculated | < 154 | Read-only, auto-calculated |

**Validation Rules:**
- All glucose readings are OPTIONAL (patient may not have all readings)
- If entered, must be between 0-600 mg/dL
- Average is auto-calculated from non-empty readings
- Hypoglycemia warning if any reading < 70 mg/dL

**Color Coding:**
- Red: < 70 (Hypoglycemia)
- Green: 70-140 (Normal)
- Amber: 140-180 (Elevated)
- Red: > 180 (High)

**Example:**
```javascript
// Auto-calculate average
useEffect(() => {
  const readings = [beforeBreakfast, beforeLunch, beforeDinner, beforeBed]
    .filter(v => v && !isNaN(parseFloat(v)))
    .map(v => parseFloat(v));
  
  const average = readings.length
    ? Math.round(readings.reduce((a, b) => a + b, 0) / readings.length)
    : 0;
  
  setValue('average', average);
}, [beforeBreakfast, beforeLunch, beforeDinner, beforeBed, setValue]);
```

---

### 5. MEDICATIONS FORM
**Purpose:** Collect current diabetes medications

#### Medication Categories & Validation:

**Oral Medications:**
| Medication | Type | Range | Default | Validation |
|-----------|------|-------|---------|-----------|
| Metformin | Slider | 0-2000mg | 0 | 250mg increments |
| Glimepiride | Select | 0-4mg | 0 | 1mg increments |
| Tradjenta | Toggle | ON/OFF | OFF | Binary |
| Farxiga | Select | 0,5,10mg | 0 | Discrete values |
| Semaglutide | Slider | 0-2mg | 0 | 0.25mg increments |
| Repaglinide | Select (x3) | 0-2mg | 0 | Per meal: breakfast/lunch/dinner |

**Insulin Medications:**
| Medication | Type | Range | Default | Validation |
|-----------|------|-------|---------|-----------|
| Glargine | Number | 0-100u | 0 | Basal insulin (dinner) |
| Lispro Breakfast | Number | 0-100u | 0 | Bolus insulin |
| Lispro Lunch | Number | 0-100u | 0 | Bolus insulin |
| Lispro Dinner | Number | 0-100u | 0 | Bolus insulin |

**Validation Logic:**
- All medications are OPTIONAL (patient may not be on all meds)
- Each medication has specific range validation
- Sliders and selects prevent invalid values at UI level
- Number inputs validate min/max on blur

**Example:**
```javascript
register('metformin', {
  min: { value: 0, message: 'Minimum: 0mg' },
  max: { value: 2000, message: 'Maximum: 2000mg' },
  valueAsNumber: true,
})
```

---

## Form State Management

### State Flow:
```
Form Input → react-hook-form validation
    ↓
Real-time feedback with errors
    ↓
useEffect watches form data
    ↓
Parent state updated (patientData)
    ↓
Next button enabled/disabled based on isValid
    ↓
On submit, move to next form section
```

### Key Hooks Used:
- `useForm()` - Initialize form with validation rules
- `watch()` - Monitor field changes in real-time
- `register()` - Register field with validation rules
- `handleSubmit()` - Validate and submit form
- `formState.errors` - Access validation errors
- `formState.isValid` - Check if entire form is valid

---

## Error Handling & Display

### Error Display Strategy:
1. **Field-level errors** appear below each input
2. **Color-coded inputs** for visual feedback
3. **Icons** (⚠️) accompanying error messages
4. **Real-time validation** as user types (onChange mode)
5. **Disabled submit button** until form is valid

### Example Error Message:
```
⚠️ First Name must be at least 2 characters
```

### Input States:
```css
/* Normal */
border-2 border-neutral-300

/* Focus */
border-2 border-primary-500 focus:outline-none

/* Error */
border-2 border-critical-300 bg-critical-50 focus:bg-white
```

---

## Validation Best Practices Used

✅ **Real-time Feedback:** `mode: 'onChange'` validates as user types
✅ **Clear Error Messages:** Specific, actionable error text
✅ **Visual Feedback:** Color-coded inputs and icons
✅ **Disabled Submit:** Button disabled until form is valid
✅ **Async Calculations:** Auto-calculate age, BMI, glucose average
✅ **Field-Level Rules:** Min/max, regex, custom validators
✅ **Required Field Indicators:** Red asterisk (*) for required fields
✅ **Accessibility:** Proper labels, ARIA attributes, semantic HTML

---

## Future Enhancement Opportunities

1. **Server-side Validation:** Validate against backend rules
2. **Custom Validators:** Add business logic validators
3. **Conditional Validation:** Different rules based on other fields
4. **Multi-field Validation:** Cross-field dependencies
5. **Async Validators:** Check against database/API
6. **History Tracking:** Track validation changes over time
7. **Form Resets:** Smart reset with previous values
8. **Progress Indicators:** Show form completion percentage

---

## Testing the Validation

### Test Cases:

**Demographics Form:**
- ❌ Invalid MR format: "123" → should fail
- ✅ Valid MR format: "MR-2024-001" → should pass
- ❌ Future DOB → should show error
- ❌ Age > 150 → should show error
- ✅ Valid DOB → should auto-calc age
- ✅ Height + Weight → should auto-calc BMI

**Conditions Form:**
- ✅ DM cannot be unchecked
- ✅ Pregnancy shows warning badge
- ✅ Can select/deselect optional conditions

**Labs Form:**
- ❌ HbA1c empty → should fail (required)
- ✅ HbA1c = 8.5 → green input, shows status
- ✅ eGFR = 45 → shows CKD Stage 3
- ✅ Optional fields → can be empty

**Glucose Form:**
- ✅ All fields optional → can submit empty
- ✅ Glucose < 70 → shows hypoglycemia warning
- ✅ All readings entered → calculates average

**Medications Form:**
- ✅ All fields optional → can submit empty
- ✅ Slider ranges → prevents out-of-range values
- ✅ Select options → only valid options available

---

## Code References

### Key Files:
- `/src/components/patient/DemographicsForm.jsx` - Complete validation example
- `/src/components/patient/ConditionsForm.jsx` - Custom validation logic
- `/src/components/patient/LabsForm.jsx` - Range validation & color coding
- `/src/components/patient/GlucoseForm.jsx` - Optional fields & auto-calc
- `/src/components/patient/MedicationsForm.jsx` - Multiple input types

### React Hook Form Docs:
https://react-hook-form.com/get-started

---

**Last Updated:** UI Upgrade v1.0
**Validation Framework:** React Hook Form 7.71.1
**Status:** Production-ready ✅
