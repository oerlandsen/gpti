import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";



interface HistoryElement {
    searchTerm: string;
    searchDate: Date;
    imagePath: string;
    category: string;
  }

function SearchHistory() {

    const { history, setProductName, setCategoria, setFile } = useAppContext();
    const navigate = useNavigate();

    const categoriaParser = (name: string) => {
        switch (name) {
            case "amplificador"
                : setCategoria("MLC1182")
                break;
            case "notebook"
                : setCategoria("MLC1648")
                break;
            case "bajo"
                : setCategoria("MLC1182")
                break;
            case "cien"
                : setCategoria("MLC3025")
                break;
            case "rubik"
                : setCategoria("MLC1132")
                break;
            case "totodile"
                : setCategoria("MLC1132")
                break;
            default
                : setCategoria("MLC1953")
                break;
        }
    }

    const handleClick = async (historyElement: any) => {
        setProductName(historyElement.searchTerm);
        console.log("asdasfas", historyElement.imagePath.split(".")[0].replace("/images/", ""));

        categoriaParser(historyElement.imagePath.split(".")[0].replace("/images/", ""));
        try {
            const response = await fetch(historyElement.imagePath);
            const blob = await response.blob();
            setFile(blob);
            navigate("/product");
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }


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
                                    Categoría: {historyElement.category}
                                </p>
                                <img
                                    src={historyElement.imagePath}
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