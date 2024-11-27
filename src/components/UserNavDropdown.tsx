import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function UserNavDropdown(props: any) {

    const userNickName = props.userNickName;

    const { logout } = useAuth0();
    const navigator = useNavigate();

    // Create dropdown showing user nickname, and revealing logout button and history button when hovered
    return (
        userNickName &&
        <div className='flex flex-row gap-10'>
            <button onClick={() => navigator("/history")} className="text-gray-900 opacity-90 font-sans font-semibold text-s hover:opacity-100" id="dropdown-button">Historial</button>
            <div className="relative group">
                <button className="text-gray-900 opacity-90 font-sans font-semibold text-s hover:opacity-100" id="dropdown-button">Mi Cuenta</button>
                <div className="absolute hidden bg-gray-100 min-w-32 shadow-lg z-10 group-hover:block right-0" id="dropdown-content">
                    <h1 className="text-s text-left py-2 px-4">{userNickName}</h1>
                    <button onClick={() => logout()} className="block w-full text-s text-left py-2 px-4 hover:bg-gray-300">Salir</button>
                </div>
            </div>
        </div>
    );
}

export default UserNavDropdown;