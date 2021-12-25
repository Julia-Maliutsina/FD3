import React from 'react';

const BR2JSX = ({ text }) => {
  let textArray = text.split(/<br\s?\/?>/);
  let arrayToRender = [];
  textArray.forEach((word, id, array) => {
    arrayToRender.push(word);
    if (id < array.length - 1) {
      arrayToRender.push(<br />);
    }
    return arrayToRender;
  });
  return <div class="Br2jsx">{arrayToRender}</div>;
};

export default BR2JSX;
