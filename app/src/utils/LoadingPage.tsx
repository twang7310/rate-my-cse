import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

export const LoadingPage: React.FC = () => {
    const {classNum} = useParams();
    const navigate = useNavigate();
    const milliseconds = 500;

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/course/' + classNum);
        }, milliseconds);

        return () => clearTimeout(timeout);
    }, [navigate, classNum]);

    return (
        <div className="innerpage">
        <div className="loading-spinner center" />
        <div className="loading-text">Loading...</div>
        </div>
    );
};