export interface Cart {
    id: number;
    username: string;
    productId: number;
    quantity: number;
    sizeId: number;
    productName: string;
    avatarProduct: string;
    categoryName: string;
    sizeName: string;
    price: number;
    total: number;
}

export interface Payment {
    fullName: string;
    phone: string;
    address: string;
    carts: Cart[];
}