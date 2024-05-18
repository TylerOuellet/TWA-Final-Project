import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FinalGenerateGraph3: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); // access url 
    const queryParams = new URLSearchParams(location.search); // URLSearchParams object to parse query parameters
    const type = queryParams.get('type'); // get type query parameter from url 

    const [graphUrl, setGraphUrl] = useState<string>('');

    useEffect(() => {
        const fetchGraph = async () => {
            try {
                if (!type) {
                    throw new Error('Missing type parameter');
                }

                const url = `/barCountryComparison?type=${type}`;
                const response = await fetch(url); // fetch graph data from api
                if (!response.ok) {
                    throw new Error('faild to get the graph');
                }
                const blob = await response.blob();
                const graphUrl = URL.createObjectURL(blob);
                setGraphUrl(graphUrl);
            } catch (error) {
                console.error('eror', error);
            }
        };

        fetchGraph();
    }, [type]); // run again when type changes

    const downloadGraph = () => {
        const link = document.createElement('a');
        link.href = graphUrl;
        link.download = `${type}_BarGraph.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col-md-6"></div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                    <button type="button" className="btn btn-warning mt-2" onClick={() => navigate('/ViewGraph3')}>Back</button>
                </div>
            </div>
            <h2 className="text-center">Generated Graph for {type}</h2>
            {graphUrl && <img src={graphUrl} alt="Graph" className="img-thumbnail" />}
            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={downloadGraph}>Download Graph</button>
            </div>
        </div>
    );
};

export default FinalGenerateGraph3;
