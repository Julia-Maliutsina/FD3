import React from 'react';

import '../Rainbow.css';

function withRainbowFrame(colors) {
  return function (Component) {
    return (props) => {
      let result = <Component {...props} />;
      colors.forEach(
        (color) =>
          (result = (
            <div style={{ padding: '3px', textAlign: 'center', border: `3px solid ${color}` }}>
              {result}
            </div>
          )),
      );
      return result;
    };
  };
}
export default withRainbowFrame;
