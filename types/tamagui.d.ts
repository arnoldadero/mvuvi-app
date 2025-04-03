import '@tamagui/core';
import { ReactNode } from 'react';

// Extend Tamagui's component types to properly handle children and styling props
declare module '@tamagui/core' {
  interface TamaguiComponentPropsBase {
    children?: ReactNode;
  }

  interface StackProps {
    children?: ReactNode;
    padding?: any;
    margin?: any;
    paddingVertical?: any;
    paddingHorizontal?: any;
    marginVertical?: any;
    marginHorizontal?: any;
    key?: any;
    justifyContent?: any;
    alignItems?: any;
    borderBottomWidth?: any;
    borderBottomColor?: any;
  }

  interface TextProps {
    children?: ReactNode;
    fontWeight?: any;
    color?: any;
    marginTop?: any;
  }
}

// Extend Tamagui's component types to properly handle children and styling props
declare module 'tamagui' {
  interface TamaguiComponentPropsBase {
    children?: ReactNode;
  }

  interface StackProps {
    children?: ReactNode;
    padding?: any;
    margin?: any;
    paddingVertical?: any;
    paddingHorizontal?: any;
    marginVertical?: any;
    marginHorizontal?: any;
    key?: any;
    justifyContent?: any;
    alignItems?: any;
    borderBottomWidth?: any;
    borderBottomColor?: any;
  }

  interface TextProps {
    children?: ReactNode;
    fontWeight?: any;
    color?: any;
    marginTop?: any;
  }
}
