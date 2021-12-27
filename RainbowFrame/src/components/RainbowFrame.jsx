import React from 'react';
import PropTypes from 'prop-types';

import '../Rainbow.css';

class RainbowFrame extends React.Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  render() {
    let result = this.props.children;
    this.props.colors.forEach(
      (color) =>
        (result = (
          <div style={{ padding: '3px', textAlign: 'center', border: `3px solid ${color}` }}>
            {result}
          </div>
        )),
    );
    return result;
  }
}

export default RainbowFrame;
