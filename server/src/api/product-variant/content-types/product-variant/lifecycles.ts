export default {
  async beforeCreate(event) {
    const { data } = event.params;

    // Ensure color, size, and material exist
    const color = data.Colors;
    const size = data.Sizes;
    const material = data.Materials;

    // Generate SKU if not provided
    if (!data.SKU) {
      data.SKU = `${material}`;
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    // Ensure color, size, and material exist
    const color = data.Colors;
    const size = data.Sizes;
    const material = data.Materials;

    // Generate SKU if not provided

    data.SKU = `${material}`;
  },
};
