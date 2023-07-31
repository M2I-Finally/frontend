export interface Product {
    productId: number;
    name: string;
    description: string;
    price: number;
    tax: number;
    status: boolean;
    stock: number;
    picture: string | undefined;
}