import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoginButton, LogoutButton } from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppContext } from '../AppContext';

const NavBar: React.FC = () => {

    const { isAuthenticated, user } = useAuth0();
    const { setUser } = useAppContext();
    
    useEffect(() => {
        if (user) {
            setUser(user.sub);
        }
    }, [user, setUser]);

    return (
        <nav className="bg-yellow-300 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-black opacity-90 font-sans text-xl font-bold">Mercado Visión</Link>
                <div className="flex items-center">
                    {isAuthenticated && user && <span className="mr-4 text-black">{user.email}</span>}
                    {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;