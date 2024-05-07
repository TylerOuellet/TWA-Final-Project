import { useEffect } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import GraphSelection from '../GraphSelection';
import GraphOne from '../GraphOne';
import GraphTwo from '../GraphTwo';
import GraphThree from '../GraphThree';
import GraphFour from '../GraphFour';

function ViewGenerateGraph() {

    return (
        <div>
            {/* Final page */}
            <GraphOne />
            <GraphTwo />
            <GraphThree />
            <GraphFour />
        </div>
    );
}

export default ViewGenerateGraph;