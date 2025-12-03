
const API_BASE_URL = "http://localhost:5000/api/items";

/**
 * 
 * @returns {Promise<Array>} List of items
 */
export async function getItems() {
  try {
    const response = await fetch(API_BASE_URL);
    return await response.json();
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

/**
 * @param {Object} itemData - { name, description, found_location, date_found }
 * @returns {Promise<Object>} Created item
 */
export async function createItem(itemData) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemData)
    });
}    return await response.json();
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}