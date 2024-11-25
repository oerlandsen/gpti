function ReviewRating({ rating }: { rating: number }) {
    const stars = Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? "text-yellow-500" : "text-gray-300"}>
            ★
        </span>
    ));

    return (
        <div className="text-lg font-semibold text-gray-800">
            {stars}
        </div>
    );
}

export default ReviewRating;