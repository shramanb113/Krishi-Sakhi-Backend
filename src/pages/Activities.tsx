import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Sprout, Droplets, Scissors, Trash2, Filter } from 'lucide-react';
import { useFarmer } from '../context/FarmerContext';
import { activityAPI } from '../services/api';
import { Activity } from '../types';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';

const Activities: React.FC = () => {
  const { currentFarmer } = useFarmer();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newActivity, setNewActivity] = useState({
    type: '',
    details: ''
  });

  const activityTypes = [
    'Sowing', 'Planting', 'Irrigation', 'Fertilizing', 'Weeding',
    'Pest Control', 'Pruning', 'Harvesting', 'Land Preparation', 'Other'
  ];

  useEffect(() => {
    fetchActivities();
  }, [currentFarmer]);

  const fetchActivities = async () => {
    if (!currentFarmer) return;

    try {
      setIsLoading(true);
      const response = await activityAPI.getByFarmer(currentFarmer.farmerId);
      if (response.data.success) {
        setActivities(response.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch activities');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFarmer || !newActivity.type || !newActivity.details) return;

    try {
      setIsSubmitting(true);
      const response = await activityAPI.create({
        farmerId: currentFarmer.farmerId,
        type: newActivity.type,
        details: newActivity.details
      });

      if (response.data.success) {
        setActivities(prev => [response.data.data, ...prev]);
        setNewActivity({ type: '', details: '' });
        setShowAddForm(false);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add activity');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteActivity = async (activityId: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) return;

    try {
      await activityAPI.delete(activityId);
      setActivities(prev => prev.filter(activity => activity.id !== activityId));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete activity');
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sowing':
      case 'planting':
        return Sprout;
      case 'irrigation':
      case 'watering':
        return Droplets;
      case 'pruning':
      case 'weeding':
        return Scissors;
      default:
        return Calendar;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sowing':
      case 'planting':
        return 'bg-primary-100 text-primary-600';
      case 'irrigation':
      case 'watering':
        return 'bg-sky-100 text-sky-600';
      case 'harvesting':
        return 'bg-earth-100 text-earth-600';
      case 'pest control':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredActivities = filterType === 'all' 
    ? activities 
    : activities.filter(activity => activity.type.toLowerCase() === filterType.toLowerCase());

  if (!currentFarmer) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please complete onboarding to track activities.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Farm Activities</h1>
          <p className="text-gray-600">Track and manage your farming activities</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Log Activity</span>
        </button>
      </div>

      {/* Error Message */}
      {error && <ErrorMessage message={error} />}

      {/* Add Activity Form */}
      {showAddForm && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Log New Activity</h2>
          <form onSubmit={handleAddActivity} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Type *
              </label>
              <select
                value={newActivity.type}
                onChange={(e) => setNewActivity(prev => ({ ...prev, type: e.target.value }))}
                className="input-field"
                required
              >
                <option value="">Select activity type</option>
                {activityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Details *
              </label>
              <textarea
                value={newActivity.details}
                onChange={(e) => setNewActivity(prev => ({ ...prev, details: e.target.value }))}
                className="input-field"
                rows={3}
                placeholder="Describe the activity in detail..."
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting && <LoadingSpinner size="sm" />}
                <span>Save Activity</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewActivity({ type: '', details: '' });
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter */}
      <div className="flex items-center space-x-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="input-field max-w-xs"
        >
          <option value="all">All Activities</option>
          {activityTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <span className="text-sm text-gray-600">
          {filteredActivities.length} activities
        </span>
      </div>

      {/* Activities List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : filteredActivities.length > 0 ? (
        <div className="space-y-4">
          {filteredActivities.map((activity) => {
            const IconComponent = getActivityIcon(activity.type);
            const colorClass = getActivityColor(activity.type);
            
            return (
              <div key={activity.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 rounded-lg ${colorClass}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                          {activity.type}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date(activity.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700">{activity.details}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete activity"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filterType === 'all' ? 'No activities recorded yet' : `No ${filterType.toLowerCase()} activities found`}
          </h3>
          <p className="text-gray-600 mb-6">
            Start tracking your farming activities to get better insights
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            Log Your First Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default Activities;