import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Review } from '../components/Interfaces';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import ReviewRating from '../components/ReviewRating';

const exampleReviews: Review[] = [
    { id: 1, rating: 5, comment: 'Great seller!', date: '2023-01-01', relevance: 67 },
    { id: 2, rating: 4, comment: 'Good service.', date: '2023-01-02', relevance: 92 },
    { id: 3, rating: 3, comment: 'Average experience.', date: '2023-01-03', relevance: 85 },
];

function SellerReviews() {
    const [searchParams] = useSearchParams();
    const sellerId = searchParams.get('sellerId');

    const [loadingReviews, setLoadingReviews] = useState(false);

    const [sortOrder, setSortOrder] = useState('relevance');
    const [filterRating, setFilterRating] = useState<number | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        if (sellerId) {
            // Simulate fetching reviews from an API
            setLoadingReviews(true);
            // Wait to simulate the API call
            setTimeout(() => {
                setLoadingReviews(false);
                const sortedReviews = [...exampleReviews];
                sortedReviews.sort((a, b) => b.relevance - a.relevance);
                setReviews(sortedReviews);
            }, 1000);
        }
    }, [sellerId]);

    useEffect(() => {
        let sortedReviews = [...exampleReviews];

        if (sortOrder === 'relevance') {
            sortedReviews.sort((a, b) => b.relevance - a.relevance);
        } else if (sortOrder === 'date') {
            sortedReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (sortOrder === 'rating') {
            sortedReviews.sort((a, b) => b.rating - a.rating);
        }

        if (filterRating !== null) {
            sortedReviews = sortedReviews.filter(review => review.rating === filterRating);
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
            <NavBar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold text-gray-800">Reseñas del Vendedor</h1>
                <div className="flex flex-row justify-between items-center mt-4">
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

                <div className='flex flex-col mt-4'>
                    {loadingReviews ? (
                        <Spinner />
                    ) : reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="p-4 bg-white shadow-lg rounded-lg mt-4">
                                <ReviewRating rating={review.rating} />
                                <p className="text-gray-600">
                                    Comentario: {review.comment}
                                </p>
                                <p className="text-gray-600">
                                    Fecha: {review.date}
                                </p>
                                <p className="text-gray-600">
                                    Relevancia: {review.relevance}
                                </p>
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

export default SellerReviews;
