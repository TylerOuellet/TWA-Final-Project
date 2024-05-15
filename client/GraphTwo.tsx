import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GraphTwo = () => {
    const navigate = useNavigate();

    const handleGenerateGraph = () => {
        navigate('/FinalGenerateGraph');
    };

    return (
        <div className="container align-items-center">
            <h2 className="text-center mb-4">Pick Data to Generate a Pie Graph</h2>
            <div className="row">
                <div className="col">
                    <label>Select Counties:</label>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <input
                                className="form-check-input me-1"
                                type="checkbox"
                                value="county1"
                                aria-label="County 1"
                                // onChange={handleCheckbox}
                            />
                            County 1
                        </li>
                        <li className="list-group-item">
                            <input
                                className="form-check-input me-1"
                                type="checkbox"
                                value="county2"
                                aria-label="County 2"
                                // onChange={handleCheckbox}
                            />
                            County 2
                        </li>
                        <li className="list-group-item">
                            <input
                                className="form-check-input me-1"
                                type="checkbox"
                                value="county3"
                                aria-label="County 3"
                                // onChange={handleCheckbox}
                            />
                            County 3
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row mt-4">
                <button type="button" className="btn btn-secondary text-center" onClick={handleGenerateGraph}>
                    Generate Graph
                </button>
            </div>
        </div>
    );
};

export default GraphTwo;
