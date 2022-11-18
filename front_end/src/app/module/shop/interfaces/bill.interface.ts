export interface Bill {
    id: string;
    createdDate: string;
    createdBy: string;
    fullName: string;
    address: string;
    phone: string;
    status: number;
    total: number;
    statusName: string;
}

export interface BillDetail {
    productName: string;
    categoryName: string;
    sizeName: string;
    total: number;
    quantity: number;
    productId: string;
}