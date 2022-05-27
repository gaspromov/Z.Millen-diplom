type ReqMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

export type ReqData = {
    url: string;
    authType?: 'jwt';
    method: ReqMethod;
};
type RequestsRecord = Record<string, ReqData>;


export const Requests: RequestsRecord = {
    authLogin: { url: '/auth', method: 'POST' }
}