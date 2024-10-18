import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { Product } from "../models/product";

export function findPageRequest(page: number, name: string, size: number, sort = "name") {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/products",
        params: {
            page,
            name,
            size,
            sort
        }
    }

    return requestBackend(config).then((response => response));
}

export function findById(id: number) {
    const url = `/products/${id}`;

    return requestBackend({ url }).then((response) => response);
}

export function search(query: string) {
    const url = `/products/search?query=${query}`;

    return requestBackend({ url }).then((response => response));
}

export function deleteProduct(productId: number) {
    const url = `/products/${productId}`;

    const config: AxiosRequestConfig = {
        url,
        method: "DELETE",
        withCredentials: true
    };

    return requestBackend(config).then((response) => response);
}

export function updateProduct(product: Product) {
    const url = `/products/${product.id}`;

    const config: AxiosRequestConfig = {
        url,
        method: "PUT",
        withCredentials: true,
        data: product
    };

    return requestBackend(config).then((response) => response);
}

export function addProduct(product: Product) {
    const url = `/products`;

    const config: AxiosRequestConfig = {
        url,
        method: "POST",
        withCredentials: true,
        data: product
    };

    return requestBackend(config).then((response) => response);
}


