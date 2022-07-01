import { Product } from "src/app/catalog/interfaces/product";

export interface CartProduct{
    final_price: string,
    qty: number,
    id: number,
    product: Product
}
