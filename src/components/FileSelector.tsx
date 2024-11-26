import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext"
import Spinner from "./Spinner";
import { Seller, Product } from "./Interfaces";
import ProductListCard from "./ProductListCard";

const nameParser: { [key: string]: string } = {
    "amplificador" : "Amplificador Guitarra",
    "notebook": "Notebook"
}

function FileSelector() {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [loadingSellers, setLoadingSellers] = useState(false);
    const navigate = useNavigate();
    const { setCategoria, setProductName, setFile } = useAppContext();

    const categoriaParser = (name: string) => {
        switch (name) {
            case "amplificador"
              : setCategoria("MLC1182")
              break;
            case "notebook"
              : setCategoria("MLC1648")
              break;
            default
              : setCategoria("")
          }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setUploadedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (uploadedFile) {
            try {
                setLoadingSellers(true);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                let name = uploadedFile.name.split(".")[0];
                categoriaParser(name);
                name = nameParser[name] || name;
                setProductName(name);
                setFile(uploadedFile);
                setLoadingSellers(false);
                navigate("/product");

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
                    {uploadedFile && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">
                                Archivo seleccionado: <strong>{uploadedFile.name}</strong>
                            </p>
                            <img
                                src={URL.createObjectURL(uploadedFile)}
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

