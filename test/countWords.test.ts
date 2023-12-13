import { expect } from 'chai';
import {countWordTypes} from "../src/libs/countWordTypes";

describe('countWordsLambda', () => {
  it('correctly counts complex text', async () => {
    const result = await countWordTypes('Hello, WORLD! This is a test. Cats, cat, cat dogs, and birds: three types of pets. Running, swimming, JUMPING!');
    expect(result).to.deep.equal({
      determiner: 1,
      noun: 1,
      conjunction: 1,
      numeral: 1
    });
  });

  // more tests
});
