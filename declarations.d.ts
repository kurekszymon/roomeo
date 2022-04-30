declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*env' {
  const GOOGLE_API_KEY: string;
  const GOOGLE_EXPO_CLIENT_ID: string;
  export { GOOGLE_API_KEY, GOOGLE_EXPO_CLIENT_ID };
}
