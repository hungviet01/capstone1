import { ResponsePagination } from './../../../core/interfaces/paginator.interface';
export interface Product {
    id: string;
    name: string;
    categoryId: number;
    categoryName: string;
    quantity: number;
    price: number;
    createdDate: string;
    status: number;
    avatar: string;
    description: string;
    
}

export interface ResponseSearchProduct extends ResponsePagination<Product[]> {

}