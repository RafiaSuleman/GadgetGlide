import orderSchema from "./order";
import { product } from "./product";

export const schema = {
  types: [product,orderSchema],
};