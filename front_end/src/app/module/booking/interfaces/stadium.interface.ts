import { Time } from './time.interface';
export interface Stadium {
    id: string;
    name: string;
    address: string;
    description: string;
    totalType: number;
    minPrice: number;
    maxPrice: number;
    provinceId?: number;
    districtId?: string;
    avatar: string;
    options?: StadiumOption[];
    provinceName: string;
    createdBy: string;
}

export interface StadiumImage {
    id: number;
    image: string;
    stadiumId: string;
}

export interface StadiumOption {
    id: number;
    stadiumId: string;
    name: string;
}

export interface AvailableStadium {
    date: string;
    children: Time[];
}

export interface AvailableStadiumRequest {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    stadiumId: string;
}