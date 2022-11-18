import { ProductModel } from './../../product/models/product.model';
export interface CommentTree {
    id: number;
    parentId: number;
    content: string;
    createdDate: string;
    username: string;
    productId: number;
    prouduct: ProductModel;
    childrent: CommentTree[];
}