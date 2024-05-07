import React from 'react';
// import './index.html'; // css file
import image from 'images/LandingPage.png';

const LandingPage = () => {
    return (
        <div className="container">
          <div className='row mt-5'>
            <div className="col-md-6 text-center">
              <img src={image} alt="Landing" className="img-fluid" />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6 text-center">
              <h2>Landing Page</h2>
              <p>HEEEEEEEELLLLOOOOOOOO</p>
              <button type="button" className="btn btn-primary">Click</button>
            </div>
          </div>
        </div>
    );
};

export default LandingPage;
