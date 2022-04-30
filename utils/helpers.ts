import { Dimensions } from 'react-native';

export function isPortrait(): boolean {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
}
