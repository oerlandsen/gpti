import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function FileSelector() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (file) {
            // Aquí puedes manejar el archivo (subirlo al servidor o procesarlo)
            console.log("Archivo seleccionado:", file.name);
            alert(`Archivo "${file.name}" subido con éxito.`);
        } else {
            alert("Por favor selecciona un archivo antes de enviar el formulario.");
        }
    };

    return (
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
                    <p className="mt-4 text-sm text-gray-600">
                        Archivo seleccionado: <strong>{file.name}</strong>
                    </p>
                )}
            </form>
        </div>
    );
}

export default FileSelector;