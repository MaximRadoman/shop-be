import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { productHandler, stockHandler } from "../../handlers";
import { Stock } from "../../handlers/stockHandler";
import { Product } from "../../handlers/productHandler";

import schema from './schema';

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { id } = event.pathParameters;
  try {
    const product: Product = await productHandler.getProduct(id);
    const stocks: Stock[] = await stockHandler.getStockByProductId(id);

    if (!product) {
      return formatJSONResponse({ message: `Product with id- ${id} was not found.`} , 404);
    }
    return formatJSONResponse({ ...product, count: stocks?.length > 0 ? stocks[0].count : 0 }, 200);

  } catch (err) {
    return formatJSONResponse({ message: err.messsage }, 500);
  }

};

export const main = middyfy(getProductsById);
