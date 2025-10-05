'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import AdvancedNavbar from '@/components/UserNavbar';
import Avatar from '@/components/Avatar';

interface ProfileData {
  username: string;
  email: string;
  is_verified: boolean;
  created_at: string;
}

interface UserStats {
  projects_created: number;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [profileData, setProfileData] = useState<ProfileData>({
    username: '',
    email: '',
    is_verified: false,
    created_at: ''
  });

  const [userStats, setUserStats] = useState<UserStats>({
    projects_created: 0
  });

  // Load user data on component mount
  useEffect(() => {
    if (session?.user) {
      loadUserData();
      loadUserStats();
    }
  }, [session]);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/${session?.user?.email}`);
      if (response.ok) {
        const data = await response.json();
        setProfileData({
          username: data.username || session?.user?.name || '',
          email: data.email || session?.user?.email || '',
          is_verified: data.is_verified || false,
          created_at: data.created_at || ''
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setMessage({ type: 'error', text: 'Failed to load user data' });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch(`/api/users/${session?.user?.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
        // Reload data to get any server-side updates
        await loadUserData();
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage({ type: 'error', text: 'Failed to save changes' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    loadUserData(); // Reset to original data
    setIsEditing(false);
    setMessage(null);
  };

  const handlePasswordChange = async () => {
    // This would typically open a modal or navigate to a password change page
    router.push('/change-password');
  };

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Loading profile...</p>
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
                <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
                <p className="text-gray-400">Manage your account settings and preferences</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column - Profile Info */}
                <div className="lg:col-span-1">
                  {/* Profile Card */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="text-center mb-6">
                      <div className="inline-block mb-4">
                        <Avatar size="xl" showStatus={true} />
                      </div>
                      <h2 className="text-xl font-semibold text-white mb-1">{profileData.username || session?.user?.name || 'User'}</h2>
                      <p className="text-gray-400 text-sm">{profileData.email}</p>
                      <div className="flex items-center justify-center mt-2 space-x-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full">Premium User</span>
                        {profileData.is_verified && (
                          <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full">Verified</span>
                        )}
                      </div>
                      {profileData.created_at && (
                        <p className="text-xs text-gray-500 mt-2">Member since {new Date(profileData.created_at).toLocaleDateString()}</p>
                      )}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-4">
                      <div className="text-center p-3 bg-white/5 rounded-xl">
                        <div className="text-2xl font-bold text-white">{userStats.projects_created}</div>
                        <div className="text-xs text-gray-400">Projects Created</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - All Settings */}
                <div className="lg:col-span-2">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                    <div className="p-6">
                      
                      {/* Personal Information Section */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold text-white flex items-center">
                            <span className="mr-2">👤</span>
                            Personal Information
                          </h3>
                          <button
                            onClick={() => setIsEditing(!isEditing)}
                            disabled={isSaving}
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all disabled:opacity-50"
                          >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                            <input
                              type="text"
                              name="username"
                              value={profileData.username}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                              type="email"
                              name="email"
                              value={profileData.email}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                            />
                          </div>
                        </div>

                        {isEditing && (
                          <div className="flex items-center justify-end space-x-3 pt-4">
                            <button
                              onClick={handleCancel}
                              disabled={isSaving}
                              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all disabled:opacity-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSave}
                              disabled={isSaving}
                              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all disabled:opacity-50"
                            >
                              {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Security Section */}
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                          <span className="mr-2">🔒</span>
                          Security Settings
                        </h3>
                        
                        <div className="space-y-4">
                          <div className="p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">Change Password</h4>
                                <p className="text-gray-400 text-sm">Update your password to keep your account secure</p>
                              </div>
                              <button 
                                onClick={handlePasswordChange}
                                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg text-sm font-medium transition-all"
                              >
                                Change
                              </button>
                            </div>
                          </div>

                          <div className="p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                                <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                              </div>
                              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all">
                                Enable
                              </button>
                            </div>
                          </div>

                          <div className="p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">Login History</h4>
                                <p className="text-gray-400 text-sm">View your recent login activity</p>
                              </div>
                              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all">
                                View
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Preferences Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                          <span className="mr-2">⚙️</span>
                          Preferences
                        </h3>
                        
                        <div className="space-y-4">
                          <div className="p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">Email Notifications</h4>
                                <p className="text-gray-400 text-sm">Receive email updates about your projects</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
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