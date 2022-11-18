import { Tree } from "src/app/core/interfaces/table.interface";

export interface Time extends Tree<Time> {
    id: number;
    name?: string;
    startTime?: string;
    endTime?: string;
    price?: number;
    expanded?: boolean;
    quantity: number;
}