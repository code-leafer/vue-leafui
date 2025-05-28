import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'
import { fileURLToPath } from 'url'

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 使用console代替consola
const consola = {
  info: (msg: string) => console.log(`\x1b[36mInfo:\x1b[0m ${msg}`),
  success: (msg: string) => console.log(`\x1b[32mSuccess:\x1b[0m ${msg}`),
  error: (err: any) => console.error(`\x1b[31mError:\x1b[0m`, err)
}

// 使用fs模块代替fs-extra
const ensureDir = (dir: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

const writeFile = (file: string, data: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

const readFile = async (file: string): Promise<any> => {
  try {
    const content = await fs.promises.readFile(file, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    consola.error(`Error reading file ${file}: ${err}`);
    return {};
  }
}

const LANG_PREFIXES = {
  'zh-CN': '/',
  'en-US': '/en-US/',
}

const DOCS_DIR = path.resolve(__dirname, '../../')
const I18N_DIR = path.resolve(__dirname, '../i18n')

async function main() {
  consola.info('Start generating i18n files...')

  // Ensure i18n directory exists
  await ensureDir(I18N_DIR)

  // Generate index.json for each language
  for (const [lang, prefix] of Object.entries(LANG_PREFIXES)) {
    const langDir = path.join(I18N_DIR, lang)
    await ensureDir(langDir)
    
    // Generate translations
    const navFilePath = path.join(DOCS_DIR, '.vitepress', 'lang', lang, 'nav.json')
    const navLocale = await readFile(navFilePath)
    const pages = await getPages(prefix)
    
    const localeConfig = {
      lang,
      prefix,
      nav: navLocale,
      pages,
    }
    
    await writeFile(
      path.join(langDir, 'index.json'),
      JSON.stringify(localeConfig, null, 2)
    )
    
    consola.success(`Generated i18n file for ${lang}`)
  }
  
  consola.success('All i18n files generated!')
}

async function getPages(prefix: string) {
  const pages = await glob(['**/*.md'], {
    cwd: DOCS_DIR,
    ignore: ['node_modules', '.vitepress/i18n'],
  })
  
  return pages.map((page) => {
    const routePath = page
      .replace(/\.md$/, '')
      .replace(/index$/, '')
    
    return {
      path: prefix + routePath,
      routePath,
    }
  })
}

main().catch((err) => {
  consola.error(err)
  process.exit(1)
}) 