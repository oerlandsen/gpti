import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemReviews } from '../api/mercadoLibre';

function ProductListCard({ key, product }: { key: number, product: any }) {
    const [reviews, setReviews] = useState<any>([]);
    const [reviewsProps, setReviewsProps] = useState<any>([]);
    const [productUrl] = useState<string>(product.permalink);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getItemReviews(product.id);
                setReviews(response);
                setReviewsProps({
                    reviews: response.reviews,
                    seller: product.seller.nickname,
                    product: product.title
                })
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [product.id]);

    return (
        <li key={key} className="flex flex-col justify-between p-4 bg-white shadow-lg rounded-lg w">
            <div className="flex flex-col items-left justify-center mr-4">
                <img
                    src={product.thumbnail!}
                    alt="Producto"
                    className="w-full h-64 object-contain"
                    style={{ width: '30%', height: 'auto' }}
                />
                <p className="text-lg font-semibold text-gray-800">
                    {product.title}
                </p>
                <p className="text-gray-600">
                    Precio: ${product.price}
                </p>
                <p className="text-gray-600">
                    Calificación: {reviews.rating_average || "No hay reviews"}
                </p>
                <p className="text-gray-600">
                    Vendedor: {product.seller?.nickname || ""}
                </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-4 mt-4">
                <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={() => window.open(productUrl, "_blank")}
                >
                    Ir a Comprar
                </button>
                <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={() => navigate(`/reviews?sellerId=${product.seller.id}`, { state: reviewsProps })}
                >
                    Ver Reseñas
                </button>
            </div>
        </li>

    )
};

export default ProductListCard;