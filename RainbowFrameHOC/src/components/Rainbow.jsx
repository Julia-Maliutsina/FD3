import React from 'react';

import DoubleButton from './DoubleButton';
import withRainbowFrame from './withRainbowFrame';

let colors = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple'];
let FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

class Rainbow extends React.Component {
  render() {
    return (
      <>
        <DoubleButton caption1="однажды" caption2="пору" cbPressed={(num) => alert(num)}>
          в студёную зимнюю
        </DoubleButton>
        <FramedDoubleButton caption1="я из лесу" caption2="мороз" cbPressed={(num) => alert(num)}>
          вышел, был сильный
        </FramedDoubleButton>
      </>
    );
  }
}

export default Rainbow;
