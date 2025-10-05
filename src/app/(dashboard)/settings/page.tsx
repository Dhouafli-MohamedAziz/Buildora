'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import AdvancedNavbar from '@/components/UserNavbar';
import Avatar from '@/components/Avatar';

interface UserSettings {
  email_notifications: boolean;
  auto_save: boolean;
  public_profile: boolean;
  data_collection: boolean;
}

interface UserStats {
  projects_created: number;
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState<UserSettings>({
    email_notifications: true,
    auto_save: true,
    public_profile: false,
    data_collection: true
  });

  const [userStats, setUserStats] = useState<UserStats>({
    projects_created: 0
  });

  // Load user data on component mount
  useEffect(() => {
    if (session?.user) {
      loadUserSettings();
      loadUserStats();
    }
  }, [session]);

  const loadUserSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/${session?.user?.email}/settings`);
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading user settings:', error);
      setMessage({ type: 'error', text: 'Failed to load settings' });
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserStats = async () => {
    try {
      const response = await fetch(`/api/users/${session?.user?.email}/stats`);
      if (response.ok) {
        const data = await response.json();
        setUserStats(data);
      }
    } catch (error) {
      console.error('Error loading user stats:', error);
    }
  };

  const handleSettingChange = (setting: keyof UserSettings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      const response = await fetch(`/api/users/${session?.user?.email}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.message || 'Failed to save settings' });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Loading settings...</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col w-screen h-screen overflow-hidden text-white">
        {/* Animated background blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ left: '20%', top: '10%' }}
          />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-bounce" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
        
        {/* Advanced Navbar */}
        <AdvancedNavbar />
        
        {/* Message Toast */}
        {message && (
          <div className={`fixed top-20 right-6 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            <div className="flex items-center space-x-2">
              <span>{message.text}</span>
              <button onClick={() => setMessage(null)} className="ml-2 text-white hover:text-gray-200">
                ×
              </button>
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-0 w-full h-full pt-16 relative z-10">
          <div className="flex-1 min-h-0 w-full h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
              
              {/* Header Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Application Settings</h1>
                <p className="text-gray-400">Configure your Buildora experience</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column - Quick Info */}
                <div className="lg:col-span-1">
                  {/* Info Card */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="text-center mb-6">
                      <div className="inline-block mb-4">
                        <Avatar size="xl" showStatus={true} />
                      </div>
                      <h2 className="text-xl font-semibold text-white mb-1">{session?.user?.name || 'User'}</h2>
                      <p className="text-gray-400 text-sm">{session?.user?.email}</p>
                      <div className="flex items-center justify-center mt-2 space-x-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full">Premium User</span>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 gap-4">
                      <div className="text-center p-3 bg-white/5 rounded-xl">
                        <div className="text-2xl font-bold text-white">{userStats.projects_created}</div>
                        <div className="text-xs text-gray-400">Projects Created</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Settings */}
                <div className="lg:col-span-2">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                    <div className="p-6">
                      
                      {/* General Settings Section */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold text-white flex items-center">
                            <span className="mr-2">⚙️</span>
                            General Settings
                          </h3>
                          <button
                            onClick={handleSaveSettings}
                            disabled={isSaving}
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all disabled:opacity-50"
                          >
                            {isSaving ? 'Saving...' : 'Save Settings'}
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">Email Notifications</h4>
                                <p className="text-gray-400 text-sm">Receive email updates about your projects</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer" 
                                  checked={settings.email_notifications}
                                  onChange={() => handleSettingChange('email_notifications')}
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                              </label>
                            </div>
                          </div>

                          <div className="p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">Auto-save Projects</h4>
                                <p className="text-gray-400 text-sm">Automatically save your work every few minutes</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer" 
                                  checked={settings.auto_save}
                                  onChange={() => handleSettingChange('auto_save')}
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Privacy Settings Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                          <span className="mr-2">🔒</span>
                          Privacy Settings
                        </h3>
                        
                        <div className="space-y-4">
                          <div className="p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">Public Profile</h4>
                                <p className="text-gray-400 text-sm">Allow others to view your public projects</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer" 
                                  checked={settings.public_profile}
                                  onChange={() => handleSettingChange('public_profile')}
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                              </label>
                            </div>
                          </div>

                          <div className="p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">Data Collection</h4>
                                <p className="text-gray-400 text-sm">Help improve Buildora with anonymous usage data</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer" 
                                  checked={settings.data_collection}
                                  onChange={() => handleSettingChange('data_collection')}
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
} 