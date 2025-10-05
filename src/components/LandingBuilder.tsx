import React, { useState } from 'react';
import ComponentLibrary from './ComponentLibrary';

interface PageComponent {
  id: string;
  type: string;
  data: any;
}

export default function LandingBuilder() {
  const [components, setComponents] = useState<PageComponent[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentData = JSON.parse(e.dataTransfer.getData('text/plain'));
    
    setComponents([...components, {
      id: `${componentData.id}-${Date.now()}`,
      type: componentData.type,
      data: componentData
    }]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 p-4 border-r">
        <ComponentLibrary />
      </div>
      <div 
        className="flex-1 p-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="min-h-[500px] border-2 border-dashed border-gray-300 rounded-lg p-4">
          {components.length === 0 ? (
            <div className="text-center text-gray-500">
              Drag and drop components here
            </div>
          ) : (
            components.map((component) => (
              <div key={component.id} className="mb-4 p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold">{component.data.name}</h3>
                <p className="text-sm text-gray-600">{component.data.preview}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 