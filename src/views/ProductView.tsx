import ProductListCard from '../components/ProductListCard';
import { useAppContext } from '../AppContext';

function ProductView() {

    const { productName, sellers, file } = useAppContext();

    return (
        <div className="flex flex-row items-center justify-center p-6 gap-20">
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
                    {sellers.map((seller, index) => (
                        <ProductListCard key={index} seller={seller} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProductView;