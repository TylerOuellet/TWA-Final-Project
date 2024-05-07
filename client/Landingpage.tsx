import React from 'react';
// import './index.html'; // css file
import image from '/images/LandingPage.png';

const LandingPage = () => {
  return (
    <div className="container text-center">
      <div className='row'>
        <div className="text-center">
          <img src={image} alt="Landing" className="img-fluid" />
        </div>
      </div>
      <div className="row">
        <div className="text-center">
          <h2>Landing Page</h2>
          <p>HEEEEEEEELLLLOOOOOOOO WELLLLCOMMEEE</p>
          <button type="button" className="btn btn-primary">Click</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
