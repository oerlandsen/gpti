import React, { useEffect } from "react";
import { useAppContext } from "../AppContext";


function SearchHistory() {

    const { history } = useAppContext();

    return (
        <div>
            <div className="flex flex-col items-center justify-center p-6 gap-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Historial de Búsquedas
                </h1>
                <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-lg">
                    <ul className="space-y-6">
                        {history.map((historyElement: { searchTerm: string; imagePath: string }, index: number) => (
                            <li key={index} className="border-b border-gray-200 pb-4">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                    Producto: {historyElement.searchTerm}
                                </h2>
                                <img
                                    src={historyElement.imagePath}
                                    alt="Producto"
                                    className="w-full h-auto max-h-48 object-contain rounded-md"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );

}

export default SearchHistory;