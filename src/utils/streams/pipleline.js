import { promisify } from 'util';
import { pipeline } from 'stream';
export const asyncPipeline = () => promisify(pipeline);
