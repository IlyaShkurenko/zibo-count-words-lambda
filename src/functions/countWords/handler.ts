import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import {countWordTypes} from "@libs/countWordTypes";

const countWords: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const { text } = event.body;

    if(!text) return formatJSONResponse(400, `Text is not provided`);

    const wordCounts = await countWordTypes(text);

    return formatJSONResponse(200, JSON.stringify(wordCounts));
  } catch (error) {
    console.error('Error:', error);
    return formatJSONResponse(500, `Error: ${error.message}`);
  }
};

export const main = middyfy(countWords);
