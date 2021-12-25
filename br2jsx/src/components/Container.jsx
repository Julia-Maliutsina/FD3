import React from 'react';

import '../App.css';
import BR2JSX from './BR2JSX';

const Container = () => {
  let text = 'первый<br>второй<br/>третий<br />последний';
  return (
    <div>
      <BR2JSX text={text} />
    </div>
  );
};

export default Container;
