import React from 'react';

import '../Rainbow.css';
import RainbowFrame from './RainbowFrame';

class Rainbow extends React.Component {
  colors = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple'];
  render() {
    return <RainbowFrame colors={this.colors}>Hello!</RainbowFrame>;
  }
}

export default Rainbow;
