import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const LoadingPage: React.FC = () => {
    const {classNum} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/course/' + classNum);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div className="innerpage">
        <div className="loading-spinner center" />
        <div className="loading-text">Loading...</div>
        </div>
  ) ;
};

export default LoadingPage;