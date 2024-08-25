import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerFilePath = path.resolve(__dirname, './swagger/todo-api.yml');
const outputDir = path.resolve(__dirname, '../msw');

const command = `yarn run msw-auto-mock ${swaggerFilePath} -o ${outputDir} --base-url https://api.todo-example.com/v1`;

const removeUnnecessaryFiles = async () => {
  await fs.unlink(path.resolve(__dirname, '../msw/native.js'));
};

const convertToTs = async (filePath) => {
  try {
    if (path.extname(filePath) !== '.js') {
      console.error('❗ The file is not a .js file.');
      return;
    }

    const newFilePath = filePath.replace(/\.js$/, '.ts');

    await fs.rename(filePath, newFilePath);
    console.log(`✅ File converted successfully from ${filePath} to ${newFilePath}`);
  } catch (err) {
    console.error(`⚠️ Error converting file: ${err.message}`);
  }
};

const saveFileContent = async (filePath, content) => {
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`✅ File saved successfully to ${filePath}`);
  } catch (err) {
    console.error(`⚠️ Error saving file: ${err.message}`);
  }
};

try {
  const { stdout, stderr } = await execAsync(command);

  if (stderr) {
    console.error(`⚠️ Error output: ${stderr}`);
  }

  console.log('✅ Msw handler was successfully created.');

  await removeUnnecessaryFiles();

  await convertToTs(path.resolve(__dirname, '../msw/browser.js'));
  await convertToTs(path.resolve(__dirname, '../msw/node.js'));

  const handlerFileContent = await fs.readFile(
    path.resolve(__dirname, '../msw/handlers.js'),
    'utf-8'
  );

  const updatedContent = handlerFileContent
    .replaceAll(
      '...resultArray[next() % resultArray.length]',
      '...responseSelector(request, resultArray)'
    )
    .replaceAll('async () => {', 'async ({ request }) => {')
    .replaceAll(
      "import { faker } from '@faker-js/faker';",
      "import { faker } from '@faker-js/faker';\n" +
        "import { responseSelector } from '~/msw/utils/response';"
    )
    .replaceAll(
      'let i = 0;\n' +
        'const next = () => {\n' +
        '  if (i === Number.MAX_SAFE_INTEGER - 1) {\n' +
        '    i = 0;\n' +
        '  }\n' +
        '  return i++;\n' +
        '};\n\n',
      ''
    );

  await saveFileContent(path.resolve(__dirname, '../msw/handlers.js'), updatedContent);
} catch (err) {
  console.error(`⚠️ Error executing script: ${err.message}`);
}
