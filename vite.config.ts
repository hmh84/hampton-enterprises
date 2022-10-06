import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        server: {
            port: !!env.CLIENT_PORT ? Number(env.CLIENT_PORT) : undefined,
            strictPort: true,
            https: true,
            proxy: {
                '/api': {
                    secure: env.ENVIRONMENT === 'PRODUCTION',
                    target: `http://localhost:${env.SERVER_PORT}`,
                    ws: true,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        plugins: [
            react(),
            tsconfigPaths(),
            mkcert(),
            svgrPlugin({
                svgrOptions: {
                    icon: true,
                },
            }),
        ],
    };
});
