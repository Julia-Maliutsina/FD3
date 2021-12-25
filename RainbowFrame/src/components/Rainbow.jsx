import React from 'react';

import '../Rainbow.css';
import RainbowFrame from './RainbowFrame';

const Rainbow = () => {
  let colors = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple'];
  const initialColor = 0;
  return (
    <RainbowFrame colors={colors} frameId={initialColor}>
      Hello!
    </RainbowFrame>
  );
};

export default Rainbow;
