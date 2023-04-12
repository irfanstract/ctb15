import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') },
      { find: 'dist', replacement: path.resolve(__dirname, 'dist'), },
      { find: ('public'  ), replacement: path.resolve(__dirname, ('public'  ), ), },
      { find: ('share'   ), replacement: path.resolve(__dirname, ('share'   ), ), },
      { find: 'node_modules', replacement: path.resolve(__dirname, 'node_modules') },
      { find: '.node_modules', replacement: path.resolve(__dirname, '.node_modules') },
    ],
  },
  worker: {
    format: "iife" ,
    rollupOptions: {
      output: {
        format: "iife" ,
      } ,
    } ,
  } ,
  // server: {} ,
})
