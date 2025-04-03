import React from 'react';
import { Platform, View, Text } from 'react-native';

// This file is a simple re-export that will be overridden by platform-specific versions
// See MapView.native.tsx and MapView.web.tsx

// Simple fallback component for non-platform-specific usage
const MapViewFallback = (props: any) => {
  return (
    <View
      style={[
        {
          backgroundColor: '#e0e0e0',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          padding: 20,
        },
        props.style
      ]}
    >
      <Text>Maps are only available on mobile devices</Text>
      {props.children}
    </View>
  );
};

// Fallback exports
export const MapView = MapViewFallback;
export const Marker = (props: any) => props.children || null;
export const Callout = (props: any) => props.children || null;
export const Circle = () => null;
export const Polygon = () => null;

export default MapViewFallback;
