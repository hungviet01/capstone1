export interface Toast {
    id: string | number;
    text: string;
    type: 'success' | 'error' | 'warning'
}