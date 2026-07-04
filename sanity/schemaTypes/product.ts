export const product = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    { name: "name", type: "string", title: "Product Name" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "name" } },
    { name: "price", type: "number", title: "Price" },
    { name: "image", type: "image", title: "Image" },
    { name: "category", type: "string", title: "Category", 
      options: { list: ["Laptops", "Mobiles", "Accessories"] } 
    },
     {
      name: "description",
      type: "text",
      title: "Description",
    },
  ],
};