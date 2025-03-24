'use client';

import { useEffect } from 'react';

export default function ZoomPrevention() {
  useEffect(() => {
    // Prevent zooming with Ctrl + mouse wheel
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    // Prevent zooming with keyboard shortcuts (Ctrl +/-)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    // Clean up event listeners on unmount
    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // This component doesn't render anything
  return null;
}