import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FinalGenerateGraph = () => {
    const navigate = useNavigate();

    const { countries = '', year } = useParams(); // thedefault value for countries
    const selectedCountries = countries.split(',');
    const [graphUrl, setGraphUrl] = useState('');

    useEffect(() => {
        const fetchGraph = async () => {
            try {
                if (!year || !countries) {
                    throw new Error('missing parameters');
                }
                // make sure at least one country is selected
                if (selectedCountries.length < 1) {
                    throw new Error('at least one country selected');
                }
                const encodedCountries = selectedCountries.map(country => encodeURIComponent(country));
                const url = `http://localhost:8080/sustainablePieCharts?year=${year}&countries=${encodedCountries.join(',')}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('not able to get the graph');
                }
                const blob = await response.blob();
                const graphUrl = URL.createObjectURL(blob);
                setGraphUrl(graphUrl);
            } catch (error) {
                console.error('error', error);
            }
        };

        fetchGraph();
    }, [selectedCountries, year]);

    const downloadGraph = () => {
        const link = document.createElement('a');
        link.href = graphUrl;
        link.download = `${selectedCountries.join('_')}_graph.png`;
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
                    <button type="button" className="btn btn-warning mt-2" onClick={() => navigate('/ViewGraph2')}>Back</button>
                </div>
            </div>
            <h2 className="text-center">The Generated Graph for {selectedCountries.join(', ')} in {year}</h2>
            {graphUrl && <img src={graphUrl} alt="Graph" className="img-thumbnail" />}
            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={downloadGraph}>Download Graph</button>
            </div>
        </div>
    );
};

export default FinalGenerateGraph;
