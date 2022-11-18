export const AG_GRID_CELL_STYLE = {
    'position': 'absolute',
    'font-style': 'normal',
    'font-weight': '500',
    'font-size': '13px',
    'line-height': '20px',
    'color': '#101840',
}

export enum Role {
    USER = 'USER',
    OWNER_STADIUM = 'OWNER_STADIUM',
    ADMIN = 'ADMIN',
}

export const BillStatus = [
    {
        id: 0,
        label: 'Chờ duyệt'
    },
    {
        id: 1,
        label: 'Đã duyệt'
    },
    {
        id: 2,
        label: 'Từ chối'
    }
]