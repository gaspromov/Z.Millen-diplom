type ReqMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

export type ReqData = {
    url: string;
    authType?: 'jwt';
    method: ReqMethod;
};
type RequestsRecord = Record<string, ReqData>;


export const Requests: RequestsRecord = {
    authLogin: { url: '/auth/login/', method: 'POST' },
    authRegistr: { url: '/auth/register', method: 'POST' },
    getProducts: { url: '/shop/products', method: 'GET' },
    getCategories: { url: '/shop/categories', method: 'GET' },
    getMe:        { url: '/@me', method: 'GET' }
}