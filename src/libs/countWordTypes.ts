import {S3} from "aws-sdk";

const s3 = new S3();
const BUCKET_NAME = 'testbucketzizo';
const FILE_NAME = 'vocabulary.json';

//local cache for vocabulary

let cachedWordTypeMap: Record<string, string> | null = null;

const getWordTypeMapFromS3 = async () => {

  if (cachedWordTypeMap !== null) {
    return cachedWordTypeMap;
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: FILE_NAME,
  };

  try {

    const data = await s3.getObject(params).promise();
    cachedWordTypeMap = JSON.parse(data.Body.toString());
    return cachedWordTypeMap;

  } catch (error) {
    console.error('Error fetching word type map from S3:', error);
    throw error;
  }
}

const countWordTypes = async (text: string) => {
  const wordToTypeMap = await getWordTypeMapFromS3(); // we need to cache this result
  const counts: { [type: string]: number } = {};

  const words = text.split(' ');
  words.forEach(word => {
    const type = wordToTypeMap[word];
    if (type) {
      counts[type] = (counts[type] || 0) + 1;
    }
  });

  return counts;
}

export { countWordTypes }
