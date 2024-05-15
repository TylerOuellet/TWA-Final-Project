import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GraphOne = () => {
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("http://localhost:8080/countries");
                if (!response.ok) {
                    throw new Error('failed to get countries');
                }
                const { Countries } = await response.json();
                setCountries(Countries);
            } catch (error) {
                console.error('error', error);
            }
        };
        fetchCountries();
    }, []);

    const handleGenerateGraph = async () => {
        try {
            if (!selectedCountry) {
                throw new Error('please select a country');
            }
            navigate(`/FinalGenerateGraph/${selectedCountry}`);
        } catch (error) {
            console.error('error', error);
        }
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    return (
        <div className="container justify-content-center">
            <div>
                <h2 className="text-center">Pick Data to Generate a Line Graph</h2>
                <div className="row mt-4">
                    <div className="col">
                        <div className="input-group mb-6">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="countySelect" style={{ width: '300px', fontSize: '1rem' }}>Select one of the following Country:</label>
                            </div>
                            <select className="custom-select" id="countySelect" style={{ width: '700px' }} onChange={handleCountryChange} value={selectedCountry}>
                                <option value="">Select</option>
                                {countries.length > 0 && countries.map((country, index) => (
                                    <option key={index} value={country}>{country}</option>
                                ))}
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
