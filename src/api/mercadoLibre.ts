import client from "./client";


export async function searchItems(query: string) {
  const response = await client.get(`/sites/MLA/search?q=${query}`);
  return response.data;
}
