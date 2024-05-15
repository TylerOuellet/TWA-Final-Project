import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FinalGenerateGraph = () => {
    const { selectedCountry } = useParams();
    const [graphUrl, setGraphUrl] = useState('');

    useEffect(() => {
        const fetchGraph = async () => {
            try {
                if (!selectedCountry) {
                    throw new Error('No country was selected');
                }
                const response = await fetch(`http://localhost:8080/lineEnergyConsumption?country=${selectedCountry}`);
                if (!response.ok) {
                    throw new Error('unable to get the graph');
                }
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setGraphUrl(url);
            } catch (error) {
                console.error('error', error);
            }
        };
        fetchGraph();
    }, [selectedCountry]);

    const downloadGraph = () => {
        const link = document.createElement('a');
        link.href = graphUrl;
        link.download = `${selectedCountry}_graph.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container">
            <h2 className="text-center">The Generated Graph for {selectedCountry}</h2>
            {graphUrl && <img src={graphUrl} alt="Graph" className="img-thumbnail" />}
            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={downloadGraph}>Download Graph</button>
            </div>
        </div>
    );
};

export default FinalGenerateGraph;
