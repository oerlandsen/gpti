import client from "./client";

export async function searchItems(query: string, categoria: string) {
  const response = await client.get(`/sites/MLC/search?q=${query}&category=${categoria}`);
  return response.data;
}

export async function getItemReviews(itemId: string) {
  const response = await client.get(`/reviews/item/${itemId}?limit=10&offset=0`);
  return response.data;
}

export async function getSellerInfo(sellerId: string) {
  const response = await client.get(`/users/${sellerId}`);
  return response.data;
}
