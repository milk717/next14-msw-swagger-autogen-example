import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { generateApi } from 'swagger-typescript-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

generateApi({
  input: path.resolve(__dirname, './swagger/todo-api.yml'),
  templates: path.resolve(__dirname, './templates'),
  generateClient: true,
  generateUnionEnums: true,
  cleanOutput: false,
  prettier: {
    semi: true,
    trailingComma: 'es5',
    singleQuote: true,
    printWidth: 100,
    tabWidth: 2,
    jsxBracketSameLine: false,
    jsxSingleQuote: false,
  },
  modular: true,
  moduleNameFirstTag: true,
  moduleNameIndex: 1,
  typeSuffix: 'Dto',
})
  .then(({ files }) => {
    files.forEach(async ({ fileName, fileContent }) => {
      if (fileName === 'http-client') return;

      const outputPath =
        fileName === 'data-contracts'
          ? path.resolve(__dirname, '../src/shared/api/dto.ts')
          : path.resolve(__dirname, `../src/entities/${fileName.toLowerCase()}/api/api.ts`);

      const outputDir = path.dirname(outputPath);

      try {
        await fs.promises.mkdir(outputDir, { recursive: true });

        await fs.promises.writeFile(outputPath, fileContent);

        console.log(`✅   Successfully wrote file ${fileName.toLowerCase()}.ts`);
      } catch (err) {
        console.error(`☠️   Failed to write file ${fileName.toLowerCase()}.ts: ${err}`);
      }
    });
  })
  .catch((e) => console.error(e));
