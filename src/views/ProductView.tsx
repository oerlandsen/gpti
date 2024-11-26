import { useState, useEffect } from "react";
import ProductListCard from "../components/ProductListCard";
import { useAppContext } from "../AppContext";
import { searchItems } from "../api/mercadoLibre";
import Spinner from "../components/Spinner";

function ProductView() {
  const { productName, file } = useAppContext();

  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await searchItems(productName);
        setProducts(response.results);
        // console.log("Items fetched:", response.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center justify-center p-6 gap-20">
          <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Producto: {productName}
            </h1>
            <img
              src={URL.createObjectURL(file!)}
              alt="Producto"
              className="w-full h-64 object-contain"
            />
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Vendedores que ofrecen este producto:
            </h2>
            <ul className="space-y-4">
              {products.map((product: any) => (
                <ProductListCard key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductView;
