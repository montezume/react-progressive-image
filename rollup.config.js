import path from 'path';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete';
import pkg from './package.json';

const external = Object.keys(pkg.peerDependencies).map((dep) => dep);

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
    postcss({
      extract: path.resolve('dist/index.css'),
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.ts', '.tsx'],
    }),
  ],
};
