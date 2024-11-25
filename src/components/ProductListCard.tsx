import { Seller } from './Interfaces';
import { useNavigate } from 'react-router-dom';

function ProductListCard({ key, product }: { key: number, product: any }) {

    const navigate = useNavigate();

    return (
        <li key={key} className="flex flex-row justify-between p-4 bg-white shadow-lg rounded-lg">
            {/* <div className="flex flex-col items-left justify-center mr-4">
                <p className="text-lg font-semibold text-gray-800">
                    {product.title}
                </p>
                <p className="text-gray-600">
                    Precio: ${seller.price}
                </p>
                <p className="text-gray-600">
                    Calificación: {seller.rating}
                </p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={() => navigate(`/reviews?sellerId=${seller.id}`)}
                >
                    Ver Reseñas
                </button>
            </div> */}
        </li>

    )
};

export default ProductListCard;