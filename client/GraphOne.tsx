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
                    throw new Error('Failed to get countries');
                }
                const { Countries } = await response.json();
                console.log('Countries Array:', Countries); // log the fetched data
                setCountries(Countries); // update with fetched countries
            } catch (error) {
                console.error('error', error);
            }
        };
        fetchCountries();
    }, []);

    const handleGenerateGraph = async () => {
        try {
            // generating graph page
            navigate('/FinalGenerateGraph');
        } catch (error) {
            console.error('error:', error);
        }
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    return (
        <div className="container justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div>
                <h2 className="text-center mb-4">Pick Data to Generate a Line Graph</h2>
                <div className="row">
                    <div className="col">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="countySelect" style={{ width: '200px', fontSize: '1rem' }}>Select Country:</label>
                            </div>
                            <select className="custom-select" id="countySelect" style={{ width: '250px' }} onChange={handleCountryChange} value={selectedCountry}>
                                <option value="">Select a country</option>
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
