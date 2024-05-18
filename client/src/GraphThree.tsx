import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GraphThree: React.FC = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
    };

    const handleGenerateGraph = () => {
        if (selectedOption) {
            navigate(`/FinalGenerateGraph?type=${selectedOption}`);
        } else {
            toast.error('Please select a type');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6"></div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                    <button type="button" className="btn btn-warning mt-2" onClick={() => navigate('/Part2')}>Back</button>
                </div>
            </div>
            <h2 className="text-center mb-4">Pick Data to Generate a Bar Graph</h2>
            <div className="row">
                <div className="col">
                    <div className="list-group">
                        <label className="list-group-item">
                            <input
                                className="form-check-input me-1"
                                type="radio"
                                name="dataOption"
                                value="greenhouse_gas_emissions"
                                checked={selectedOption === 'greenhouse_gas_emissions'}
                                onChange={handleCheckboxChange}
                            />

                            Greenhouse
                        </label>
                        <label className="list-group-item">
                            <input
                                className="form-check-input me-1"
                                type="radio"
                                name="dataOption"
                                value="gdp"
                                checked={selectedOption === 'gdp'}
                                onChange={handleCheckboxChange}
                            />
                            GDP
                        </label>
                        <label className="list-group-item">
                            <input
                                className="form-check-input me-1"
                                type="radio"
                                name="dataOption"
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
                <button type="button" className="btn btn-secondary text-center mt-4" onClick={handleGenerateGraph}>Generate Graph</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default GraphThree;
