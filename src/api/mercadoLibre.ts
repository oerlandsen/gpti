import client from "./client";

export async function postImage(file: File, userId: string) {

  const formData = new FormData();

  const blob = new Blob([file], { type: file.type });
  formData.append("image", blob, file.name);
  formData.append("userId", userId);

  const response = await client.post(`/photo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  console.log(response.data);
  return response.data;
}

export async function searchItems(query: string, category: string) {
  const response = await client.get(`/search/${query}/${category}`);
  return response.data;
}

export async function getItemReviews(itemId: string) {
  const response = await client.get(`/reviews/${itemId}`);
  return response.data;
}

export async function getTrends() {
  const response = await client.get(`/trends`);
  return response.data;
}

export async function getHistory(userId: string) {
  const response = await client.get(`/search-history/${userId}`);
  return response.data;
}