import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { Seller, Product } from "./Interfaces";
import ProductListCard from "./ProductListCard";

const exampleSellers: Seller[] = [
    { id: 1, name: "Vendedor 1", price: 100, rating: 4.5 },
    { id: 2, name: "Vendedor 2", price: 90, rating: 4.0 },
    { id: 3, name: "Vendedor 3", price: 110, rating: 4.8 },
];

const exampleProduct: Product = {
    name: "Playstation 5",
};

function FileSelector() {
    const [file, setFile] = useState<File | null>(null);
    const [loadingSellers, setLoadingSellers] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (file) {
            // Aquí puedes manejar el archivo (subirlo al servidor o procesarlo)
            // console.log("Archivo seleccionado:", file.name);

            // Simulación de una llamada a la API para obtener vendedores
            try {
                setLoadingSellers(true);
                // Wait to simulate the API call
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // const response = await axios.get<Seller[]>("/api/sellers", {
                //     params: { productName: file.name },
                // });
                setLoadingSellers(false);
                navigate("/product", { state: { productName: exampleProduct.name, sellers: exampleSellers, file } });

            } catch (error) {
                console.error("Error fetching sellers:", error);
                setLoadingSellers(false);
            }
        } else {
            alert("Por favor selecciona un archivo antes de enviar el formulario.");
        }
    };

    return (
        loadingSellers ? (
            <Spinner />
        ) : (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
                >
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Subir Imagen
                    </h1>
                    <div className="mb-4">
                        <label
                            htmlFor="fileInput"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Selecciona un archivo:
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            accept="image/png, image/gif, image/jpeg"
                            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Subir Archivo
                    </button>
                    {file && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">
                                Archivo seleccionado: <strong>{file.name}</strong>
                            </p>
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Producto"
                                className="mt-4 w-full h-auto"
                            />
                        </div>
                    )}

                </form>
            </div>
        )
    );
}

export default FileSelector;