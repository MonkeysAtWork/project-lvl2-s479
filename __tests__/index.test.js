import fs from 'fs';
import path from 'path';

import genDiff from '../src';

const makePathToFile = (pathFromDirToFile) => path.join(__dirname, pathFromDirToFile);
const genPathToFiles = (format, folder = 'flat') => [makePathToFile(`/__fixtures__/${folder}/before.${format}`),
  makePathToFile(`/__fixtures__/${folder}/after.${format}`)];
const getResult = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');


describe('genDiff1', () => {
  const pathToFlatResult = makePathToFile('/__fixtures__/flat/result.txt');
  const pathToFlatExpects = [genPathToFiles('json'), genPathToFiles('yml'), genPathToFiles('ini')];
  const result = getResult(pathToFlatResult);

  describe.each(pathToFlatExpects)('flat', (pathToFile1, pathToFile2) => {
    test(path.extname(pathToFile1), () => {
      expect(genDiff(pathToFile1, pathToFile2)).toEqual(result);
    });
  });
});

describe('genDiff2', () => {
  const pathToTreeResult = makePathToFile('/__fixtures__/tree/result.txt');
  const pathToTreeExpects = [genPathToFiles('json', 'tree'), genPathToFiles('yml', 'tree'), genPathToFiles('ini', 'tree')];
  const result = getResult(pathToTreeResult);

  describe.each(pathToTreeExpects)('tree', (pathToFile1, pathToFile2) => {
    test(path.extname(pathToFile1), () => {
      expect(genDiff(pathToFile1, pathToFile2)).toEqual(result);
    });
  });
});
