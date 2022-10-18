import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { productHandler, stockHandler } from "../../handlers";
import { Stock } from "../../handlers/stockHandler";
import { Product } from "../../handlers/productHandler";

import schema from './schema';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  let response, status;
  try {
    const productsData: Product[] = await productHandler.getProducts();
    const stocks: Stock[] = await stockHandler.getStocks();

    response = productsData.map(product => {
      const stock: Stock = stocks.find(stock => stock.productId === product.id);
      return ({
        ...product,
        count: stock?.count || 0,
      })
    });
    status = 200;
  } catch (err) {
    response = { message: err.message };
    status = 500;
  }
  return formatJSONResponse(response, status);
};

export const main = middyfy(getProductsList);
