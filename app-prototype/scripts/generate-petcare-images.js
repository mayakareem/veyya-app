const fs = require('fs');
const path = require('path');

// Pet care service image configurations
const serviceImages = [
  // DOG GROOMING - Warm orange/amber tones
  {
    id: 'basic-grooming-dog',
    name: 'Basic Grooming (Dog)',
    icon: 'scissors',
    gradient: ['#fed7aa', '#fdba74'],
    accent: '#ffedd5'
  },
  {
    id: 'full-grooming-dog',
    name: 'Full Grooming (Dog)',
    icon: 'sparkles',
    gradient: ['#fcd34d', '#fbbf24'],
    accent: '#fef3c7'
  },
  {
    id: 'bath-dry-dog',
    name: 'Bath & Blow Dry (Dog)',
    icon: 'droplets',
    gradient: ['#93c5fd', '#60a5fa'],
    accent: '#dbeafe'
  },
  {
    id: 'nail-ear-dog',
    name: 'Nail & Ear Care (Dog)',
    icon: 'stethoscope',
    gradient: ['#c4b5fd', '#a78bfa'],
    accent: '#ede9fe'
  },
  
  // CAT GROOMING - Soft purple/pink tones
  {
    id: 'basic-grooming-cat',
    name: 'Basic Grooming (Cat)',
    icon: 'scissors',
    gradient: ['#dda4fd', '#c084fc'],
    accent: '#f3e8ff'
  },
  {
    id: 'full-grooming-cat',
    name: 'Full Grooming (Cat)',
    icon: 'sparkles',
    gradient: ['#f9a8d4', '#f472b6'],
    accent: '#fce7f3'
  },
  {
    id: 'bath-dry-cat',
    name: 'Bath & Blow Dry (Cat)',
    icon: 'droplets',
    gradient: ['#a5b4fc', '#818cf8'],
    accent: '#e0e7ff'
  },
  {
    id: 'nail-ear-cat',
    name: 'Nail & Ear Care (Cat)',
    icon: 'heart',
    gradient: ['#fda4af', '#fb7185'],
    accent: '#ffe4e6'
  },

  // WALKING - Green/nature tones
  {
    id: 'walk-15min',
    name: '15-Minute Walk',
    icon: 'footprints',
    gradient: ['#86efac', '#4ade80'],
    accent: '#dcfce7'
  },
  {
    id: 'walk-30min',
    name: '30-Minute Walk',
    icon: 'footprints',
    gradient: ['#6ee7b7', '#34d399'],
    accent: '#d1fae5'
  },
  {
    id: 'walk-60min',
    name: '60-Minute Walk',
    icon: 'footprints',
    gradient: ['#5eead4', '#2dd4bf'],
    accent: '#ccfbf1'
  },

  // SITTING - Cozy blue/teal tones
  {
    id: 'pet-sitting',
    name: 'Pet Sitting (Hourly)',
    icon: 'home',
    gradient: ['#67e8f9', '#22d3ee'],
    accent: '#cffafe'
  },
  {
    id: 'day-care',
    name: 'Pet Day Care',
    icon: 'sun',
    gradient: ['#fcd34d', '#fbbf24'],
    accent: '#fef3c7'
  },
  {
    id: 'home-checkin',
    name: 'Home Check-In',
    icon: 'clipboard-check',
    gradient: ['#a5b4fc', '#818cf8'],
    accent: '#e0e7ff'
  },

  // TRAINING - Bold purple/indigo tones
  {
    id: 'puppy-training',
    name: 'Puppy Training',
    icon: 'award',
    gradient: ['#c4b5fd', '#a78bfa'],
    accent: '#ede9fe'
  },
  {
    id: 'behavior-consultation',
    name: 'Behavior Consultation',
    icon: 'brain',
    gradient: ['#a5b4fc', '#818cf8'],
    accent: '#e0e7ff'
  }
];

// Icon path data (Lucide-style icons)
const iconPaths = {
  'scissors': 'M20 4L8.5 15.5 M12 6L6 18 M2 22l3-3 M12 6l6 0 M6 18l0 6',
  'sparkles': 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z M20 3v4 M22 5h-4',
  'droplets': 'M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97',
  'stethoscope': 'M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3 M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4 M20 10a2 2 0 1 1 0 4 2 2 0 1 1 0-4',
  'heart': 'M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z',
  'footprints': 'M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0z M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0z',
  'home': 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  'sun': 'M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41 M12 7a5 5 0 1 0 0 10 5 5 0 1 0 0-10z',
  'clipboard-check': 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M9 12l2 2 4-4 M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z',
  'award': 'M12 2a5 5 0 1 0 0 10 5 5 0 1 0 0-10z M8.21 13.89L7 23l5-3 5 3-1.21-9.11',
  'brain': 'M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z'
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

  <!-- Decorative paw prints (subtle) -->
  <g opacity="0.15" fill="white">
    <circle cx="200" cy="250" r="15"/>
    <circle cx="185" cy="230" r="10"/>
    <circle cx="215" cy="230" r="10"/>
    <circle cx="190" cy="270" r="8"/>
    <circle cx="210" cy="270" r="8"/>
    
    <circle cx="950" cy="550" r="15"/>
    <circle cx="935" cy="530" r="10"/>
    <circle cx="965" cy="530" r="10"/>
    <circle cx="940" cy="570" r="8"/>
    <circle cx="960" cy="570" r="8"/>
  </g>

  <!-- Service name -->
  <text x="600" y="680" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle" opacity="0.9">
    ${name}
  </text>

  <!-- Partner badge -->
  <g transform="translate(50, 720)">
    <rect x="0" y="0" width="250" height="50" rx="25" fill="white" opacity="0.2"/>
    <text x="125" y="33" font-family="Arial, sans-serif" font-size="20" font-weight="600" fill="white" text-anchor="middle">
      Professional Pet Care
    </text>
  </g>
</svg>`;
}

// Create petcare images directory
const imagesDir = path.join(__dirname, '../public/images/petcare');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate all images
console.log('Generating pet care service images...\n');

serviceImages.forEach(config => {
  const svg = generateSVG(config);
  const filename = `${config.id}.svg`;
  const filepath = path.join(imagesDir, filename);

  fs.writeFileSync(filepath, svg);
  console.log(`✓ Created ${filename}`);
});

console.log(`\n✓ Successfully generated ${serviceImages.length} unique pet care images!`);
console.log(`  Location: public/images/petcare/`);
