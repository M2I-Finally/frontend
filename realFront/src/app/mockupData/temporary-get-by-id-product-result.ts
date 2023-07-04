import { Product } from "../shared/entities/product";

// This interface is temporary, until we get a functioning back-end (we won't need length metadata)
export interface TemporaryGetByIdProductResult {
    0: Product;
    length: number;
}
