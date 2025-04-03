import React from 'react';
import MapView, { Marker as RNMarker, Callout as RNCallout, Circle as RNCircle, Polygon as RNPolygon } from 'react-native-maps';

// Re-export the native components directly
export { MapView };
export const Marker = RNMarker;
export const Callout = RNCallout;
export const Circle = RNCircle;
export const Polygon = RNPolygon;

export default MapView;
