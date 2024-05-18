import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GraphFour = () => {
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]); // country list
    const [selectedCountry1, setSelectedCountry1] = useState(''); // first country 
    const [selectedCountry2, setSelectedCountry2] = useState(''); // second country
    const [year, setYear] = useState(''); // store countries 

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("/countries");
                if (!response.ok) throw new Error('cannot get countries');
                const { Countries } = await response.json();
                setCountries(Countries);
            } catch (error) {
                console.error('error', error);
            }
        };
        fetchCountries();
    }, []);

    const handleGenerateGraph = () => {
        if (!selectedCountry1 || !selectedCountry2 || !year) { // make sure countires selected and year
            console.error('error select two countries and a year');
            if (!selectedCountry1 || !selectedCountry2) {
                toast.error("Please select two countries to Generate the Graph"); // t
            }
            if (!year) {
                toast.error("Please enter a year to Generate the Graph"); // t
            }
            return;
        }
        navigate(`/FinalGenerateGraph/bar/${selectedCountry1}/${selectedCountry2}/${year}`);
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
                        <label className="input-group-text" htmlFor="countrySelect1">Select first country:</label>
                        <select className="custom-select" id="countrySelect1" onChange={(e) => setSelectedCountry1(e.target.value)} value={selectedCountry1}>
                            <option value="">Select</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <div className="input-group mb-6">
                        <label className="input-group-text" htmlFor="countrySelect2">Select second country:</label>
                        <select className="custom-select" id="countrySelect2" onChange={(e) => setSelectedCountry2(e.target.value)} value={selectedCountry2}>
                            <option value="">Select</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
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

export default GraphFour;
