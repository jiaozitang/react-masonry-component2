import fs from "fs";
import path from "path";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export function walkEntryFiles(entry) {
  const stack = [entry];
  const fileNames = [];

  while (stack.length > 0) {
    const name = stack.shift();
    if (fs.statSync(name).isDirectory()) {
      const dirPath = fs.readdirSync(name).map((item) => {
        return path.join(name, item);
      });
      stack.push(...dirPath);
      continue;
    }

    // extensions
    if (
      extensions.includes(path.extname(name)) &&
      !/styles\/design-system/.test(name) &&
      !/.(stories|spec|test).(j|t)sx?/.test(name)
    ) {
      fileNames.push(name);
    }
  }

  return fileNames;
}
