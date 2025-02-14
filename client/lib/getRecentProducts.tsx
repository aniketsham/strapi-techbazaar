export const updateRecentProducts = (newProduct: any) => {
  const storageKey = "recentProducts"; // Key for localStorage

  // Get existing products from localStorage
  let products: any[] = JSON.parse(localStorage.getItem(storageKey) || "[]");

  // Remove duplicates (avoid adding the same product twice)
  products = products.filter((product) => product.id !== newProduct.id);

  // Add the new product at the start
  products.unshift(newProduct);

  // Keep only the latest 5 products
  if (products.length > 5) {
    products.pop();
  }

  // Save back to localStorage
  localStorage.setItem(storageKey, JSON.stringify(products));

  console.log("Updated recent products:", products);
};
