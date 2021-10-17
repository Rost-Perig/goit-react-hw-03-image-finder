import React, { Component } from 'react';
import Loader from "react-loader-spinner";
import s from './Spiner.module.css'

class Spinner extends Component {
  //other logic
  render() {
    return (
      <div className={s.loaderBox}>
        <Loader
        type="Circles"  //Audio Bars BallTriangle Circles Grid Oval Puff Rings TailSpin ThreeDots Hearts
        color="#617a53"
        height={160}
        width={160}
        timeout={5000} // ms
       />
      </div>
      
    );
  }
};

export default Spinner;