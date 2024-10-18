import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function getAll() {
    const url = `/categories`;

    const config: AxiosRequestConfig = {
        url,
        method: 'GET',
    };

    return requestBackend(config);
}