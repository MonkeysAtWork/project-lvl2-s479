import fs from 'fs';
import path from 'path';

import getParser from './parsers';
import buildAst from './astBuilder';
import getFormatter from './formatters';


const getDataFromFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath).substr(1);
  const parse = getParser(ext);

  return parse(content);
};

export default (pathToFile1, pathToFile2, format) => {
  const data1 = getDataFromFile(pathToFile1);
  const data2 = getDataFromFile(pathToFile2);

  const ast = buildAst(data1, data2);
  const render = getFormatter(format);

  return render(ast);
};
