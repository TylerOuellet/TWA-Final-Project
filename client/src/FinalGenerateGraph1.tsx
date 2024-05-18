import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FinalGenerateGraph1 = () => {
    const navigate = useNavigate();

    const { selectedCountry } = useParams(); // get selected country
    const [graphUrl, setGraphUrl] = useState('');

    useEffect(() => {
        const fetchGraph = async () => {
            try {
                if (!selectedCountry) { // country provided 
                    throw new Error('No country selected');
                }
                const response = await fetch(`/lineEnergyConsumption?country=${selectedCountry}`);
                if (!response.ok) {
                    throw new Error('unable to get the graph');
                }
                // response to blob
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setGraphUrl(url); // update  url
            } catch (error) {
                console.error('error', error);
            }
        };
        fetchGraph();
    }, [selectedCountry]); // will run if the selected country changes 

    const downloadGraph = () => {
        const link = document.createElement('a');
        link.href = graphUrl;
        link.download = `${selectedCountry}_LineGraph.png`;
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
                    <button type="button" className="btn btn-warning mt-2" onClick={() => navigate('/ViewGraph1')}>Back</button>
                </div>
            </div>
            <h2 className="text-center">The Generated Line Graph for {selectedCountry}</h2>
            {graphUrl && <img src={graphUrl} alt="Graph" className="img-thumbnail" />}
            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={downloadGraph}>Download Graph</button>
            </div>
        </div>
    );
};

export default FinalGenerateGraph1;
