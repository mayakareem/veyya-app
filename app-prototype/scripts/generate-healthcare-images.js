const fs = require('fs');
const path = require('path');

// Healthcare service image configurations
const serviceImages = [
  // LAB TESTS - Red/Pink theme
  {
    id: 'cbc-test',
    name: 'Complete Blood Count (CBC)',
    icon: 'droplet',
    gradient: ['#ef4444', '#dc2626'],
    accent: '#fecaca'
  },
  {
    id: 'lipid-profile',
    name: 'Lipid Profile Test',
    icon: 'heart-pulse',
    gradient: ['#ec4899', '#db2777'],
    accent: '#fbcfe8'
  },
  {
    id: 'diabetes-panel',
    name: 'Diabetes Panel',
    icon: 'activity',
    gradient: ['#f97316', '#ea580c'],
    accent: '#fed7aa'
  },
  {
    id: 'thyroid-test',
    name: 'Thyroid Function Test',
    icon: 'scan',
    gradient: ['#8b5cf6', '#7c3aed'],
    accent: '#ddd6fe'
  },
  {
    id: 'liver-function',
    name: 'Liver Function Test',
    icon: 'clipboard-check',
    gradient: ['#059669', '#047857'],
    accent: '#a7f3d0'
  },
  {
    id: 'kidney-function',
    name: 'Kidney Function Test',
    icon: 'flask-conical',
    gradient: ['#0891b2', '#0e7490'],
    accent: '#a5f3fc'
  },
  {
    id: 'vitamin-d',
    name: 'Vitamin D Test',
    icon: 'sun',
    gradient: ['#f59e0b', '#d97706'],
    accent: '#fde68a'
  },

  // IV THERAPY - Blue/Purple theme
  {
    id: 'hydration-iv',
    name: 'Hydration IV Drip',
    icon: 'droplets',
    gradient: ['#3b82f6', '#2563eb'],
    accent: '#bfdbfe'
  },
  {
    id: 'immunity-iv',
    name: 'Immunity Boost IV',
    icon: 'shield-plus',
    gradient: ['#06b6d4', '#0891b2'],
    accent: '#a5f3fc'
  },
  {
    id: 'energy-iv',
    name: 'Energy Boost IV',
    icon: 'zap',
    gradient: ['#8b5cf6', '#7c3aed'],
    accent: '#ddd6fe'
  },
  {
    id: 'beauty-iv',
    name: 'Beauty Glow IV',
    icon: 'sparkles',
    gradient: ['#ec4899', '#d946ef'],
    accent: '#f5d0fe'
  },

  // DOCTOR CONSULTATIONS - Teal/Green theme
  {
    id: 'gp-consultation',
    name: 'General Practitioner',
    icon: 'stethoscope',
    gradient: ['#14b8a6', '#0d9488'],
    accent: '#99f6e4'
  },
  {
    id: 'pediatrician',
    name: 'Pediatrician',
    icon: 'baby',
    gradient: ['#10b981', '#059669'],
    accent: '#a7f3d0'
  },

  // VACCINES - Green theme
  {
    id: 'flu-vaccine',
    name: 'Flu Vaccine',
    icon: 'syringe',
    gradient: ['#22c55e', '#16a34a'],
    accent: '#bbf7d0'
  },
  {
    id: 'covid-vaccine',
    name: 'COVID-19 Vaccine',
    icon: 'shield-check',
    gradient: ['#06b6d4', '#0891b2'],
    accent: '#a5f3fc'
  },
  {
    id: 'hepatitis-b',
    name: 'Hepatitis B Vaccine',
    icon: 'shield',
    gradient: ['#14b8a6', '#0d9488'],
    accent: '#5eead4'
  },

  // NURSE CARE - Purple/Indigo theme
  {
    id: 'nurse-visit-2h',
    name: 'Nurse Visit 2 Hours',
    icon: 'user-round-check',
    gradient: ['#6366f1', '#4f46e5'],
    accent: '#c7d2fe'
  },
  {
    id: 'nurse-visit-4h',
    name: 'Nurse Visit 4 Hours',
    icon: 'clock',
    gradient: ['#8b5cf6', '#7c3aed'],
    accent: '#ddd6fe'
  },
  {
    id: 'wound-care',
    name: 'Wound Care & Dressing',
    icon: 'bandage',
    gradient: ['#ec4899', '#db2777'],
    accent: '#fbcfe8'
  },
  {
    id: 'post-surgery',
    name: 'Post-Surgery Care',
    icon: 'cross',
    gradient: ['#f43f5e', '#e11d48'],
    accent: '#fecdd3'
  },

  // PHYSIOTHERAPY - Orange/Yellow theme
  {
    id: 'physiotherapy-general',
    name: 'General Physiotherapy',
    icon: 'dumbbell',
    gradient: ['#f97316', '#ea580c'],
    accent: '#fed7aa'
  },
  {
    id: 'sports-rehab',
    name: 'Sports Injury Rehab',
    icon: 'run',
    gradient: ['#f59e0b', '#d97706'],
    accent: '#fde68a'
  },
  {
    id: 'stroke-rehab',
    name: 'Post-Stroke Rehab',
    icon: 'heart-handshake',
    gradient: ['#06b6d4', '#0891b2'],
    accent: '#a5f3fc'
  },

  // PSYCHOTHERAPY - Calm Blue/Purple theme
  {
    id: 'individual-therapy',
    name: 'Individual Therapy',
    icon: 'user',
    gradient: ['#6366f1', '#4f46e5'],
    accent: '#c7d2fe'
  },
  {
    id: 'couples-therapy',
    name: 'Couples Therapy',
    icon: 'users',
    gradient: ['#ec4899', '#db2777'],
    accent: '#fbcfe8'
  },
  {
    id: 'family-therapy',
    name: 'Family Therapy',
    icon: 'home',
    gradient: ['#14b8a6', '#0d9488'],
    accent: '#99f6e4'
  },
  {
    id: 'cbt-therapy',
    name: 'CBT Therapy',
    icon: 'brain',
    gradient: ['#8b5cf6', '#7c3aed'],
    accent: '#ddd6fe'
  },
  {
    id: 'anxiety-depression',
    name: 'Anxiety & Depression',
    icon: 'heart',
    gradient: ['#3b82f6', '#2563eb'],
    accent: '#bfdbfe'
  }
];

// Icon path data (simplified Lucide-style icons)
const iconPaths = {
  'droplet': 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z',
  'heart-pulse': 'M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z M9 12l2 2 4-4',
  'activity': 'M22 12h-4l-3 9L9 3l-3 9H2',
  'scan': 'M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2 M12 8v8 M8 12h8',
  'clipboard-check': 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M9 12l2 2 4-4 M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z',
  'flask-conical': 'M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2 M8.5 2h7 M7 16h10',
  'sun': 'M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41 M12 7a5 5 0 1 0 0 10 5 5 0 1 0 0-10z',
  'droplets': 'M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97',
  'shield-plus': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12h6 M12 9v6',
  'zap': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  'sparkles': 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z M20 3v4 M22 5h-4',
  'stethoscope': 'M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3 M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4 M20 10a2 2 0 1 1 0 4 2 2 0 1 1 0-4',
  'baby': 'M9 12h.01 M15 12h.01 M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5 M9 2L7 4 M15 2l2 2 M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1h20z M2 8v.8A5 5 0 0 0 7 14a5 5 0 0 1 5 5 5 5 0 0 1 5-5 5 5 0 0 0 5-5.2V8',
  'syringe': 'M18 2l4 4 M17 7l3 3 M19 9l-8 8-4-4 8-8 M9 13l-7 7 M14 6l7 7-5 5-7-7 5-5z',
  'shield-check': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4',
  'shield': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  'user-round-check': 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M16 11l2 2 4-4',
  'clock': 'M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z M12 6v6l4 2',
  'bandage': 'M10 10.5h.01 M14 13.5h.01 M10 16.5h.01 M14 10.5h.01 M10 13.5h.01 M14 16.5h.01 M18 11l-6-6a2 2 0 0 0-3 0l-6 6a2 2 0 0 0 0 3l6 6a2 2 0 0 0 3 0l6-6a2 2 0 0 0 0-3z',
  'cross': 'M11 2h2v8h8v2h-8v8h-2v-8H3v-2h8V2z',
  'dumbbell': 'M14.4 14.4L9.6 9.6 M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l-1.768 1.768a2 2 0 1 1-2.828-2.829l1.767-1.768a2 2 0 1 1 2.828-2.828l1.768-1.768a2 2 0 1 1 2.829 2.828l1.768-1.767a2 2 0 1 1 2.828 2.829z',
  'run': 'M13 17l5 5-5 5 M7 13l5-5-5-5 M17 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z M9 11l-5 5 M14 4l-3 3 2 2 5-5-4 0z',
  'heart-handshake': 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z M12 7l-1.5 1.5 M16 11.5L14.5 10',
  'user': 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  'users': 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  'home': 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  'brain': 'M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z',
  'heart': 'M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z'
};

function generateSVG(config) {
  const { id, name, icon, gradient, accent } = config;
  const iconPath = iconPaths[icon] || iconPaths['heart'];

  return `<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${gradient[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${gradient[1]};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accent-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${accent};stop-opacity:0" />
      <stop offset="50%" style="stop-color:${accent};stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:${accent};stop-opacity:0" />
    </linearGradient>
  </defs>

  <!-- Background gradient -->
  <rect width="1200" height="800" fill="url(#grad-${id})"/>

  <!-- Decorative circles -->
  <circle cx="100" cy="100" r="150" fill="${accent}" opacity="0.3"/>
  <circle cx="1100" cy="700" r="200" fill="${accent}" opacity="0.2"/>
  <circle cx="900" cy="150" r="100" fill="${accent}" opacity="0.25"/>

  <!-- Accent bar -->
  <rect x="0" y="650" width="1200" height="150" fill="url(#accent-${id})"/>

  <!-- Main icon -->
  <g transform="translate(600, 400) scale(15)">
    <g transform="translate(-12, -12)" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="${iconPath}"/>
    </g>
  </g>

  <!-- Medical cross pattern (subtle) -->
  <g opacity="0.1">
    <path d="M 200 50 L 200 150 M 150 100 L 250 100" stroke="white" stroke-width="4"/>
    <path d="M 1000 600 L 1000 700 M 950 650 L 1050 650" stroke="white" stroke-width="4"/>
  </g>

  <!-- Service name -->
  <text x="600" y="680" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle" opacity="0.9">
    ${name}
  </text>

  <!-- Partner badge -->
  <g transform="translate(50, 720)">
    <rect x="0" y="0" width="280" height="50" rx="25" fill="white" opacity="0.2"/>
    <text x="140" y="33" font-family="Arial, sans-serif" font-size="20" font-weight="600" fill="white" text-anchor="middle">
      Patrangsit Hospital
    </text>
  </g>
</svg>`;
}

// Create healthcare images directory
const imagesDir = path.join(__dirname, '../public/images/healthcare');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate all images
console.log('Generating healthcare service images...\n');

serviceImages.forEach(config => {
  const svg = generateSVG(config);
  const filename = `${config.id}.svg`;
  const filepath = path.join(imagesDir, filename);

  fs.writeFileSync(filepath, svg);
  console.log(`✓ Created ${filename}`);
});

console.log(`\n✓ Successfully generated ${serviceImages.length} unique healthcare images!`);
console.log(`  Location: public/images/healthcare/`);
