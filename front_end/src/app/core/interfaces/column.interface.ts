export interface CoreColumn {
    headerName?: string;
    headerTooltip?: string;
    headerClass?: string;
    headerStyle?: Style;

    field?: string;
    valueGetter?: (data) => string;
    cellStyle?: Style;
    cellClass?: string;
}

export interface Style {
    [key: string]: string;
}