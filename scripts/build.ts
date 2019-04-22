import {resolve, dirname, relative} from 'path';
import {sync as glob} from 'glob';
import exec = require('execa');
import {mkdirp, writeFile} from 'fs-extra';

import {transformFileAsync} from '@babel/core';

(async () => {
  const packages = glob(resolve(__dirname, '../packages/*'));
  // await buildTypings();

  for (const packageDirectory of packages) {
    await buildESNext(packageDirectory);
  }
})();

async function buildTypings() {
  const ts = dirname(require.resolve('typescript/package.json'));
  const tsc = require('typescript/package.json').bin.tsc;
  await exec(resolve(ts, tsc), ['--build'], {stdio: 'inherit'});
}

async function buildESNext(packageDirectory: string) {
  const buildDirectory = resolve(packageDirectory, '__build__/esnext');
  const sourceDirectory = resolve(packageDirectory, 'src');

  const sourceFiles = glob(resolve(packageDirectory, 'src/**/*'), {
    nodir: true,
    ignore: ['**/*.test.tsx?'],
  });

  for (const sourceFile of sourceFiles) {
    const relativePath = relative(sourceDirectory, sourceFile);
    const targetPath = resolve(buildDirectory, relativePath.replace(/\.tsx?$/, '.js'));

    console.log(`Writing ${sourceFile} to ${targetPath}`);

    await mkdirp(dirname(targetPath));

    const content = await transformFileAsync(sourceFile, {
      babelrc: false,
      presets: [
        '@babel/preset-typescript',
        'babel-preset-shopify/react',
        ['babel-preset-shopify/node', {modules: false}],
      ],
    });

    if (content == null || content.code == null) {
      throw new Error('Compile failed');
    }

    await writeFile(targetPath, content.code);
  }
}
