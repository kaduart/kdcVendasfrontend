import QueryString from "qs";
import { AccessTokenPayloadDTO, CredentialsDTO, RoleEnum } from "../models/credentialsDTO";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { requestBackend } from "../utils/requests";
import * as accessTokenRepository from "../localStorage/accessTokenRepository";
import jwtDecode from "jwt-decode";
import { AxiosRequestConfig } from "axios";

export function loginRequest(loginData: CredentialsDTO) {

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`
    }

    const requestBody = QueryString.stringify({ ...loginData, grant_type: "password" });

    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/oauth/token",
        headers,
        data: requestBody,
    }

    return requestBackend(config);
}

export function logout() {
    accessTokenRepository.remove();
}

export function saveAccessToken(token: string) {
    accessTokenRepository.save(token);
}


export function getAccessToken(): string | null {
    return accessTokenRepository.get();
}

export function getAccessTokenPayload(): AccessTokenPayloadDTO | undefined {
    try {

        const token = accessTokenRepository.get();

        return token == null
            ? undefined
            : (jwtDecode(token) as AccessTokenPayloadDTO);

    } catch (error) {
        return undefined;
    }
}
export function isAuthenticated(): boolean {
    let tokenPayload = getAccessTokenPayload();

    return tokenPayload && tokenPayload.exp * 1000 > Date.now() ? true : false;
}

export function hasAnyRoles(roles: RoleEnum[]): boolean {
    if (roles.length === 0) {
        return true;
    }

    const tokenPayload = getAccessTokenPayload();

    if (tokenPayload !== undefined) {
        roles.some(role => tokenPayload.authorities.includes(role));

        for (const role of roles) {

            if (tokenPayload !== undefined && tokenPayload.authorities.includes(role)) {
                return true;
            }
        }

        /*  for (var i = 0; i < roles.length; i++) {
             if (tokenPayload.authorities.includes(roles[i])) {
                 return true;
             }
         } */
        //returnroles.some(role => tokenData.authorities.includes(role)); 
    }
    return false;
}