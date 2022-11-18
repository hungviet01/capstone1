import { ResponseServiceModel } from "src/app/base/core/models/search.model";

export interface UserModel {
    username: string;
    full_name: string;
    birthday: string;
    lastLogin: string;
    status: number;
    phone: string;
    address: string;
    role: string;
}

export interface ResponseSearchUser extends ResponseServiceModel<UserModel> {
    
}