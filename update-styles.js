const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 查找所有Vue组件文件
const files = glob.sync('src/components/**/*.vue');

// 计数器
let updatedCount = 0;

// 遍历并更新每个文件
files.forEach(file => {
  // 读取文件内容
  const content = fs.readFileSync(file, 'utf8');
  
  // 替换相对路径引用为别名引用
  const updatedContent = content
    .replace(/@import\s+['"]\.\.\/\.\.\/styles\/mixins\.scss['"];/g, '@import \'@styles/mixins.scss\';')
    .replace(/@import\s+['"]\.\.\/\.\.\/\.\.\/styles\/mixins\.scss['"];/g, '@import \'@styles/mixins.scss\';');
  
  // 如果内容有变化，写回文件
  if (content !== updatedContent) {
    fs.writeFileSync(file, updatedContent, 'utf8');
    console.log(`Updated: ${file}`);
    updatedCount++;
  }
});

console.log(`\nTotal files updated: ${updatedCount}`); 