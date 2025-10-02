import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilityContextType {
  isKeyboardUser: boolean;
  isReducedMotion: boolean;
  isHighContrast: boolean;
  focusVisible: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  isKeyboardUser: false,
  isReducedMotion: false,
  isHighContrast: false,
  focusVisible: false,
});

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);

  useEffect(() => {
    // Detect keyboard users
    const handleKeyDown = () => setIsKeyboardUser(true);
    const handleMouseDown = () => setIsKeyboardUser(false);
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionChange);
    
    // Check for high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(highContrastQuery.matches);
    
    const handleContrastChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches);
    };
    
    highContrastQuery.addEventListener('change', handleContrastChange);
    
    // Focus visible detection
    const handleFocusVisible = () => setFocusVisible(true);
    const handleBlurVisible = () => setFocusVisible(false);
    
    document.addEventListener('focusin', handleFocusVisible);
    document.addEventListener('focusout', handleBlurVisible);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      mediaQuery.removeEventListener('change', handleMotionChange);
      highContrastQuery.removeEventListener('change', handleContrastChange);
      document.removeEventListener('focusin', handleFocusVisible);
      document.removeEventListener('focusout', handleBlurVisible);
    };
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        isKeyboardUser,
        isReducedMotion,
        isHighContrast,
        focusVisible,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}; 