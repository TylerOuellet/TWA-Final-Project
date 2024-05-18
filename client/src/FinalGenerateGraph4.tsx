import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FinalGenerateGraph4 = () => {
    const navigate = useNavigate();

    const { selectedCountry1, selectedCountry2, year } = useParams();
    const [graphUrl, setGraphUrl] = useState('');

    useEffect(() => {
        const fetchGraph = async () => {
            try {
                if (!selectedCountry1 || !selectedCountry2 || !year) {
                    throw new Error('missing parameters');
                }
                const response = await fetch(`/oilProductionBar?country1=${selectedCountry1}&country2=${selectedCountry2}&year=${year}`);
                if (!response.ok) {
                    throw new Error('notable to get the graph');
                }
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setGraphUrl(url);
            } catch (error) {
                console.error('error', error);
            }
        };
        fetchGraph();
    }, [selectedCountry1, selectedCountry2, year]); // run when selectedCountryssss and year changes 

    const downloadGraph = () => {
        const link = document.createElement('a');
        link.href = graphUrl;
        link.download = `${selectedCountry1}_${selectedCountry2}_BarGraph.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col-md-6">
                </div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                    <button type="button" className="btn btn-warning mt-2" onClick={() => navigate('/ViewGraph4')}>Back</button>
                </div>
            </div>
            <h2 className="text-center">The Generated Bar Graph for {selectedCountry1} and {selectedCountry2} in {year}</h2>
            {graphUrl && <img src={graphUrl} alt="Graph" className="img-thumbnail" />}
            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={downloadGraph}>Download Graph</button>
            </div>
        </div>
    );
};

export default FinalGenerateGraph4;



