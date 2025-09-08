import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Search, MapPin, Calendar } from 'lucide-react';
import { mockMandiPrices } from '../services/mockData';
import { MandiPrice } from '../types';

const MandiPrices: React.FC = () => {
  const [prices, setPrices] = useState<MandiPrice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPrices(mockMandiPrices);
      setIsLoading(false);
    }, 1000);
  }, []);

  const markets = Array.from(new Set(prices.map(price => price.market)));

  const filteredPrices = prices.filter(price => {
    const matchesSearch = price.commodity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMarket = selectedMarket === 'all' || price.market === selectedMarket;
    return matchesSearch && matchesMarket;
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50';
      case 'down':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Kerala Mandi Prices</h1>
        <p className="text-gray-600">
          Real-time market prices for agricultural commodities across Kerala
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString('en-IN')}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search commodities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="md:w-64">
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="input-field"
            >
              <option value="all">All Markets</option>
              {markets.map(market => (
                <option key={market} value={market}>{market}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Price Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrices.map((price, index) => (
            <div key={index} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {price.commodity}
                  </h3>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{price.market}</span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${getTrendColor(price.trend)}`}>
                  {getTrendIcon(price.trend)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(price.price)}
                  </span>
                  <span className="text-sm text-gray-600">
                    {price.unit}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(price.trend)}`}>
                    {getTrendIcon(price.trend)}
                    <span className="capitalize">{price.trend}</span>
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(price.date).toLocaleDateString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredPrices.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No prices found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Market Summary */}
      <div className="card bg-gradient-to-r from-primary-50 to-sky-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Market Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {prices.filter(p => p.trend === 'up').length}
            </div>
            <div className="text-gray-600">Prices Rising</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {prices.filter(p => p.trend === 'down').length}
            </div>
            <div className="text-gray-600">Prices Falling</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-600 mb-2">
              {prices.filter(p => p.trend === 'stable').length}
            </div>
            <div className="text-gray-600">Stable Prices</div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Disclaimer:</strong> Prices are indicative and may vary. Please verify with local markets before making transactions. 
          Data is updated regularly but may not reflect real-time changes.
        </p>
      </div>
    </div>
  );
};

export default MandiPrices;