import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

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

