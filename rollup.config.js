import path from 'path';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete';
import resolve from '@rollup/plugin-node-resolve';
import postcssNested from 'postcss-nested';
import pkg from './package.json';

const external = Object.keys(pkg.peerDependencies)
  .concat(Object.keys(pkg.dependencies))
  .map((dep) => dep);

export default {
  input: 'src/index.tsx',
  external: external,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    resolve({ extensions: ['.ts', '.js', '.tsx'] }),
    postcss({
      extract: path.resolve('dist/index.css'),
      plugins: [postcssNested()],
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.ts', '.tsx'],
    }),
  ],
};
