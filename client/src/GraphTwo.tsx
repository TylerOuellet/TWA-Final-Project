import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GraphTwo: React.FC = () => {
    const navigate = useNavigate();
    const [countries, setCountries] = useState<string[]>([]); // country list 
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]); // selected country
    const [year, setYear] = useState<string>(''); // store year 

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("http://localhost:8080/countries");
                if (!response.ok) { // 
                    throw new Error('failed to get countries');
                }
                const { Countries } = await response.json(); // pars json response 
                // this updates countries state with the fetched data
                setCountries(Countries || []);
            } catch (error) {
                console.error('error', error);
            }
        };
        fetchCountries();
    }, []);

    // country selection 
    const handleSelectCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const country = e.target.value; // gets selected country
        setSelectedCountries((prevSelected) => {
            if (prevSelected.includes(country)) {
                // if country slected it removes for list 
                return prevSelected.filter(c => c !== country);
            }
            if (prevSelected.length < 4) {
                // if less of 4 c slected new country to list 
                return [...prevSelected, country];
            }
            // if 4 selected none added 
            return prevSelected;
        });
    };

    const handleGenerateGraph = () => {
        if (selectedCountries.length === 0 || !year) { // make sure one country and year is selected
            console.error('select at least one country and year');
            if (selectedCountries.length === 0) { // if no country slected 
                toast.error("You must Select 1 to 4 Countries to Generate the Graph"); // toast
            }
            if (!year) { // if no year selected
                toast.error("Please enter a Year to Generate the Graph"); // toast
            }
            return;
        }
        // this encode the selected countries for URL
        const encodedCountries = selectedCountries.map(country => encodeURIComponent(country));
        navigate(`/FinalGenerateGraph/pie/${year}/${encodedCountries.join(',')}`);
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
            <h2 className="text-center">Pick Data to Generate a Bar Graph</h2>
            <div className="row mt-4">
                <div className="col">
                    <div className="input-group mb-6">
                        <label className="input-group-text" htmlFor="countrySelect">Select up to Four Countries:</label>
                        <select className="custom-select" id="countrySelect" onChange={handleSelectCountry} value="">
                            <option value="">Select</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mt-2'>
                        Selected Countries: {selectedCountries.join(', ')}
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <div className="input-group mb-6">
                        <label className="input-group-text" htmlFor="yearInput">Enter year:</label>
                        <input type="text" className="form-control" id="yearInput" onChange={(e) => setYear(e.target.value)} value={year} />
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col text-center">
                    <button type="button" className="btn btn-secondary" onClick={handleGenerateGraph}>Generate Graph</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default GraphTwo;
