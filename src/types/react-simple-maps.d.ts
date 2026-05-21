declare module 'react-simple-maps' {
  import { ComponentType, SVGProps } from 'react';

  export interface GeographyProps {
    geography: any;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: SVGProps<SVGPathElement>;
      hover?: SVGProps<SVGPathElement>;
      pressed?: SVGProps<SVGPathElement>;
    };
    onClick?: () => void;
  }

  export const ComposableMap: ComponentType<{
    projection?: string;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
    };
    children?: React.ReactNode;
  }>;

  export const Geographies: ComponentType<{
    geography: string;
    children: (props: { geographies: any[] }) => React.ReactNode;
  }>;

  export const Geography: ComponentType<GeographyProps>;

  export const ZoomableGroup: ComponentType<{
    zoom?: number;
    center?: [number, number];
    children?: React.ReactNode;
  }>;
}
