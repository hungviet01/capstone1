export interface ResponseService<T> {
    status: number,
    message: string,
    data: T,
}