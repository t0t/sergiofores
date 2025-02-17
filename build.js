import { promises as fs } from 'fs';
import { compile } from 'pug';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pages = ['index', 'dev', 'lab', 'obra', 'vision'];

async function compilePugToHtml() {
  for (const page of pages) {
    try {
      const pugFile = await fs.readFile(`${__dirname}/${page}.pug`, 'utf8');
      const fn = compile(pugFile, { 
        filename: `${page}.pug`, 
        pretty: true,
        basedir: __dirname,
        filters: {
          'script-module': function(text) {
            return `<script type="module">${text}</script>`;
          }
        }
      });
      const html = fn({
        basedir: __dirname,
        page
      });

      // Reemplazar rutas de scripts y assets
      const processedHtml = html
        .replace(/src="\.?\/js\//g, 'src="./js/')
        .replace(/src="\.?\/assets\//g, 'src="./assets/')
        .replace(/background-image: url\(\.?\/assets\//g, 'background-image: url(./assets/')
        .replace(/<script([^>]*?)>\s*<\/script>/g, (match, attrs) => {
          // Si ya tiene type="module", no lo duplicamos
          if (attrs.includes('type="module"')) {
            return match;
          }
          return match.replace('<script', '<script type="module"');
        });

      await fs.writeFile(`${__dirname}/${page}.html`, processedHtml);
      console.log(`Compiled ${page}.pug to ${page}.html`);
    } catch (err) {
      console.error(`Error compiling ${page}.pug:`, err);
    }
  }
}

compilePugToHtml();
