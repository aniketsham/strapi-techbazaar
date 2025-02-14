export default {
  filteredProducts: async (ctx, next) => {
    try {
      const { min, max, category, subCategory } = ctx.query;

      const products: any = await strapi
        .documents("api::product.product")
        .findMany({
          sort: { isRelevant: "desc", Price: "asc" },
          populate: {
            sub_category: {
              populate: "category", // Fetch category inside sub_category
            },
            Product_image: {
              populate: "*",
            },
            product_variants: {
              populate: "*",
            },
          },
        });

      const minPrice = min ? Number(min) : 0;
      const maxPrice = max ? Number(max) : Infinity;

      console.log(
        "Filters - Min:",
        minPrice,
        "Max:",
        maxPrice,
        "Category:",
        category,
        "SubCategory:",
        subCategory
      );

      let filteredProducts = products.filter((product: any) => {
        const productCategory = product.sub_category?.category?.SLUG;
        const productSubCategory = product.sub_category?.SLUG;

        const isCategoryMatch = category ? productCategory === category : true;
        const isSubCategoryMatch = subCategory
          ? productSubCategory === subCategory
          : true;
        const isPriceMatch =
          Number(product.Price) >= minPrice &&
          Number(product.Price) <= maxPrice;

        return isCategoryMatch && isSubCategoryMatch && isPriceMatch;
      });

      console.log("Filtered Products:", filteredProducts);

      ctx.body = filteredProducts;
    } catch (err) {
      console.error("Error fetching products:", err);
      ctx.body = { error: "An error occurred while fetching products." };
    }
  },
};
