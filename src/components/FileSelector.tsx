import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../AppContext";
import Spinner from "./Spinner";
import { postImage } from "../api/mercadoLibre";

const nameParser: { [key: string]: string } = {
  "amplificador": "Amplificador Guitarra",
  "notebook": "Notebook MSI",
  "bajo": "Bajo Acústico",
  "cien": "Libro Cien Años de Soledad",
  "rubik": "Cubo Rubik 3x3",
  "totodile": "Peluche Totodile",
  "play5": "Playstation 5",
  "WhatsApp Image 2024-11-22 at 13": "Iphone 13"
}

function FileSelector() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loadingSellers, setLoadingSellers] = useState(false);
  const navigate = useNavigate();
  const { setCategoria, setProductName, setFile, setCategoriaName, user } = useAppContext();

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
      case "play5"
        : setCategoria("MLC1144")
        break;
      case "WhatsApp Image 2024-11-22 at 13"
        : setCategoria("MLC1051")
        break;
      default
        : setCategoria("MLC1953")
        break;
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
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        const data = await postImage(uploadedFile, user);
        console.log("Data", data);
        setProductName(data.product);
        setCategoria(data.category);
        setCategoriaName(data.categoryName);

        // let name = uploadedFile.name.split(".")[0];
        // categoriaParser(name);
        // name = nameParser[name] || name;
        // setProductName(name);
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

  return loadingSellers ? (
    <Spinner />
  ) : (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Contenido principal */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        {/* Introducción */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Identifica tus Productos
          </h2>
          <p className="text-gray-600 text-lg">
            Sube una imagen del producto y descubre quién lo vende en MercadoLibre.
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"
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
                className="mt-4 w-full h-64 object-contain"
              />
            </div>
          )}
        </form>
        <h3 className="text-2xl  text-gray-800 mt-6 mb-4">¡Mira los productos que son tendencia!</h3>
        <Link to={'/trends'} className="text-lg text-gray-800 text-blue-500">Ver Productos</Link>

      </main>
    </div>
  );
}

export default FileSelector;
