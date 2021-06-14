import { environment } from '../../environments/environment';

export const baseUrl = environment.production ? 'https://schwafisplace.sytes.net' : 'http://localhost:3000';
export const productsUrl = baseUrl + '/products';
export const cartUrl = baseUrl + '/carts';
export const ordersUrl = baseUrl + '/orders';
export const filtersUrl = baseUrl + '/filters';


