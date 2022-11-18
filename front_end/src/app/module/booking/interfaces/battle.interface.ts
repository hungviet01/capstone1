import { Tree } from 'src/app/core/interfaces/table.interface';

export interface Battle extends Tree<Battle> {
    competitor?: string;
    time?: string;
    price?: number;
    id: number;
}