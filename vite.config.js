import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'api-admin-save',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/admin/save' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const { filename, data } = JSON.parse(body);
                const filePath = path.resolve(__dirname, 'src/data', filename);
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, message: `File ${filename} updated successfully` }));
              } catch (error) {
                console.error('Error saving data:', error);
                res.statusCode = 500;
                res.end(JSON.stringify({ success: false, message: error.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
})
