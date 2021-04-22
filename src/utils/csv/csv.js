import { Transform } from 'json2csv';
import fs from 'fs-extra';
const { createReadStream } = fs;
import { pipeline } from 'stream';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
export const createCSV = async (target) => {
  try {
    const sourceStream = createReadStream(
      join(dirname(fileURLToPath(import.meta.url)), '../../data/products.json')
    );
    const fields = ['name', 'brand', 'price', 'category', 'description'];
    const options = { fields };
    const json2csv = new Transform(options);
    pipeline(sourceStream, json2csv, target, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
