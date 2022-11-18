import { MenuModel } from "./models/menu.model";

export const Menu: MenuModel[] = [
    {
        name: 'Quản lý danh mục',
        page: 'category',
        icon: 'fab fa-watchman-monitoring'
    },

    {
        name: 'Quản lý sản phẩm',
        page: 'product',
        icon: 'fab fa-product-hunt',
    },

    {
        name: 'Quản lý người dùng',
        page: 'user',
        icon: 'fas fa-users',
    },

    {
        name: 'Quản lý đơn hàng',
        page: 'bill',
        icon: 'fas fa-file-invoice'
    },

    {
        name: 'Quản lý phản hồi',
        page: 'feedback',
        icon: 'fas fa-comment'
    }
]