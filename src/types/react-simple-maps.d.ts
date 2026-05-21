declare module 'react-simple-maps' {
  import { ComponentType } from 'react';

  export interface Geography {
    id: string;
    rsmKey: string;
    properties: any;
    [key: string]: any;
  }

  export interface GeographyProps {
    geography: Geography;
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

  export interface GeographiesProps {
    geography: string;
    children: (props: { geographies: Geography[] }) => React.ReactNode;
  }

  export const ComposableMap: ComponentType<any>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const ZoomableGroup: ComponentType<any>;
}
