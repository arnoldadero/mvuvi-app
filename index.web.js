// This is a web-specific entry point
import { registerRootComponent } from 'expo';
import App from './App.web';
import { patchNavigation } from './navigation-patch.web';

// Web-specific setup can go here
console.log('Running in web mode');

// Apply navigation patches for web
try {
  patchNavigation();
} catch (error) {
  console.error('Failed to patch navigation:', error);
}

// Register the root component
registerRootComponent(App);
