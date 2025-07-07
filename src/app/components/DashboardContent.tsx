'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  lastModified: string;
  status: 'draft' | 'published';
}

export default function DashboardContent() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-commerce Landing Page',
      lastModified: '2 hours ago',
      status: 'published'
    },
    {
      id: '2',
      name: 'Portfolio Website',
      lastModified: '1 day ago',
      status: 'draft'
    },
    {
      id: '3',
      name: 'SaaS Product Page',
      lastModified: '3 days ago',
      status: 'published'
    }
  ]);

  const stats = [
    { label: 'Total Projects', value: '12' },
    { label: 'Published Pages', value: '8' },
    { label: 'Draft Pages', value: '4' },
    { label: 'Total Views', value: '1.2K' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <Link 
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Page
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Projects</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {project.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Last modified {project.lastModified}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      project.status === 'published' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Create New Page
              </button>
              <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Import Template
              </button>
              <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                View Analytics
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">Published "E-commerce Landing Page"</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-sm">✎</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">Edited "Portfolio Website"</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Resources</h3>
            <div className="space-y-3">
              <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                Documentation
              </a>
              <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                Video Tutorials
              </a>
              <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                Community Forum
              </a>
              <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                Support Center
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 