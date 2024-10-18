import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { OrderDTO } from "../models/order";

export function findByIdRequest(id: number) {

    const url = `/orders/${id}`;

    const config: AxiosRequestConfig = {
        url,
        withCredentials: true
    }
    return requestBackend(config);
}
export function placeOrderRequest(cart: OrderDTO) {
    const url = "/orders";

    const config: AxiosRequestConfig = {
        method: "POST",
        url,
        withCredentials: true,
        data: cart
    }

    return requestBackend(config);

}