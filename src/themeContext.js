import Images from 'constants/images';
import React from 'react';

export const themes = {
  mountain: {
    name: 'mountain',
    primaryColor: `url(${Images.MOUNTAIN_BG})`,
    secondaryColor: 'black',
  },
  city: {
    name: 'city',
    primaryColor: `url(${Images.NIGHT_CITY})`,
  },
  wall: {
    name: 'wall',
    primaryColor: `url(${Images.WALL3})`,
  },
  sherbert: {
    name: 'sherbert',
    primaryColor: 'linear-gradient(120deg, #f79d00, #64f38c)',
    secondaryColor: 'white',
  },
  earth: {
    name: 'earth',
    primaryColor: 'linear-gradient(120deg, #00C9FF, #92FE9D)',
    secondaryColor: 'f',
  },
};

const ThemeContext = React.createContext(themes.light);
export default ThemeContext;
