export interface ProductModel {
    id: string;
    name: string;
    code: string;
    categoryName: string;
    price: number;
    createdDate: string;
    description?: string;
    disabled?: boolean,
    status: number;
    quantity: number;
    avatar: string;
}