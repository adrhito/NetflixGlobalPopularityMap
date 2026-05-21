declare module 'react-simple-maps' {
  import { ComponentType } from 'react';

  export interface GeographyProps {
    geography: any;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: any;
      hover?: any;
      pressed?: any;
    };
    onClick?: () => void;
    [key: string]: any;
  }

  export const ComposableMap: ComponentType<any>;
  export const Geographies: ComponentType<any>;
  export const Geography: ComponentType<GeographyProps>;
  export const ZoomableGroup: ComponentType<any>;
}
