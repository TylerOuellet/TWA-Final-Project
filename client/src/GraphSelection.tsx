// import React from 'react';
import { useNavigate } from 'react-router-dom';
import graphOne from './images/Australia_graph.png';
import graphTwo from './images/Canada_Brazil_graph.png';
import graphFour from './images/Algeria_Canada_graph.png';
import barGraphImage from './images/barGraohExample.png';

const LandingPage = () => {
    const navigate = useNavigate();

    const navigateToGraph1 = () => {
        navigate('/ViewGraph1');
    };

    const navigateToGraph2 = () => {
        navigate('/ViewGraph2');
    };

    const navigateToGraph3 = () => {
        navigate('/ViewGraph3');
    };

    const navigateToGraph4 = () => {
        navigate('/ViewGraph4');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                </div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                    <button type="button" className="btn btn-warning mt-2" onClick={() => navigate('/')}>Back</button>
                </div>
            </div>
            <h2 className='text-center mt-2'>Possible Graphs</h2>
            <h5 className='text-center mb-3'>Pick one of the following graphs and our team will generate them for you</h5>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="card-text text-center">Generate Line Graph Comparing Fossil Fuel Consumption</h2>
                        <img src={graphOne} className="card-img-top" alt="Line Graph Example" />
                        <div className="card-body d-grid gap-2">
                            <a className="btn btn-warning text-center" onClick={navigateToGraph1}>Select Graph</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="card-text text-center">Generate Pie Graph Comparing Sustainable Energy Consumptions</h2>
                        <img src={graphTwo} className="card-img-top" alt="Pie Graph Example" />
                        <div className="card-body d-grid gap-2">
                            <a className="btn btn-warning text-center" onClick={navigateToGraph2}>Select Graph</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="card-text text-center">Generate Bar Graph Comparing .....</h2>
                        <img src={barGraphImage} className="card-img-top" alt="Line Graph Example" />
                        <div className="card-body d-grid gap-2">
                            <a className="btn btn-warning text-center" onClick={navigateToGraph3}>Select Graph</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="card-text text-center">Generate Bar Graph Comparing Oil Production</h2>
                        <img src={graphFour} className="card-img-top" alt="Pie Graph Example" />
                        <div className="card-body d-grid gap-2">
                            <a className="btn btn-warning text-center" onClick={navigateToGraph4}>Select Graph</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;