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
    title: string;
    comment: string;
    date: string;
    rating: number;
    relevance: number;
    likes: number;
}

export type { Seller, Product, Review };