import { Order } from "src/app/account/interfaces/order";
import { User } from "src/app/account/interfaces/user";

export interface OrderOperator extends Order {
    owner: User
}
