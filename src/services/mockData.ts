import { MandiPrice, GovernmentScheme, WeatherData } from '../types';

// Mock Mandi Prices for Kerala markets
export const mockMandiPrices: MandiPrice[] = [
  {
    commodity: 'Rice (Ponni)',
    market: 'Palakkad',
    price: 2800,
    unit: 'per quintal',
    date: '2025-01-08',
    trend: 'up'
  },
  {
    commodity: 'Coconut',
    market: 'Kozhikode',
    price: 25,
    unit: 'per piece',
    date: '2025-01-08',
    trend: 'stable'
  },
  {
    commodity: 'Black Pepper',
    market: 'Idukki',
    price: 45000,
    unit: 'per quintal',
    date: '2025-01-08',
    trend: 'up'
  },
  {
    commodity: 'Cardamom',
    market: 'Thekkady',
    price: 120000,
    unit: 'per quintal',
    date: '2025-01-08',
    trend: 'down'
  },
  {
    commodity: 'Banana (Nendran)',
    market: 'Thrissur',
    price: 3500,
    unit: 'per quintal',
    date: '2025-01-08',
    trend: 'up'
  },
  {
    commodity: 'Ginger',
    market: 'Wayanad',
    price: 8500,
    unit: 'per quintal',
    date: '2025-01-08',
    trend: 'stable'
  },
  {
    commodity: 'Turmeric',
    market: 'Ernakulam',
    price: 7200,
    unit: 'per quintal',
    date: '2025-01-08',
    trend: 'up'
  },
  {
    commodity: 'Rubber',
    market: 'Kottayam',
    price: 18500,
    unit: 'per quintal',
    date: '2025-01-08',
    trend: 'down'
  }
];

// Mock Government Schemes for Kerala farmers
export const mockGovernmentSchemes: GovernmentScheme[] = [
  {
    id: '1',
    name: 'Kerala Farmer Producer Organization (FPO) Scheme',
    description: 'Support for formation and promotion of Farmer Producer Organizations to enhance farmers\' income through collective farming and marketing.',
    eligibility: [
      'Small and marginal farmers',
      'Minimum 10 farmers required to form FPO',
      'Must be engaged in agriculture/allied activities'
    ],
    benefits: 'Financial assistance up to ₹15 lakh for FPO formation, training, and infrastructure development',
    applicationProcess: 'Apply through District Collector office or online portal',
    deadline: '2025-03-31',
    category: 'Cooperative Farming'
  },
  {
    id: '2',
    name: 'Subhiksha Kerala - Vegetable Cultivation Scheme',
    description: 'Promotion of vegetable cultivation to achieve self-sufficiency in vegetable production in Kerala.',
    eligibility: [
      'All categories of farmers',
      'Minimum 0.1 hectare land for cultivation',
      'Should commit to organic farming practices'
    ],
    benefits: 'Subsidy up to 50% for seeds, fertilizers, and farming equipment',
    applicationProcess: 'Apply through Krishi Bhavan in your panchayat',
    deadline: '2025-06-30',
    category: 'Crop Production'
  },
  {
    id: '3',
    name: 'Kerala Coconut Development Scheme',
    description: 'Comprehensive support for coconut cultivation, processing, and value addition.',
    eligibility: [
      'Coconut farmers and entrepreneurs',
      'Minimum 25 coconut palms',
      'Should be resident of Kerala'
    ],
    benefits: 'Subsidy for coconut cultivation, processing units, and marketing support',
    applicationProcess: 'Apply through Coconut Development Board offices',
    category: 'Plantation Crops'
  },
  {
    id: '4',
    name: 'Rashtriya Krishi Vikas Yojana (RKVY)',
    description: 'Centrally sponsored scheme for overall development of agriculture and allied sectors.',
    eligibility: [
      'Individual farmers and farmer groups',
      'Agricultural entrepreneurs',
      'Self Help Groups in agriculture'
    ],
    benefits: 'Financial assistance for agriculture infrastructure, technology adoption, and capacity building',
    applicationProcess: 'Apply through State Agriculture Department',
    category: 'Infrastructure Development'
  },
  {
    id: '5',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description: 'Crop insurance scheme providing financial support to farmers in case of crop loss.',
    eligibility: [
      'All farmers including sharecroppers and tenant farmers',
      'Must have insurable interest in the crop',
      'Crops should be notified by the government'
    ],
    benefits: 'Insurance coverage for crop loss due to natural calamities, pests, and diseases',
    applicationProcess: 'Apply through banks, insurance companies, or online portal',
    deadline: '2025-04-15',
    category: 'Insurance'
  },
  {
    id: '6',
    name: 'Kerala Spices Development Scheme',
    description: 'Promotion of spice cultivation and value addition in Kerala.',
    eligibility: [
      'Spice farmers in Kerala',
      'Minimum 0.25 hectare under spice cultivation',
      'Should adopt good agricultural practices'
    ],
    benefits: 'Subsidy for planting material, organic inputs, and processing equipment',
    applicationProcess: 'Apply through Spices Board regional offices',
    category: 'Spice Cultivation'
  }
];

// Mock Weather Data
export const mockWeatherData: WeatherData = {
  temperature: 28,
  humidity: 78,
  rainfall: 12,
  windSpeed: 8,
  condition: 'Partly Cloudy',
  forecast: [
    {
      date: '2025-01-09',
      condition: 'Light Rain',
      maxTemp: 30,
      minTemp: 24,
      rainfall: 8
    },
    {
      date: '2025-01-10',
      condition: 'Cloudy',
      maxTemp: 29,
      minTemp: 23,
      rainfall: 2
    },
    {
      date: '2025-01-11',
      condition: 'Sunny',
      maxTemp: 32,
      minTemp: 25,
      rainfall: 0
    },
    {
      date: '2025-01-12',
      condition: 'Thunderstorm',
      maxTemp: 28,
      minTemp: 22,
      rainfall: 25
    },
    {
      date: '2025-01-13',
      condition: 'Partly Cloudy',
      maxTemp: 31,
      minTemp: 24,
      rainfall: 5
    }
  ]
};