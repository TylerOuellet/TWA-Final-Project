import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GraphOne = () => {
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]); // store country list
    const [selectedCountry, setSelectedCountry] = useState(''); // store selected country

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("http://localhost:8080/countries");
                if (!response.ok) { // is not ok 
                    throw new Error('failed to get countries');
                }
                const { Countries } = await response.json(); // parse json response 
                setCountries(Countries); // update country with the data that is fetched 
            } catch (error) {
                console.error('error', error);
            }
        };
        fetchCountries();
    }, []);

    // generate graph 
    const handleGenerateGraph = async () => {
        try {
            if (!selectedCountry) {
                throw new Error('please select a country');
            }
            navigate(`/FinalGenerateGraph/${selectedCountry}`);
        } catch (error: any) {
            console.error('error', error);
            toast.error("You must Select a Country in order to Generate the Graph"); // toast
        }
    };

    // handle if country selection changes
    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value); // this updates the country selected with selected value
    };

    return (
        <div className="container justify-content-center">
            <div className="row">
                <div className="col-md-6">
                </div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                    <button type="button" className="btn btn-warning mt-2" onClick={() => navigate('/Part2')}>Back</button>
                </div>
            </div>
            <div>
                <h2 className="text-center">Pick Data to Generate a Line Graph</h2>
                <div className="row mt-4">
                    <div className="col">
                        <div className="input-group mb-6">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="countySelect" style={{ width: '300px', fontSize: '1rem' }}>Select one of the following Country:</label>
                            </div>
                            {/*dropdown*/}
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
            <ToastContainer />
        </div>
    );
};

export default GraphOne;
