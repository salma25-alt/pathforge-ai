const API_BASE_URL = "http://localhost:5013/api";

async function postJson(endpoint, payload) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Something went wrong on the server.");
  }
  return data;
}

export function fetchCareerMatches(profileData) {
  return postJson("/discover-goals", profileData);
}

export function fetchCareerRoadmap(roadmapRequest) {
  return postJson("/generate-roadmap", roadmapRequest);
}