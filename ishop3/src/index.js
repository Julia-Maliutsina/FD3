import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IShop from './components/IShop';
import reportWebVitals from './reportWebVitals';

const GOODS=[ 
  {name:"Headphones Beats Studio 3",price:167,left:15,url:"./img/beatsStudioThree.jpg", key:1}, 
  {name:"Speakers JBL Flip 4",price:99,left:4,url:"./img/JBLFlipFour.jpg",key:2}, 
  {name:"Samsung Galaxy Buds",price:119,left:9,url:"./img/samsungGalaxyBuds.jpg",key:3}, 
  {name:"Samsung Galaxy Watch",price:229,left:5,url:"./img/SamsungGalaxyWatch.jpg",key:4}, 
  {name:"Microphone Shure MV7",price:219,left:11,url:"./img/ShureMVSeven.jpg",key:5}, 
  {name:"Speakers PreSonus Eris",price:99,left:8,url:"./img/PreSonusEris.jpg",key:6}, 
];

ReactDOM.render(
  <React.StrictMode>
    <IShop goods={GOODS}/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
