import client from "./client";

export async function searchItems(query: string) {
  const response = await client.get(`/sites/MLC/search?q=${query}`);
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
