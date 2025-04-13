/**
 * This file patches the React Navigation behavior for the web version
 * to handle navigation to undefined screens gracefully
 */
import { navigate } from './App.web';

// Patch the navigation function to use our custom handler
// This will intercept navigation attempts and handle them appropriately
export function patchNavigation() {
  // Store the original navigate function from React Navigation
  const originalNavigate = global.REACT_NAVIGATION_NAVIGATE;
  
  // Override the global navigation function
  global.REACT_NAVIGATION_NAVIGATE = (name, params) => {
    console.log(`Navigation attempt to: ${name}`);
    
    // Use our custom navigation function
    navigate(name, params);
  };
  
  console.log('React Navigation patched for web');
}
