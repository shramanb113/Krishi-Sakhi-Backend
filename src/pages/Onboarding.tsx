import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Sprout, Droplets } from 'lucide-react';
import { farmerAPI } from '../services/api';
import { useFarmer } from '../context/FarmerContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';

interface FormData {
  name: string;
  phone: string;
  village: string;
  landSizeHectares: string;
  crops: string[];
  soilType: string;
  irrigation: string;
  language: string;
}

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentFarmer } = useFarmer();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    village: '',
    landSizeHectares: '',
    crops: [],
    soilType: '',
    irrigation: '',
    language: 'ml'
  });

  const keralaCrops = [
    'Rice', 'Coconut', 'Banana', 'Pepper', 'Cardamom', 'Ginger', 'Turmeric',
    'Rubber', 'Coffee', 'Tea', 'Vanilla', 'Nutmeg', 'Cinnamon', 'Clove',
    'Tapioca', 'Sweet Potato', 'Yam', 'Areca Nut', 'Cashew', 'Mango',
    'Jackfruit', 'Papaya', 'Pineapple', 'Guava', 'Sapota', 'Tomato',
    'Brinjal', 'Okra', 'Chili', 'Onion', 'Garlic', 'Drumstick'
  ];

  const soilTypes = [
    'Laterite', 'Alluvial', 'Red Soil', 'Black Soil', 'Coastal Sandy',
    'Hill Soil', 'Kuttanad Clay', 'Forest Soil'
  ];

  const irrigationTypes = [
    'Rainfed', 'Bore Well', 'Open Well', 'Canal', 'Drip Irrigation',
    'Sprinkler', 'Tank/Pond', 'River/Stream'
  ];

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleCropToggle = (crop: string) => {
    const updatedCrops = formData.crops.includes(crop)
      ? formData.crops.filter(c => c !== crop)
      : [...formData.crops, crop];
    handleInputChange('crops', updatedCrops);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.name.trim() !== '' && formData.phone.trim() !== '';
      case 2:
        return formData.village.trim() !== '';
      case 3:
        return formData.crops.length > 0;
      case 4:
        return true; // Optional fields
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      setError('Please fill in all required fields');
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    setError('');
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const farmerData = {
        ...formData,
        landSizeHectares: formData.landSizeHectares ? parseFloat(formData.landSizeHectares) : null,
        phone: formData.phone || null,
        village: formData.village || null,
        soilType: formData.soilType || null,
        irrigation: formData.irrigation || null,
        lat: null,
        lon: null
      };

      const response = await farmerAPI.create(farmerData);
      
      if (response.data.success) {
        setCurrentFarmer(response.data.data);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create farmer profile');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <User className="h-12 w-12 text-primary-600 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="input-field"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="input-field"
                >
                  <option value="ml">Malayalam (മലയാളം)</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 text-earth-600 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Location Details</h2>
              <p className="text-gray-600">Tell us about your farming location</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Village/Town *
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => handleInputChange('village', e.target.value)}
                  className="input-field"
                  placeholder="Enter your village or town name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Land Size (Hectares)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.landSizeHectares}
                  onChange={(e) => handleInputChange('landSizeHectares', e.target.value)}
                  className="input-field"
                  placeholder="Enter land size in hectares"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soil Type
                </label>
                <select
                  value={formData.soilType}
                  onChange={(e) => handleInputChange('soilType', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select soil type</option>
                  {soilTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Sprout className="h-12 w-12 text-primary-600 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Crops You Grow</h2>
              <p className="text-gray-600">Select all crops you currently grow or plan to grow</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {keralaCrops.map(crop => (
                <button
                  key={crop}
                  type="button"
                  onClick={() => handleCropToggle(crop)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    formData.crops.includes(crop)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>

            {formData.crops.length > 0 && (
              <div className="bg-primary-50 p-4 rounded-lg">
                <p className="text-sm text-primary-700">
                  Selected crops: {formData.crops.join(', ')}
                </p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Droplets className="h-12 w-12 text-sky-600 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Irrigation & Final Details</h2>
              <p className="text-gray-600">Complete your profile setup</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Irrigation Method
                </label>
                <select
                  value={formData.irrigation}
                  onChange={(e) => handleInputChange('irrigation', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select irrigation method</option>
                  {irrigationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="bg-sky-50 p-4 rounded-lg">
                <h3 className="font-medium text-sky-900 mb-2">Profile Summary</h3>
                <div className="text-sm text-sky-800 space-y-1">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Village:</strong> {formData.village}</p>
                  <p><strong>Crops:</strong> {formData.crops.join(', ')}</p>
                  {formData.landSizeHectares && (
                    <p><strong>Land Size:</strong> {formData.landSizeHectares} hectares</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of 4
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / 4) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <ErrorMessage message={error} className="mb-6" />}

        {/* Step Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentStep < 4 ? (
            <button onClick={handleNext} className="btn-primary">
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading && <LoadingSpinner size="sm" />}
              <span>Complete Setup</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;