export const chapters = [
  { id: 'awakening', number: '01', title: 'The Awakening', shortTitle: 'Awakening' },
  { id: 'design', number: '02', title: 'Form Meets Function', shortTitle: 'Form' },
  { id: 'anatomy', number: '03', title: 'Anatomy of a Beast', shortTitle: 'Anatomy' },
  { id: 'performance', number: '04', title: 'The Heart of Performance', shortTitle: 'Performance' },
  { id: 'aerodynamics', number: '05', title: 'Aerodynamics in Motion', shortTitle: 'Aerodynamics' },
  { id: 'racing', number: '06', title: 'The Racing DNA', shortTitle: 'Racing DNA' },
  { id: 'command', number: '07', title: "The Rider's Command", shortTitle: 'Command' },
  { id: 'reveal', number: '08', title: 'The Final Reveal', shortTitle: 'Final Reveal' },
] as const;

export type ChapterId = (typeof chapters)[number]['id'];

export const riderSystems = [
  {
    id: 'traction',
    code: 'DTC / DVO',
    name: 'Ducati Traction Control',
    description:
      'Latest-generation traction control with Ducati Vehicle Observer, listed as standard safety equipment for the MY2027 Panigale V4.',
  },
  {
    id: 'wheelie',
    code: 'DWC / DVO',
    name: 'Ducati Wheelie Control',
    description:
      'DVO-enabled wheelie control forms part of the six-axis IMU electronics package on the MY2027 Panigale V4.',
  },
  {
    id: 'braking',
    code: 'ABS / RBC',
    name: 'Braking Control',
    description:
      'Bosch Cornering ABS and Race Brake Control are specified for this model year. Racing systems are intended for appropriate environments.',
  },
  {
    id: 'engine-brake',
    code: 'DEB',
    name: 'Dynamic Engine Brake',
    description:
      'Dynamic Engine Brake is part of the verified MY2027 electronics suite, alongside Riding Modes and Power Modes.',
  },
] as const;
