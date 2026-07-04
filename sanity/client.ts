import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ll9lalgh", //id of sanity project
  dataset: "production",
  apiVersion: "2026-01-22",
  useCdn: true,
});