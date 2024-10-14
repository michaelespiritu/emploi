import React, { useState, useEffect } from 'react';
import './DismissibleInfo.css';

export default function DismissibleInfo({ className = 'bg-green-700', children }) {
  const [showDismissible, setShowDismissible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      const fadeOutTimer = setTimeout(() => {
        setShowDismissible(false);
      }, 500);

      return () => clearTimeout(fadeOutTimer);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      { (showDismissible && children) && (
        <div className={ `px-4 py-2 text-white text-lg rounded-md ${className} dismissible-info ${isFading ? 'fade-out' : ''}` }>
          { children }
        </div>
      ) }
    </>
  );
}
