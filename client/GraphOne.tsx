import React from 'react';
import { useNavigate } from 'react-router-dom';

const GraphOne = () => {
    const navigate = useNavigate();

    const handleGenerateGraph = () => {
        navigate('/FinalGenerateGraph');
    };

    return (
        <div className="container justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div>
                <h2 className="text-center mb-4">Pick Data to Generate a Line Graph</h2>
                <div className="row">
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="countySelect" style={{ width: '200px', fontSize: '1rem' }}>Select County:</label>
                            </div>
                            <select className="custom-select" id="countySelect" style={{ width: '250px' }}>
                                <option selected>Select a county</option>
                                <option value="county1">County 1</option>
                                <option value="county2">County 2</option>
                                <option value="county3">County 3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col text-center">
                        <button type="button" className="btn btn-secondary" onClick={handleGenerateGraph}>Generate Graph</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphOne;
