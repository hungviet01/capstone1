import { StatusModel } from "../core/models/status.model.ts";

export const DEFAULT_PAGE_SIZE = 10;
export const DOT_DOT_DOT: string = '...';

export const BASE_STYLE = {
    'white-space': 'nowrap',
    'text-overflow': 'ellipse',
    'overflow': 'hidden',
    'font-weight': '500',
    'font-size': '12px',
    'font-family': 'Inter',
    'font-style': 'normal',
    'color': 'rgb(16, 24, 64)',
    'padding-top': '10px',
}

export const BASE_STYLE_CENTER = {
    ...BASE_STYLE,
    'text-align': 'center',
}

export const STATUS: StatusModel[] = [
    {
        id: 0,
        label: 'Không hoạt động'
    },

    {
        id: 1,
        label: 'Hoạt động'
    }
]

export const DISCOUNT_TYPEs: StatusModel[] = [
    {
        id: 0,
        label: 'Phần trăm'
    },
    {
        id: 1,
        label: 'Giá bán'
    }
]

export const STATUS_DISCOUNT = [
    {
        id: 0,
        label: 'Đã hết hạn'
    },
    {
        id: 1,
        label: 'Đã sử dụng'
    },
    {
        id: 2,
        label: 'Chưa hết hạn'
    }
]

export const STATISTIC_BY = [
  
    {
        id: 1,
        label: 'Tháng'
    },
    {
        id: 2,
        label: 'Năm'
    }
]

export const ACTION_CLOSE = '_CLOSE';
export const ACTION_ACCEPT = '_ACCEPT';
export const ACTIVE = 1;
export const INACTIVE = 0;