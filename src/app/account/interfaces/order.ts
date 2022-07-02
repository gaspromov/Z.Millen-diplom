import { CartProduct } from "src/app/cart/interfaces/cart-product";

export interface Order {
    id: number,
    created: string,
    status: number,
    final_price: string,
    products: CartProduct[]
}
