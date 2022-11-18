export interface Request {
    id?: number;
    status?: 0 | 1 | 2;
    hasCompetitor: boolean;
    stadiumDetailId: number;
    hireDate: string;
}

export interface PendingRequest {
    requestId: number;
    detailId: number;
    stadiumName: string;
    typeName: string;
    hireDate: string;
    startTime: string;
    endTime: string;
    requester: string;
    hasCompetitor: 'Y' | 'N';
}

export interface Challenge {
    id: number;
    requester: string;
    createdDate: string;
}