
// import { Action } from '@ngrx/store';

// export enum ProductActionTypes {
//   OneProductAdded = '[Added Product Component] Product Added',
//   OneProductDeleted = '[Delete Product Component] Product Deleted',
//   ManyProductsDeleted = "[Delete Products Component] Products Deleted"
// }

// export class OneProductAdded implements Action {
//   readonly type = ProductActionTypes.OneProductAdded;
//   constructor(public payload: {id : number}) {}
// }


// export class OneProductDeleted implements Action {
//   readonly type = ProductActionTypes.OneProductDeleted;
//   constructor(public payload: { id: number }) {}
// }


// export class ManyProductsDeleted implements Action {
//   readonly type = ProductActionTypes.ManyProductsDeleted;
//   constructor(public payload: { ids: number[] }) {}
// }


// export type ProductAction =
// OneProductAdded|
// OneProductDeleted|
// ManyProductsDeleted


// import { createAction, props } from '@ngrx/store';

// import { ProductModel } from '../_models/product.model';

// export const appendProduct = createAction('[Add Product]', props<{productId : number}>());
// export const deleteProduct = createAction('[Delete Product]', props<{productId : number}>());
// export const deleteProducts = createAction('[Delete All Product]', props<{productIds : number[]}>());
