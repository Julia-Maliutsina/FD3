import React from 'react';

import '../Rainbow.css';

const RainbowFrame = ({ colors, frameId }) => {
  return (
    <div style={{ textAlign: 'center', border: `3px solid ${colors[frameId]}` }} key={frameId}>
      {frameId < colors.length - 1 ? (
        <RainbowFrame colors={colors} frameId={(frameId += 1)} />
      ) : (
        <span>Hello!</span>
      )}
    </div>
  );
};

export default RainbowFrame;
