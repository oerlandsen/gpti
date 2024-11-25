interface Seller {
    id: number;
    name: string;
    price: number;
    rating: number;
}

interface Product {
    name: string;
}

interface Review {
    id: number;
    rating: number;
    comment: string;
    date: string;
    relevance: number;
}

export type { Seller, Product, Review };