import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const allData = join(dirname(fileURLToPath(import.meta.url)), "../data");

const productsFiles = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/products"
);

export const fetchProducts = async () =>
  await readJSON(join(allData, "products.json"));

export const fetchReviews = async () =>
  await readJSON(join(allData, "reviews.json"));

export const writeProducts = async (content) =>
  await writeJSON(join(allData, "products.json"), content);

export const writeReviews = async (content) =>
  await writeJSON(join(allData, "reviews.json"), content);

export const writeProductsPics = async (fileName, content) =>
  await writeFile(join(productsFiles, fileName), content);
