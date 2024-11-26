import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()} className="text-gray-900 opacity-90 font-sans font-semibold text-s hover:opacity-100">Ingresa</button>;
}

function LogoutButton() {
    const { logout } = useAuth0();

    return <button onClick={() => logout()} className="text-gray-900 opacity-90 font-sans font-semibold text-s hover:opacity-100">Salir</button>;
}

export { LoginButton, LogoutButton };