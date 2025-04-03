// This is a mock for react-native-web
// It's used to prevent errors when bundling for Android
module.exports = {
  // Mock the NativeComponentRegistry that's causing the error
  Libraries: {
    NativeComponent: {
      NativeComponentRegistry: {
        // Add any methods or properties needed
        get: () => ({}),
        getViewManagerConfig: () => ({}),
        setViewManagerConfig: () => {}
      }
    }
  }
};
