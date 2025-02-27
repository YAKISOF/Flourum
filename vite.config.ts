import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
        hmr: {
            port: 5173, // Убедитесь, что порт совпадает с основным
            host: 'localhost', // Убедитесь, что используется правильный хост
        },
    },
    build: {
        outDir: 'dist',
    },
});