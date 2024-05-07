import React from 'react';
import { useNavigate } from 'react-router-dom';

const GraphTwo = () => {
    const navigate = useNavigate();

    const handleGenerateGraph = () => {
        navigate('/FinalGenerateGraph');
    };

    return (
        <div className="container">
            <h2 className="text-center mb-4">Pick Data to Generate a Bar Graph</h2>
            <div className="row">
                <div className="col">
                    <label htmlFor="countySelect">Select County:</label>
                </div>
                <div className="col">
                    <select className="form-select" id="countySelect">
                        <option selected>Select a county</option>
                        <option value="county1">County 1</option>
                        <option value="county2">County 2</option>
                        <option value="county3">County 3</option>
                    </select>
                </div>
            </div>
            <div className="row mt-4">
                <button type="button" className="btn btn-secondary text-center" onClick={handleGenerateGraph}>Generate Graph</button>
            </div>
        </div>
    );
};

export default GraphTwo;
