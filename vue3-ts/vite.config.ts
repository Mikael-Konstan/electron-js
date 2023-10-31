import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base: 'D:/study/my-electron-app/vue3/dist/', // 打包后静态文件引用域名
  server: {
    port: 9527,
  },
  plugins: [vue()]
})
