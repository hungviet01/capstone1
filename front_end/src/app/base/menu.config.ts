import { Role } from "./constant";

interface IMenu {
    name: string;
    icon: string;
    link?: string;
    roles: Role[];
}

export const Menu: IMenu[] = [
    {
        name: 'Đặt sân & Tìm đối',
        icon: 'assets/icons/svg/booking.svg',
        link: 'stadium',
        roles: [Role.USER]
    },
    {
        name: 'Cửa hàng',
        icon: 'assets/icons/svg/shop.svg',
        link: '/shop/product',
        roles: [Role.USER]
    },
    {
        name: 'Sân của tôi',
        icon: 'assets/icons/svg/my-stadium.svg',
        link: 'my-stadium',
        roles: [Role.OWNER_STADIUM]
    },
    {
        name: 'Chờ đối thủ',
        icon: 'assets/icons/svg/my-stadium.svg',
        link: 'request',
        roles: [Role.USER]
    },
    {
        name: 'Yêu cầu',
        icon: 'assets/icons/svg/my-stadium.svg',
        link: 'request/rent',
        roles: [Role.OWNER_STADIUM]
    },
    {
        name: 'Giỏ hàng',
        icon: 'assets/icons/svg/my-stadium.svg',
        link: '/shop/my-cart',
        roles: [Role.USER]
    },
    {
        name: 'Đơn hàng',
        icon: 'assets/icons/svg/my-stadium.svg',
        link: '/shop/my-bill',
        roles: [Role.USER]
    }
]