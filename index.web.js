// This is a web-specific entry point
import { registerRootComponent } from 'expo';
import App from './App.web';

// Web-specific setup can go here
console.log('Running in web mode');

// Register the root component
registerRootComponent(App);
