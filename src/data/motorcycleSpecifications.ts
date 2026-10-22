export const MODEL_DATASET = 'Ducati Panigale V4 / MY2027 / Ducati Red / UK–EU specification';

export const OFFICIAL_MODEL_URL =
  'https://www.ducati.com/gb/en/bikes/panigale/panigale-v4-2027';
export const OFFICIAL_SPECS_URL =
  'https://www.ducati.com/gb/en/bikes/panigale/panigale-v4-2027/insights?tab=Tech%20Specs';

export const motorcycleSpecifications = {
  modelYear: 2027,
  market: 'UK–EU',
  displacement: { value: 1103, unit: 'cc', label: 'Displacement' },
  power: { value: 218, unit: 'hp', label: 'Maximum power', detail: '@ 13,500 rpm' },
  torque: { value: 120.6, unit: 'Nm', label: 'Maximum torque', detail: '@ 11,000 rpm' },
  weight: { value: 191, unit: 'kg', label: 'Wet weight, no fuel' },
  configuration: {
    value: '90° V4',
    label: 'Desmosedici Stradale',
    detail: 'Counter-rotating crankshaft / Desmodromic timing',
  },
  transmission: {
    value: '6-speed',
    label: 'Transmission',
    detail: 'Ducati Quick Shift up/down 2.0',
  },
  display: {
    value: '6.9″',
    label: 'TFT with Optical Bonding',
    detail: '1,280 × 480 px / 8:3 aspect ratio',
  },
  brakes: {
    value: '330 mm',
    label: 'Twin front discs',
    detail: 'Brembo Monobloc Hypure® four-piston calipers',
  },
} as const;

export const derivedPowerToWeight = (
  motorcycleSpecifications.power.value / motorcycleSpecifications.weight.value
).toFixed(2);
