import { Router } from 'express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const router = Router();

const swaggerDocument = YAML.load(
  join(dirname(fileURLToPath(import.meta.url)), '../_documentation/docs.yml')
);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

router.get('/', (req, res) => {
  res.send('ciao dalla home');
});
export default router;
