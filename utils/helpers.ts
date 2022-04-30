import { useWindowDimensions } from 'react-native';

export function isPortrait(): boolean {
  const { height, width } = useWindowDimensions();

  return height >= width;
}
