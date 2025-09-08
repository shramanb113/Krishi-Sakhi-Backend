import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Users, TrendingUp, Shield, MessageCircle, Calendar } from 'lucide-react';
import { useFarmer } from '../context/FarmerContext';

const Home: React.FC = () => {
  const { currentFarmer } = useFarmer();

  const features = [
    {
      icon: MessageCircle,
      title: 'AI-Powered Assistant',
      description: 'Get personalized farming advice in Malayalam and English',
      color: 'text-primary-600'
    },
    {
      icon: Calendar,
      title: 'Activity Tracking',
      description: 'Track your farming activities and get insights',
      color: 'text-earth-600'
    },
    {
      icon: TrendingUp,
      title: 'Market Prices',
      description: 'Real-time mandi prices for Kerala markets',
      color: 'text-sky-600'
    },
    {
      icon: Shield,
      title: 'Government Schemes',
      description: 'Discover and apply for farming schemes and subsidies',
      color: 'text-primary-600'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with fellow farmers and share knowledge',
      color: 'text-earth-600'
    },
    {
      icon: Sprout,
      title: 'Crop Management',
      description: 'Manage your crops with expert guidance',
      color: 'text-sky-600'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Welcome to <span className="text-primary-600">Krishi Sakhi</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-malayalam">
            കൃഷി സഖി - Your Farming Friend
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Empowering Kerala's farmers with AI-driven agricultural guidance, 
            market insights, and comprehensive farming support in your native language.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {currentFarmer ? (
            <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/onboarding" className="btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
          )}
          <Link to="/mandi-prices" className="btn-secondary text-lg px-8 py-3">
            View Market Prices
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Everything You Need for Smart Farming
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Comprehensive tools designed specifically for Kerala's agricultural community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-50 rounded-2xl p-8">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Supporting Kerala's Agricultural Growth
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-gray-600">Farmers Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-earth-600 mb-2">50+</div>
              <div className="text-gray-600">Crops Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-sky-600 mb-2">24/7</div>
              <div className="text-gray-600">AI Assistant</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!currentFarmer && (
        <section className="text-center bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Kerala farmers who are already benefiting from Krishi Sakhi
          </p>
          <Link to="/onboarding" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors text-lg">
            Start Your Journey
          </Link>
        </section>
      )}
    </div>
  );
};

export default Home;