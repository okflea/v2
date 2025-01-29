
// src/models/modelMap.ts
import { Model } from 'mongoose';
import { UserModel } from './User';
// import { ProductModel } from './Product';
// import { OrderModel } from './Order';
// ...

export const modelMap: Record<string, Model<any>> = {
  users: UserModel,
  // products: ProductModel,
  // orders: OrderModel,
};
