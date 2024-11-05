import React, { useState, useEffect } from 'react';
import './DismissibleInfo.css'; // Make sure this file has the fade-out animation defined

export default function DismissibleInfo({ className = 'bg-green-700', children }) {
  const [showDismissible, setShowDismissible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  // This effect watches for changes in the `children` prop
  useEffect(() => {
    // Reset visibility and fade effect when `children` change
    setShowDismissible(true);
    setIsFading(false);

    // Set a timer to start the fade-out effect after 5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true); // Start fading
      const hideTimer = setTimeout(() => {
        setShowDismissible(false); // Hide the component after the fade-out completes
      }, 500); // Match the duration of the fade-out effect

      return () => clearTimeout(hideTimer); // Cleanup hideTimer on effect cleanup
    }, 5000); // Fade-out after 5 seconds

    // Cleanup the timers when component unmounts or `children` change
    return () => {
      clearTimeout(fadeTimer); // Clear the initial fadeTimer
    };
  }, [children]); // Re-run the effect when `children` prop changes

  return (
    <>
      { showDismissible && (
        <div
          className={ `px-4 py-2 text-white text-lg rounded-md ${className} dismissible-info ${isFading ? 'fade-out' : ''}` }
        >
          { children }
        </div>
      ) }
    </>
  );
}
