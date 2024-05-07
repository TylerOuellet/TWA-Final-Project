import React from 'react';
import lineGraphImage from './images/lineGraphExample.png';
import pieGraphImage from './images/pieGraphExample.png';
import barGraphImage from './images/barGraohExample.png';
import graphfour from './images/exampleforfourthgraph.png';

const LandingPage = () => {
    return (
        <div className="container">
            <h2 className='text-center mt-2'>Possible Graphs</h2>
            <h5 className='text-center mb-3'>Pick one of the following graphs and our team will genrate them for you</h5>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="card-text text-center">Line Graph Example</h2>
                        <img src={lineGraphImage} className="card-img-top" alt="Line Graph Example" />
                        <div className="card-body d-grid gap-2">
                            <a href="#" className="btn btn-primary text-center">Select Graph</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="card-text text-center">Pie Graph Example</h2>
                        <img src={pieGraphImage} className="card-img-top" alt="Pie Graph Example" />
                        <div className="card-body d-grid gap-2">
                            <a href="#" className="btn btn-primary text-center">Select Graph</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="card-text text-center">Bar Graph Example</h2>
                        <img src={barGraphImage} className="card-img-top" alt="Line Graph Example" />
                        <div className="card-body d-grid gap-2">
                            <a href="#" className="btn btn-primary text-center">Select Graph</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="card-text text-center"> To be determined Graph Example</h2>
                        <img src={graphfour} className="card-img-top" alt="Pie Graph Example" />
                        <div className="card-body d-grid gap-2">
                            <a href="#" className="btn btn-primary text-center">Select Graph</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
