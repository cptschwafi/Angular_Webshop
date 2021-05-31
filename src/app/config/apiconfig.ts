import { environment } from '../../environments/environment';

// export const baseUrl = environment.production ? 'https://ProductionServer' : 'http://localhost:3000';
export const baseUrl = environment.production ? 'http://schwafisplace.sytes.net/' : 'http://schwafisplace.sytes.net/';
export const productsUrl = baseUrl + '/products';
export const cartUrl = baseUrl + '/carts';
export const ordersUrl = baseUrl + '/orders';
export const filtersUrl = baseUrl + '/filters';

