const { ESLint } = require('eslint')

const commands = {
  // ESLint's configuration makes it ignore built files in `dist` or `packages/city-frontend/dist`
  // that we want left alone, as well as the polyfills.
  // The glob used by lint-staged to trigger the linting on commit isn't aware
  // of that ignore list, so will ask ESLint to lint those files.
  // This makes ESLint raise a warning for these files, which errors the linting
  // because we use `--max-warnings 0`.
  // To avoid that, we need to filter out files ignored by ESLint,
  // as recommended by lint-staged.
  //
  // https://github.com/okonet/lint-staged#how-can-i-ignore-files-from-eslintignore
  eslint: filterTask('npm run lint:js:cli -- --fix'),
  prettier: 'npm run lint:prettier:cli -- --write',
  stylelint: 'npm run lint:scss:cli -- --fix --allow-empty-input'
}

module.exports = {
  '*.{cjs,js,mjs}': [commands.eslint, commands.prettier],
  '*.{json,yaml,yml}': commands.prettier,
  '*.md': [commands.eslint, commands.stylelint, commands.prettier],
  '*.scss': [commands.stylelint, commands.prettier]
}

// Configure paths to ignore
const eslint = new ESLint()

/**
 * Removes files ignored by ESLint from a list of files provided by lint-staged
 *
 * @param {string} task - The task `lint-staged` wants to execute
 * @returns {Promise<(paths: string[]) => string[]>} Tasks to run with files argument
 */
function filterTask(task) {
  return async (files) => {
    const isIgnored = await Promise.all(
      files.map((file) => eslint.isPathIgnored(file))
    )

    // Wrap files in quotes in case they contains a space
    const paths = files
      .filter((_, i) => !isIgnored[i])
      .map((file) => `"${file}"`)

    return paths.length ? [`${task} ${paths.join(' ')}`] : []
  }
}
