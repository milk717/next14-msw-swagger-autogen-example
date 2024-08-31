import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import minimist from 'minimist';
import { generateApi } from 'swagger-typescript-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argv = minimist(process.argv.slice(2), {
  string: ['hook'],
  alias: {
    h: 'hook',
  },
});

const { hook } = argv;

if (!hook) {
  console.error('❗️ Error: Please provide the hook type.');
  console.error('Usage: node generate-hooks.js --hook <queries|mutations>');
  process.exit(1);
}

generateApi({
  input: path.resolve(__dirname, './swagger/todo-api.yml'),
  templates: path.resolve(__dirname, `./templates/${hook}`),
  generateClient: true,
  generateUnionEnums: true,
  cleanOutput: false,
  prettier: {
    tabWidth: 2,
    printWidth: 80,
    singleQuote: true,
    endOfLine: 'auto',
    arrowParens: 'always',
    trailingComma: 'es5',
  },
  modular: true,
  moduleNameFirstTag: true,
  moduleNameIndex: 1,
  typeSuffix: 'Dto',
})
  .then(({ files }) => {
    files.forEach(({ fileName, fileContent }) => {
      if (fileName === 'http-client' || fileName === 'data-contracts') return;

      const directoryPath = path.resolve(
        __dirname,
        `../src/entities/${fileName.toLowerCase()}/api`
      );
      const fileOutputPath = path.join(directoryPath, `${hook}.ts`);

      fs.mkdir(directoryPath, { recursive: true }, (err) => {
        if (err) {
          console.error(`☠️   Failed to create directory ${directoryPath}: ${err}`);
          return;
        }

        fs.writeFile(fileOutputPath, fileContent, (err) => {
          console.log(
            err
              ? `☠️   Failed to write file ${fileName.toLowerCase()}.ts: ${err}`
              : `✅   Successfully wrote file ${fileName.toLowerCase()}.ts`
          );
        });
      });
    });
  })
  .catch((e) => console.error(e));
