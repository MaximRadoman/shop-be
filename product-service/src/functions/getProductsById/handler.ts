import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { default as products } from './../../data/products/products.json';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { id } = event.pathParameters;
  const product = products.find((product) => id === product.id);

  if (product) {
    return formatJSONResponse(product, 200);
  }
  else {
    const message = `Product with id- ${id} was not found.`;
    return formatJSONResponse(message, 404);
  }

};

export const main = middyfy(getProductsById);
