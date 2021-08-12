import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const isPortrait = () => {
  const dimensions = Dimensions.get('screen');
  return (dimensions.height >= dimensions.width);
};

export function useOrientation() {
  const [orientation, setOrientation] = useState( isPortrait() ? 'PORTRAIT' : 'LANDSCAPE');

  useEffect(() => {
    const callback = () => setOrientation(isPortrait() ? 'PORTRAIT' : 'LANDSCAPE');
    Dimensions.addEventListener('change', callback);

    return () => {
      Dimensions.removeEventListener('change', callback);
    };
  }, []);

  return orientation;
};

