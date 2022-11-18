export interface MenuModel {
    name?: string,
    isExpanded?: boolean,
    page?: string,
    icon?: string,
    children?: MenuModel[],
}