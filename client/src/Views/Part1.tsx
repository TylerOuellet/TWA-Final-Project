import { useEffect } from 'react';
//import React from 'react'
import { useNavigate } from 'react-router-dom';
import Landingpage from '../Landingpage';

function Part1() {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/');
        }, 2000);

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div>
            {/* 1 */}
            <Landingpage />
        </div>
    );
}

export default Part1;
