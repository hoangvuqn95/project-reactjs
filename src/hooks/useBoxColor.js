import { useEffect, useRef, useState } from 'react';

function randomColor(currentColor) {
  const COLOR_LIST = [
    'linear-gradient(180deg, #12c2e9, #c471ed, #f64f59)',
    'linear-gradient(120deg, #2980B9 #6DD5FA, #FFFFFF)',
    'linear-gradient(90deg, #ee9ca7, #ffdde1)',
    'linear-gradient(90deg, #4AC29A, #BDFFF3)',
    'linear-gradient(90deg, #C6FFDD, #FBD786, #f7797d)',
  ];
  // random 0 -> 4
  const currentIndex = COLOR_LIST.indexOf(currentColor);
  let newIndex = currentIndex;

  while (currentIndex === newIndex) {
    newIndex = Math.trunc(Math.random() * 5);
  }

  console.log(COLOR_LIST[newIndex]);
  return COLOR_LIST[newIndex];
}

function useBoxColor() {
  const [color, setColor] = useState('transparent');
  // useRef for keep before value
  const colorRef = useRef('transparent');

  // Change color every 1 second
  useEffect(() => {
    const colorInterval = setInterval(() => {
      // const newColor = randomColor();
      const newColor = randomColor(colorRef.current);
      setColor(newColor);

      colorRef.current = newColor;
    }, 1000);

    return () => {
      clearInterval(colorInterval);
    };
  }, []);
  return color;
}

export default useBoxColor;
