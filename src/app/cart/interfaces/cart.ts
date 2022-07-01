import { CartProduct } from "./cart-product";

export interface Cart {
    id: number,
    final_price: string,
    ownerId: number,
    total_products: number,
    products: CartProduct[]
}
