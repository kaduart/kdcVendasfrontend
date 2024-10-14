export type UserDTO = {
    id: number;
    name: string;
    email: string;
    phone: number;
    birthDate: string;
    roles: [string] // 'ADMIN' or 'CLIENT'
}