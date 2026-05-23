import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const sourceFile = resolve('apps/ecommerce/src/main.js');
const targetFile = resolve('dist/apps/ecommerce/server/main.js');

if (!existsSync(sourceFile)) {
  throw new Error(`Source file not found: ${sourceFile}`);
}

mkdirSync(dirname(targetFile), { recursive: true });
copyFileSync(sourceFile, targetFile);
