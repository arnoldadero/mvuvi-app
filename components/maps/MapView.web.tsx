import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Web fallback component for MapView
const MapView = (props: any) => {
  return (
    <View 
      style={[
        styles.container, 
        props.style
      ]}
    >
      <Text style={styles.text}>Maps are only available on mobile devices</Text>
      {props.children}
    </View>
  );
};

// Web fallback for Marker
export const Marker = (props: any) => {
  return props.children || null;
};

// Web fallback for Callout
export const Callout = (props: any) => {
  return props.children || null;
};

// Web fallback for Circle
export const Circle = (props: any) => {
  return null;
};

// Web fallback for Polygon
export const Polygon = (props: any) => {
  return null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  }
});

export default MapView;
