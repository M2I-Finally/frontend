import { CartLine } from "./cart-line";

export interface Cart {
    cartLines: Cart[];
    total: number;
    discount: number;
}
