import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//解决@问题
import path from 'path'
//解决require问题
import requireTransform from 'vite-plugin-require-transform';

export default defineConfig({
  plugins: [
    vue(),
    requireTransform({
      fileRegex: /.js$|.vue$/
    }),
  ],
  define: {
    'process.env': {},
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
