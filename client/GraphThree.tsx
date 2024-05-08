import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GraphThree = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');

    const handleCheckboxChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleGenerateGraph = () => {
        navigate('/FinalGenerateGraph');
    };

    return (
        <div className="container">
            <h2 className="text-center mb-4">Pick Data to Generate a Bar Graph</h2>
            <div className="row">
                <div className="col">
                    <div className="list-group">
                        <label className="list-group-item">
                            <input
                                className="form-check-input me-1"
                                type="checkbox"
                                value="greenhouse"
                                checked={selectedOption === 'greenhouse'}
                                onChange={handleCheckboxChange}
                            />
                            Greenhouse
                        </label>
                        <label className="list-group-item">
                            <input
                                className="form-check-input me-1"
                                type="checkbox"
                                value="gdp"
                                checked={selectedOption === 'gdp'}
                                onChange={handleCheckboxChange}
                            />
                            GDP
                        </label>
                        <label className="list-group-item">
                            <input
                                className="form-check-input me-1"
                                type="checkbox"
                                value="population"
                                checked={selectedOption === 'population'}
                                onChange={handleCheckboxChange}
                            />
                            Population
                        </label>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <button type="button" className="btn btn-secondary text-center" onClick={handleGenerateGraph}>Generate Graph</button>
            </div>
        </div>
    );
};

export default GraphThree;
