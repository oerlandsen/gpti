import { useState, useEffect } from "react";
import ProductListCard from "../components/ProductListCard";
import { useAppContext } from "../AppContext";
import { searchItems } from "../api/mercadoLibre";
import Spinner from "../components/Spinner";
import { categorias } from "../../public/categorias";

function ProductView() {
  const { productName, file, categoria, history, setHistory } = useAppContext();

  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  function updateHistory(productName: string, categoria: string, file: Blob | null) {
    const historyElement = {
      searchTerm: productName,
      searchDate: new Date(),
      imagePath: URL.createObjectURL(file!), // /images/${productName}.jpg
      category: categorias[categoria],
    };

    // If the history already contains the element, move it to the top
    const index = history.findIndex((element) => element.searchTerm === productName);
    if (index !== -1) {
      history.splice(index, 1);
    }

    setHistory([historyElement, ...history]);
  }

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await searchItems(productName, categoria);
        response.results = response.results.slice(0, 10);
        console.log("Products", response.results);
        setProducts(response.results);
        updateHistory(productName, categoria, file);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, [productName, categoria]);

  return (
    <>
      {loading ? (
        <Spinner text="Identificando producto..." />
      ) : (
        <div className="flex flex-col items-center justify-center p-6 gap-20">
          <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Producto: {productName === "WhatsApp Image 2024-11-22 at 13" ? "Iphone 13" : productName}
            </h1>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Categoría: {categorias[categoria]}
            </h1>
            <img
              src={URL.createObjectURL(file!)}
              alt="Producto"
              className="w-full h-64 object-contain"
            />
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Productos Relacionados:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductListCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductView;
