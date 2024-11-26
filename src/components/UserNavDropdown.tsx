import { useAuth0 } from '@auth0/auth0-react';

function UserNavDropdown(props: any) {

    const userNickName = props.userNickName;

    const { logout } = useAuth0();

    // Create dropdown showing user nickname, and revealing logout button and history button when hovered
    return (
        userNickName &&
        <div className="relative group">
            <button className="text-gray-900 opacity-90 font-sans font-semibold text-s hover:opacity-100" id="dropdown-button">{userNickName}</button>
            <div className="absolute hidden bg-gray-100 min-w-32 shadow-lg z-10 group-hover:block right-0" id="dropdown-content">
                <a href="/history" className="block w-full text-s text-left py-2 px-4 hover:bg-gray-300">Historial</a>
                <a href="/trends" className="block w-full text-s text-left py-2 px-4 hover:bg-gray-300">Tendencias</a>
                <button onClick={() => logout()} className="block w-full text-s text-left py-2 px-4 hover:bg-gray-300">Salir</button>
            </div>
        </div>
    );
}

export default UserNavDropdown;