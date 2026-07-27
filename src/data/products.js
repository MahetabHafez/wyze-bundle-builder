
export const STEPS = [
  {
    id: 'cameras',
    stepNumber: 1,
    title: 'Choose your cameras',
    icon: 'camera',
    reviewGroup: 'Cameras',
    defaultOpen: true,
  },
  {
    id: 'plan',
    stepNumber: 2,
    title: 'Choose your plan',
    icon: 'shield',
    reviewGroup: 'Plan',
    defaultOpen: false,
  },
  {
    id: 'sensors',
    stepNumber: 3,
    title: 'Choose your sensors',
    icon: 'sensor',
    reviewGroup: 'Sensors',
    defaultOpen: false,
  },
  {
    id: 'accessories',
    stepNumber: 4,
    title: 'Add extra protection',
    icon: 'bolt',
    reviewGroup: 'Accessories',
    defaultOpen: false,
  },
]

export const PRODUCTS = {
  cameras: [
    {
      id: 'wyze-cam-v4',
      name: 'Wyze Cam v4',
      description: 'The clearest Wyze cam ever built. Color Night Vision.',
      image: '/images/v4.png',
      learnMoreUrl: '#',
      badge: 'Save 22%',
      price: 27.98,
      compareAtPrice: 35.98,
      variants: [
        { id: 'white', name: 'White', swatch: '#f5f5f0', image: '/images/v4.png' },
        { id: 'gray', name: 'Gray', swatch: '#9a9a9a', image: '/images/gray v4.jpg' },
        { id: 'black', name: 'Black', swatch: '#2b2b2b', image: '/images/v4 black.jpg' },
      ],
    },
    {
      id: 'wyze-cam-pan-v3',
      name: 'Wyze Cam Pan v3',
      description: '360° pan and 180° tilt security camera.',
      image: '/images/pan v3 white.jpg',
      learnMoreUrl: '#',
      badge: 'Save 12%',
      price: 34.98,
      compareAtPrice: 39.98,
      variants: [
        { id: 'white', name: 'White', swatch: '#f5f5f0', image: '/images/pan v3 white.jpg' },
        { id: 'black', name: 'Black', swatch: '#2b2b2b', image: '/images/panv3black.png' },
      ],
    },
    {
      id: 'wyze-cam-floodlight-v2',
      name: 'Wyze Cam Floodlight v2',
      description: '2K floodlight camera with a 160° wide-angle view.',
      image: '/images/Wyze Cam Floodlight v2 white.jpg',
      learnMoreUrl: '#',
      badge: 'Save 22%',
      price: 69.98,
      compareAtPrice: 89.98,
      variants: [
        { id: 'white', name: 'White', swatch: '#f5f5f0', image: '/images/Wyze Cam Floodlight v2 white.jpg' },
        { id: 'black', name: 'Black', swatch: '#2b2b2b', image: '/images/Wyze Cam Floodlight v2 black.jpg' },
      ],
    },
    {
      id: 'wyze-duo-cam-doorbell',
      name: 'Wyze Duo Cam Doorbell',
      description: 'Two cameras. Two views. Double the porch protection.',
      image: '/images/Wyze Duo Cam Doorbell white.jpg',
      learnMoreUrl: '#',
      badge: null,
      price: 69.98,
      compareAtPrice: null,
      variants: [],
    },
    {
      id: 'wyze-battery-cam-pro',
      name: 'Wyze Battery Cam Pro',
      description: 'Protect anywhere. See everything in 2.6K HDR. No power outlet or electrician needed.',
      image: '/images/Wyze Battery Cam Pro white.jpg',
      learnMoreUrl: '#',
      badge: 'Save 22%',
      price: 69.98,
      compareAtPrice: 89.98,
      variants: [
        { id: 'white', name: 'White', swatch: '#f5f5f0', image: '/images/Wyze Battery Cam Pro white.jpg' },
        { id: 'black', name: 'Black', swatch: '#2b2b2b', image: '/images/Wyze Battery Cam Pro black.jpg' },
      ],
    },
  ],

  plan: [
    {
      id: 'wyze-cam-unlimited',
      name: 'Cam Unlimited',
      description: 'Cloud storage, AI detection, and complete monitoring.',
      image: '/images/cam unlimited.png',
      learnMoreUrl: '#',
      badge: null,
      price: 9.99,
      compareAtPrice: 12.99,
      unit: '/mo',
      maxQuantity: 1,
      variants: [],
    },
  ],

  sensors: [
    {
      id: 'wyze-sense-motion',
      name: 'Wyze Sense Motion Sensor',
      description: 'Detects motion instantly anywhere in your home.',
      image: '/images/Wyze Sense Motion Sensor.png',
      learnMoreUrl: '#',
      badge: null,
      price: 29.99,
      compareAtPrice: null,
      variants: [],
    },
    {
      id: 'wyze-sense-hub',
      name: 'Wyze Sense Hub (Required)',
      description: 'The brain of your security system ecosystem.',
      image: '/images/wyze sense hub.png',
      learnMoreUrl: '#',
      badge: null,
      price: 0,
      compareAtPrice: 29.92,
      locked: true,
      maxQuantity: 1,
      variants: [],
    },
  ],

  accessories: [
    {
      id: 'wyze-microsd-card',
      name: 'Wyze MicroSD Card (256GB)',
      description: 'Continuous local video recording backup.',
      image: '/images/wyze 256.png',
      learnMoreUrl: '#',
      badge: null,
      price: 20.98,
      compareAtPrice: null,
      variants: [],
    },
  ],
}

export const SEED_SELECTIONS = {
  'wyze-cam-v4': { white: 1 },
  'wyze-cam-pan-v3': { white: 2 },
  'wyze-cam-unlimited': { _: 1 },
  'wyze-sense-motion': { _: 2 },
  'wyze-sense-hub': { _: 1 },
  'wyze-microsd-card': { _: 2 },
}

export const SEED_ACTIVE_VARIANTS = {
  'wyze-cam-v4': 'white',
  'wyze-cam-pan-v3': 'white',
  'wyze-cam-floodlight-v2': 'white',
  'wyze-battery-cam-pro': 'white',
}

export const SHIPPING = {
  label: 'Fast shipping',
  detail: 'Free — arrives in 3–5 business days',
  compareAtPrice: 5.99,
  price: 0,
}

export const GUARANTEE = {
  title: '100%',
  subtitle: 'Wyze satisfaction guarantee',
}

export const FINANCING = {
  label: 'As low as $19.19/mo',
  detail: 'with 12-month financing',
}
