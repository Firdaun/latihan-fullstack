import { Navigate } from 'react-router';
import About from './About.jsx';
import { useEffect } from 'react';

export default function ProtectedAbout() {

    const isUnlocked = sessionStorage.getItem('is_unlocked_about') === 'true';

    if (!isUnlocked) {
        return <Navigate to="/about" replace={true} />; 
    }
    
    useEffect(() => {
        sessionStorage.removeItem('is_unlocked_about');
    }, []);

    return <About />;
}