/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    {
      name: 'load+transform-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) {
          return null;
        }

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic', // 👈 this is important
        });
      },
    },
  ],
  resolve: {
    alias: {
      src: '/src',
    },
  },
  // Workaround before renaming .js to .jsx
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },

  // server: {
  //   port: 80,
  // },
  // End workaround
});
