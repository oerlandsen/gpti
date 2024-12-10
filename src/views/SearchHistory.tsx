import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getHistory } from "../api/mercadoLibre";


interface HistoryElement {
    searchTerm: string;
    searchDate: Date;
    imagePath: string;
    category: string;
}

function SearchHistory() {

    const { setProductName, setCategoria, setCategoriaName, setBase64image } = useAppContext();
    const navigate = useNavigate();
    const { user } = useAuth0();

    const handleClick = async (historyElement: any) => {
        console.log("History element on handleclick", historyElement);
        setProductName(historyElement.searchTerm);
        setCategoria(historyElement.category.split("|")[0]);
        setCategoriaName(historyElement.category.split("|")[1]);
        try {

            // Create blob from base64 string
            setBase64image(historyElement.imagePath);
            navigate("/product");
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }

    const [history, setHistory] = useState<HistoryElement[]>([]);

    useEffect(() => {
        if (!user) {
            return;
        }
        const fetchHistory = async () => {
            try {
                if (user.sub) {
                    const response = await getHistory(user.sub);
                    console.log("History", response);
                    setHistory(response);
                } else {
                    console.error("User sub is undefined");
                }
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };
        fetchHistory();
    }
        , [user]);



    return (
        <div>
            <div className="flex flex-col items-center justify-center p-6 gap-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Historial de Búsquedas
                </h1>
                <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-lg">
                    <ul className="space-y-6">
                        {history.map((historyElement: HistoryElement, index: number) => (
                            <>
                                <li key={index} className="border-b border-gray-200 pb-4">
                                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                        Producto: {historyElement.searchTerm}
                                    </h2>
                                    <p className="text-gray-500 mb-2">
                                        Categoría: {historyElement.category.split("|")[1]}
                                    </p>
                                    <img
                                        src={`data:image/jpeg;base64,${historyElement.imagePath}`}
                                        alt="Producto"
                                        className="w-full h-auto max-h-48 object-contain rounded-md"
                                    />
                                    <h2 onClick={() => handleClick(historyElement)} className="text-xl text-gray-800 hover:text-blue-600 cursor-pointer transition-colors mt-6 mb-4">Volver a Buscar</h2>
                                </li>
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );

}

export default SearchHistory;