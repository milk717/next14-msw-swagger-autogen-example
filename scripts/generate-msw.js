const { exec } = require('child_process');
const path = require('path');
const fs = require('fs/promises');

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

exec(command, async (error, stdout, stderr) => {
  if (error) {
    console.error(`⚠️ Error executing command: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`⚠️ Error output: ${stderr}`);
    return;
  }

  console.log('✅ Msw handler was successfully created.');

  try {
    await removeUnnecessaryFiles();

    await convertToTs(path.resolve(__dirname, '../msw/browser.js'));
    await convertToTs(path.resolve(__dirname, '../msw/node.js'));

    const handlerFileContent = await fs.readFile(
      path.resolve(__dirname, '../msw/handlers.js'),
      'utf-8'
    );

    await saveFileContent(
      path.resolve(__dirname, '../msw/handlers.js'),
      handlerFileContent
        .replaceAll(
          '...resultArray[next() % resultArray.length]',
          'responseSelector(request, resultArray)'
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
        )
    );
  } catch (err) {
    console.error(`⚠️ Error deleting file: ${err.message}`);
  }
});
