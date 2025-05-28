const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 查找所有 TypeScript 和 Vue 文件
const files = glob.sync('src/**/*.{ts,vue}');

// 计数器
let updatedCount = 0;

// 遍历并更新每个文件
files.forEach(file => {
  // 读取文件内容
  const content = fs.readFileSync(file, 'utf8');
  
  // 替换导入路径
  const updatedContent = content
    .replace(/from ['"]@my-component\/utils['"]/g, 'from \'@utils\'')
    .replace(/from ['"]@my-component\/utils\/with-install['"]/g, 'from \'@utils/with-install\'')
    .replace(/from ['"]@my-component\/icon['"]/g, 'from \'@components/icon\'')
    .replace(/from ['"]@my-component['"]/g, 'from \'@\'');
  
  // 如果内容有变化，写回文件
  if (content !== updatedContent) {
    fs.writeFileSync(file, updatedContent, 'utf8');
    console.log(`Updated: ${file}`);
    updatedCount++;
  }
});

console.log(`\nTotal files updated: ${updatedCount}`); 