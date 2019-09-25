import fs from 'fs';
import path from 'path';

import getParser from './parsers';
import buildAst from './astBuilder';
import getFormatter from './formatters';


const getDataFromFile = (filePath, fileContent) => {
  const ext = path.extname(filePath).substr(1);
  const parse = getParser(ext);

  return parse(fileContent);
};


export default (filePath1, filePath2, format) => {
  const fileContent1 = fs.readFileSync(filePath1, 'utf8');
  const fileContent2 = fs.readFileSync(filePath2, 'utf8');

  const data1 = getDataFromFile(filePath1, fileContent1);
  const data2 = getDataFromFile(filePath2, fileContent2);

  const ast = buildAst(data1, data2);
  const render = getFormatter(format);

  return render(ast);
};
