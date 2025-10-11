'use client';

import React, { useState, useEffect } from 'react';
import { Level } from '@/lib/types';

interface LevelFormData {
  level: number;
  name: string;
  requiredPoints: number;
  perks: string[];
  memberPercentage: number;
  badgeColor: string;
  isUnlocked: boolean;
}

const BADGE_COLORS = [
  'bg-blue-400',
  'bg-green-400',
  'bg-purple-400',
  'bg-orange-400',
  'bg-red-400',
  'bg-indigo-400',
  'bg-pink-400',
  'bg-yellow-400',
  'bg-gradient-to-r from-purple-400 to-pink-400',
  'bg-gradient-to-r from-blue-400 to-purple-400',
  'bg-gradient-to-r from-green-400 to-blue-400',
  'bg-gradient-to-r from-red-400 to-orange-400',
];

export default function AdminLevelsPage() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingLevel, setEditingLevel] = useState<number | null>(null);
  const [formData, setFormData] = useState<LevelFormData>({
    level: 1,
    name: '',
    requiredPoints: 0,
    perks: [''],
    memberPercentage: 100,
    badgeColor: 'bg-blue-400',
    isUnlocked: false,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load levels on component mount
  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = async () => {
    try {
      const response = await fetch('/api/admin/levels');
      const data = await response.json();
      if (response.ok) {
        setLevels(data.levels || []);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to load levels' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load levels' });
    } finally {
      setLoading(false);
    }
  };

  const saveLevels = async (updatedLevels: Level[]) => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/levels', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ levels: updatedLevels }),
      });

      const data = await response.json();
      if (response.ok) {
        setLevels(data.levels);
        setMessage({ type: 'success', text: data.message || 'Levels saved successfully!' });
        setEditingLevel(null);
        setShowAddForm(false);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save levels' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save levels' });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (level: Level) => {
    setFormData({
      level: level.level,
      name: level.name,
      requiredPoints: level.requiredPoints,
      perks: level.perks.length > 0 ? level.perks : [''],
      memberPercentage: level.memberPercentage,
      badgeColor: level.badgeColor,
      isUnlocked: level.isUnlocked,
    });
    setEditingLevel(level.level);
  };

  const handleSave = () => {
    const updatedLevels = levels.map(level => {
      if (level.level === editingLevel) {
        return {
          ...level,
          ...formData,
          perks: formData.perks.filter(perk => perk.trim() !== ''),
        };
      }
      return level;
    });

    saveLevels(updatedLevels);
  };

  const handleAddLevel = async () => {
    try {
      const response = await fetch('/api/admin/levels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          level: {
            ...formData,
            perks: formData.perks.filter(perk => perk.trim() !== ''),
          }
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setLevels(data.levels);
        setMessage({ type: 'success', text: data.message || 'Level added successfully!' });
        setShowAddForm(false);
        resetForm();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to add level' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add level' });
    }
  };

  const handleDelete = async (levelNumber: number) => {
    if (!confirm(`Are you sure you want to delete Level ${levelNumber}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/levels?level=${levelNumber}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        setLevels(data.levels);
        setMessage({ type: 'success', text: data.message || 'Level deleted successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to delete level' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete level' });
    }
  };

  const resetForm = () => {
    setFormData({
      level: Math.max(...levels.map(l => l.level), 0) + 1,
      name: '',
      requiredPoints: 0,
      perks: [''],
      memberPercentage: 100,
      badgeColor: 'bg-blue-400',
      isUnlocked: false,
    });
  };

  const addPerk = () => {
    setFormData(prev => ({
      ...prev,
      perks: [...prev.perks, ''],
    }));
  };

  const removePerk = (index: number) => {
    setFormData(prev => ({
      ...prev,
      perks: prev.perks.filter((_, i) => i !== index),
    }));
  };

  const updatePerk = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      perks: prev.perks.map((perk, i) => i === index ? value : perk),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading levels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Level Management</h1>
              <p className="text-gray-600 mt-2">Customize community levels, names, and benefits</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowAddForm(true);
                setEditingLevel(null);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New Level
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
            <button
              onClick={() => setMessage(null)}
              className="ml-2 text-lg font-bold hover:opacity-70"
            >
              ×
            </button>
          </div>
        )}

        {/* Levels List */}
        <div className="grid gap-6">
          {levels.map((level) => (
            <div key={level.level} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${level.badgeColor}`}>
                    {level.level}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Level {level.level} - {level.name}
                    </h3>
                    <p className="text-gray-600">
                      {level.requiredPoints} points • {level.memberPercentage}% of members
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(level)}
                    className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded border border-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(level.level)}
                    className="text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-600 hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Perks */}
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {level.perks.map((perk, index) => (
                    <li key={index} className="text-gray-600">{perk}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Edit/Add Form Modal */}
        {(editingLevel !== null || showAddForm) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingLevel !== null ? `Edit Level ${editingLevel}` : 'Add New Level'}
                  </h2>
                  <button
                    onClick={() => {
                      setEditingLevel(null);
                      setShowAddForm(false);
                    }}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Level Number
                      </label>
                      <input
                        type="number"
                        value={formData.level}
                        onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) || 1 }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Level Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Rookie, Player, Veteran"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Required Points
                      </label>
                      <input
                        type="number"
                        value={formData.requiredPoints}
                        onChange={(e) => setFormData(prev => ({ ...prev, requiredPoints: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Member %
                      </label>
                      <input
                        type="number"
                        value={formData.memberPercentage}
                        onChange={(e) => setFormData(prev => ({ ...prev, memberPercentage: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>
                  </div>

                  {/* Badge Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Badge Color
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {BADGE_COLORS.map((color) => (
                        <button
                          key={color}
                          onClick={() => setFormData(prev => ({ ...prev, badgeColor: color }))}
                          className={`w-12 h-12 rounded-full ${color} ${
                            formData.badgeColor === color ? 'ring-4 ring-blue-500' : ''
                          }`}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Perks */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Benefits/Perks
                    </label>
                    <div className="space-y-2">
                      {formData.perks.map((perk, index) => (
                        <div key={index} className="flex space-x-2">
                          <input
                            type="text"
                            value={perk}
                            onChange={(e) => updatePerk(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter a benefit or perk"
                          />
                          <button
                            onClick={() => removePerk(index)}
                            className="text-red-600 hover:text-red-800 px-3 py-2"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addPerk}
                        className="text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        + Add Benefit
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <button
                      onClick={() => {
                        setEditingLevel(null);
                        setShowAddForm(false);
                      }}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={editingLevel !== null ? handleSave : handleAddLevel}
                      disabled={saving || !formData.name.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {saving ? 'Saving...' : (editingLevel !== null ? 'Save Changes' : 'Add Level')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
