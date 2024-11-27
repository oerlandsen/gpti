import { useSearchParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Review } from '../components/Interfaces';
import Spinner from '../components/Spinner';
import ReviewRating from '../components/ReviewRating';


function getParsedReviews(reviews: { id: number; title: string; content: string; date_created: string; rate: number; relevance: number; likes: number; }[]) {
    return reviews.map((review) => ({
        id: review.id,
        title: review.title,
        comment: review.content,
        date: review.date_created,
        rating: review.rate,
        relevance: review.relevance,
        likes: review.likes,
    }));
}

function getParsedDate(date: string | number | Date) {
    const parsedDate = new Date(date);
    // Format the date as "DD-MM-YYYY HH:MM:SS"
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = parsedDate.getFullYear();
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
    const seconds = String(parsedDate.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

function ProductReviews() {

    const location = useLocation();
    const productData = location.state;
    const productName = productData.product;
    const fullReviews = getParsedReviews(productData.reviews);
    const [reviews, setReviews] = useState<Review[]>(getParsedReviews(productData.reviews));
    const seller = productData.seller;

    const [searchParams] = useSearchParams();
    const sellerId = searchParams.get('sellerId');

    const [loadingReviews, setLoadingReviews] = useState(false);

    const [sortOrder, setSortOrder] = useState('relevance');
    const [filterRating, setFilterRating] = useState<number | null>(null);


    useEffect(() => {
        if (sellerId) {
            // Simulate fetching reviews from an API
            setLoadingReviews(true);
            // Wait to simulate the API call
            setTimeout(() => {
                setLoadingReviews(false);
                const sortedReviews = [...reviews];
                sortedReviews.sort((a, b) => b.relevance - a.relevance);
                setReviews(sortedReviews);
            }, 2500);
        }
    }, [sellerId]);

    useEffect(() => {
        let sortedReviews = [...fullReviews];

        if (filterRating !== null) {
            sortedReviews = fullReviews.filter(review => review.rating === filterRating);
        }
        else {
            sortedReviews = [...fullReviews];
        }

        if (sortOrder === 'relevance') {
            sortedReviews.sort((a, b) => b.relevance - a.relevance);
        } else if (sortOrder === 'date') {
            sortedReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (sortOrder === 'rating') {
            sortedReviews.sort((a, b) => b.rating - a.rating);
        }


        setReviews(sortedReviews);
    }, [sortOrder, filterRating]);

    const handleSortChange = (order: string) => {
        setSortOrder(order);
    };

    const handleFilterChange = (rating: number | null) => {
        setFilterRating(rating);
    };

    return (
        <div>
            <div className="container mx-auto px-10 py-10 flex flex-col justify-center items-center">
                <div className="px-4 bg-white w-full max-w-2xl">
                    <h1 className="text-2xl font-semibold text-gray-800">Reseñas de "{productName}"</h1>
                    <h3 className="text-lg font-semibold text-gray-800 py-3">Vendido por: {seller}</h3>
                    <div className="flex flex-row items-center gap-6">
                        <div className="flex flex-row items-center">
                            <label className="text-gray-700 mr-2">Ordenar por:</label>
                            <select
                                className="px-2 py-1 border border-gray-300 rounded"
                                value={sortOrder}
                                onChange={(event) => handleSortChange(event.target.value)}
                            >
                                <option value="relevance">Más relevantes</option>
                                <option value="date">Más recientes</option>
                                <option value="rating">Mejor calificación</option>
                            </select>
                        </div>
                        <div className="flex flex-row items-center">
                            <label className="text-gray-700 mr-2">Filtrar por calificación:</label>
                            <select
                                className="px-2 py-1 border border-gray-300 rounded"
                                value={filterRating || ''}
                                onChange={(event) => handleFilterChange(event.target.value ? parseInt(event.target.value) : null)}
                            >
                                <option value="">Todas</option>
                                <option value="5">5 estrellas</option>
                                <option value="4">4 estrellas</option>
                                <option value="3">3 estrellas</option>
                                <option value="2">2 estrellas</option>
                                <option value="1">1 estrella</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col mt-4 w-full max-w-2xl'>
                    {loadingReviews ? (
                        <Spinner />
                    ) : reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="p-4 bg-white shadow-lg rounded-lg mt-4 max-w-2xl">
                                {/* <h2 className="text-xl font-semibold text-gray-800">{review.title}</h2> */}
                                <div className='flex justify-between'>
                                    <ReviewRating rating={review.rating} />
                                    <p className="text-gray-400">
                                        {getParsedDate(review.date)}
                                    </p>
                                </div>
                                <p className="text-gray-600">
                                    {review.comment}
                                </p>

                                <p className="text-gray-500 text-sm mt-4">
                                    Relevancia: {review.relevance}
                                </p>
                                <div className="flex items-center mt-2 gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                    </svg>
                                    <span className="text-gray-800">{review.likes}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-800 mt-4">No hay reseñas para mostrar.</p>
                    )}
                </div>
            </div>
        </div>
    );
}


export default ProductReviews;
