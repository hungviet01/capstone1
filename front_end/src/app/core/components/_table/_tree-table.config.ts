import { Tree } from '../../interfaces/table.interface';
import {
  IServerSideDatasource,
  IServerSideGetRowsParams,
  IServerSideGetRowsRequest,
  GetServerSideGroupKey,
  IsServerSideGroup,
  IsServerSideGroupOpenByDefaultParams,
  ColDef,
} from 'ag-grid-community';

export const isServerSideGroupOpenByDefault: (
  params: IsServerSideGroupOpenByDefaultParams
) => boolean = (params: IsServerSideGroupOpenByDefaultParams) => {
  // open first two levels by default
  return false;
};

export const isServerSideGroup: IsServerSideGroup = (dataItem: any) => {
  return dataItem.group;
};

export const getServerSideGroupKey: GetServerSideGroupKey = (dataItem: any) => {
  // specify which group key to use
  return dataItem.key;
};

export function createFakeServer<T extends Tree<T>>(fakeServerData: T[]) {
  const fakeServer = {
    data: fakeServerData,
    getData: function (request: IServerSideGetRowsRequest) {
      function extractRowsFromData(groupKeys: string[], data: any[]): any {
        if (groupKeys.length === 0) {
          return data.map(function (d) {
            return {
              ...d,
              group: !!d.children,
            };
          });
        }
        var key = groupKeys[0];
        for (var i = 0; i < data.length; i++) {
          if (data[i].key === key) {
            return extractRowsFromData(
              groupKeys.slice(1),
              data[i].children.slice()
            );
          }
        }
      }
      return extractRowsFromData(request.groupKeys, this.data);
    },
  };
  return fakeServer;
}

export function createServerSideDatasource(fakeServer: any) {
  const dataSource: IServerSideDatasource = {
    getRows: (params: IServerSideGetRowsParams) => {
      var allRows = fakeServer.getData(params.request);
      var request = params.request;
      var doingInfinite = request.startRow != null && request.endRow != null;
      var result = doingInfinite
        ? {
            rowData: allRows.slice(request.startRow, request.endRow),
            rowCount: allRows.length,
          }
        : { rowData: allRows };
      setTimeout(function () {
        params.success(result);
      }, 200);
    },
  };
  return dataSource;
}

export const autoGroupColumnDef: ColDef = {
  field: 'key',
  cellRendererParams: {
    innerRenderer: (params) => {
      return params.data.key;
    },
  },
};