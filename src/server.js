import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import productsRoutes from './routes/products.js';
import reviewsRoutes from './routes/reviews.js';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import {
  errorHandler,
  routeNotFoundHandler,
} from './middlewares/errors/errorHandling.js';

const currentFile = fileURLToPath(import.meta.url);
const currentFolder = dirname(currentFile);
const publicFolder = join(currentFolder, '../public');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.static(publicFolder));
app.use(express.json());

app.use('/products', productsRoutes);
app.use('/reviews', reviewsRoutes);
app.use(routeNotFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running on port ${PORT} 🏃‍♂️`));
