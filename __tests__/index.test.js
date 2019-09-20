import fs from 'fs';
import path from 'path';

import genDiff from '../src';

const makePathToFile = (pathFromDirToFile) => path.join(__dirname, pathFromDirToFile);
const genPathToFiles = (format, folder = 'flat') => [makePathToFile(`/__fixtures__/${folder}/before.${format}`),
  makePathToFile(`/__fixtures__/${folder}/after.${format}`)];
const getResult = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');


describe('flat', () => {
  const pathToFlatExpects = [genPathToFiles('json'), genPathToFiles('yml'), genPathToFiles('ini')];

  describe.each(pathToFlatExpects)('simple', (pathToFile1, pathToFile2) => {
    test(path.extname(pathToFile1), () => {
      const pathToFlatResult = makePathToFile('/__fixtures__/flat/result.txt');
      const result = getResult(pathToFlatResult);
      expect(genDiff(pathToFile1, pathToFile2, 'recursive')).toEqual(result);
    });
  });
});

describe('tree', () => {
  const pathToTreeExpects = [genPathToFiles('json', 'tree'), genPathToFiles('yml', 'tree'), genPathToFiles('ini', 'tree')];

  describe.each(pathToTreeExpects)('recursive', (pathToFile1, pathToFile2) => {
    test(path.extname(pathToFile1), () => {
      const pathToTreeResult = makePathToFile('/__fixtures__/tree/result.txt');
      const result = getResult(pathToTreeResult);
      expect(genDiff(pathToFile1, pathToFile2, 'recursive')).toEqual(result);
    });
  });

  describe.each(pathToTreeExpects)('plain', (pathToFile1, pathToFile2) => {
    test(path.extname(pathToFile1), () => {
      const pathToTreeResult = makePathToFile('/__fixtures__/tree/plain_result.txt');
      const result = getResult(pathToTreeResult);
      expect(genDiff(pathToFile1, pathToFile2, 'plain')).toEqual(result);
    });
  });
});
