export interface UserResponse {
    token: string;
    userDto: UserDTO;

}

export interface UserRequest {
    username: string;
    password: string;
}

export interface UserDTO {
    id: string;
    username: string;
    phone: string;
    email: string;
    role: string;
    fullName: string;
}

export interface User {
    id: string;
    username: string;
    phone: string;
    email: string;
    role: string;
    password: string;
    fullName: string;
}