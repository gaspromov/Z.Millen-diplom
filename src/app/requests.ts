type ReqMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

export type ReqData = {
    url: string;
    authType?: 'jwt';
    method: ReqMethod;
};
type RequestsRecord = Record<string, ReqData>;


export const Requests: RequestsRecord = {
    authLogin: { url: '/auth/login', method: 'POST' },
    authRegistr: { url: '/auth/register', method: 'POST' },
    authRefreshToken: { url: '/auth/api/token/refresh', method: 'POST' },

    getProducts: { url: '/shop/products', method: 'GET' },
    getCategories: { url: '/shop/categories', method: 'GET' },

    getMe:        { url: '/@me', method: 'GET', authType: 'jwt' },

    addToCart:   { url: '/cart', method: 'POST', authType: 'jwt' },
    getCart:    { url: '/cart', method: 'GET', authType: 'jwt' },
    putProductCart:    { url: '/cart', method: 'PUT', authType: 'jwt' },
    deleteProductCart:    { url: '/cart', method: 'DELETE', authType: 'jwt' },


    postOrder:      { url: '/cart/checkout', method: 'POST', authType: 'jwt' },
    getOrders:      { url: '/cart/checkout', method: 'GET', authType: 'jwt' }
}