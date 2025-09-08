import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, MessageCircle, TrendingUp, Shield, 
  Sprout, Droplets, Sun, CloudRain, Plus,
  Activity, BarChart3, Users
} from 'lucide-react';
import { useFarmer } from '../context/FarmerContext';
import { activityAPI } from '../services/api';
import { mockWeatherData } from '../services/mockData';
import { Activity as ActivityType } from '../types';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { currentFarmer } = useFarmer();
  const [recentActivities, setRecentActivities] = useState<ActivityType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      if (!currentFarmer) return;
      
      try {
        const response = await activityAPI.getByFarmer(currentFarmer.farmerId);
        if (response.data.success) {
          setRecentActivities(response.data.data.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentActivities();
  }, [currentFarmer]);

  if (!currentFarmer) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please complete onboarding to access your dashboard.</p>
        <Link to="/onboarding" className="btn-primary mt-4">
          Complete Setup
        </Link>
      </div>
    );
  }

  const quickActions = [
    {
      icon: MessageCircle,
      title: 'Ask AI Assistant',
      description: 'Get farming advice',
      link: '/chat',
      color: 'bg-primary-500 hover:bg-primary-600'
    },
    {
      icon: Plus,
      title: 'Log Activity',
      description: 'Record farming activity',
      link: '/activities',
      color: 'bg-earth-500 hover:bg-earth-600'
    },
    {
      icon: TrendingUp,
      title: 'Market Prices',
      description: 'Check current rates',
      link: '/mandi-prices',
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      icon: Shield,
      title: 'Government Schemes',
      description: 'Explore benefits',
      link: '/schemes',
      color: 'bg-primary-500 hover:bg-primary-600'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sowing':
      case 'planting':
        return Sprout;
      case 'irrigation':
      case 'watering':
        return Droplets;
      case 'harvest':
      case 'harvesting':
        return Activity;
      default:
        return Calendar;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {currentFarmer.name}!
            </h1>
            <p className="text-primary-100 text-lg">
              Farmer ID: {currentFarmer.farmerId} • {currentFarmer.village}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {currentFarmer.crops.slice(0, 3).map((crop, index) => (
                <span key={index} className="bg-primary-500 px-3 py-1 rounded-full text-sm">
                  {crop}
                </span>
              ))}
              {currentFarmer.crops.length > 3 && (
                <span className="bg-primary-500 px-3 py-1 rounded-full text-sm">
                  +{currentFarmer.crops.length - 3} more
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-right">
              <p className="text-primary-100 text-sm">Land Size</p>
              <p className="text-2xl font-bold">
                {currentFarmer.landSizeHectares || 'N/A'} 
                {currentFarmer.landSizeHectares && ' ha'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className={`${action.color} text-white p-6 rounded-xl transition-all hover:scale-105 hover:shadow-lg`}
          >
            <div className="flex items-center space-x-4">
              <action.icon className="h-8 w-8" />
              <div>
                <h3 className="font-semibold text-lg">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weather Widget */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Today's Weather</h2>
            <Sun className="h-6 w-6 text-yellow-500" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {mockWeatherData.temperature}°C
                </p>
                <p className="text-gray-600">{mockWeatherData.condition}</p>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p>Humidity: {mockWeatherData.humidity}%</p>
                <p>Wind: {mockWeatherData.windSpeed} km/h</p>
                <p>Rainfall: {mockWeatherData.rainfall}mm</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-2">5-Day Forecast</h3>
              <div className="space-y-2">
                {mockWeatherData.forecast.slice(0, 3).map((day, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className="text-gray-900">{day.condition}</span>
                    <span className="text-gray-600">
                      {day.maxTemp}°/{day.minTemp}°
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            <Link to="/activities" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const IconComponent = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-white p-2 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 capitalize">
                          {activity.type}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {activity.details}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No activities recorded yet</p>
              <Link to="/activities" className="btn-primary mt-4">
                Log Your First Activity
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{recentActivities.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="bg-earth-100 p-3 rounded-lg">
              <Sprout className="h-6 w-6 text-earth-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Crops Growing</p>
              <p className="text-2xl font-bold text-gray-900">{currentFarmer.crops.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="bg-sky-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-sky-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Community Rank</p>
              <p className="text-2xl font-bold text-gray-900">Top 10%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weather-based Suggestions Placeholder */}
      <div className="card bg-gradient-to-r from-sky-50 to-primary-50">
        <div className="flex items-start space-x-4">
          <div className="bg-sky-100 p-3 rounded-lg">
            <CloudRain className="h-6 w-6 text-sky-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Weather-Based Suggestions
            </h3>
            <p className="text-gray-600 mb-4">
              Based on the upcoming weather forecast, here are some recommendations for your crops:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                • Light rain expected tomorrow - good time for transplanting seedlings
              </p>
              <p className="text-gray-700">
                • High humidity levels - monitor for fungal diseases in your crops
              </p>
              <p className="text-gray-700">
                • Sunny weather ahead - ensure adequate irrigation for your vegetables
              </p>
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                Coming Soon: Personalized Weather Alerts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;