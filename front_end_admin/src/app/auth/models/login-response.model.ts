export interface LoginResponse {
    token: string;
    userDto: UserDTO;
}

export interface UserDTO {
    id: string;
    username: string;
    phone: string;
    email: string;
    role: string;
    fullName: string;
}