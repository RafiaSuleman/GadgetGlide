import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { product } from "./sanity/schemaTypes/product";
import order from "./sanity/schemaTypes/order";


const schemaTypes = [product, order];

export default defineConfig({
  name: "default",
  title: "My Sanity Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [visionTool()],

  schema: {
    types: schemaTypes,
  },
});

