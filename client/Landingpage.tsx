import React from 'react';
// import './index.html'; // css file
import image from '/images/LandingPage.png';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const navigate = useNavigate(); // go to movies 

  return (
    <div className="container">
      <div className='row'>
        <div className="text-center">
          <img src={image} alt="Landing" className="img-fluid" />
        </div>
      </div>
      <div className="row font-italic">
        <div className="text-center">
          <h5>"Get Data" makes easy-to-understand graphs to help you understand information better. 
            Our team uses modern tools to create clear pictures that help you make smart choices. 
            Trust us to make your data easier to understand with our simple and effective graphs.</h5>
          <button type="button" className="btn btn-outline-danger mt-4" onClick={() => navigate('/part2')}>Explore Data </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
