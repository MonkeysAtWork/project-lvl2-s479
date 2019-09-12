import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('genDiff', () => {
  const pathToFile1 = path.join(__dirname, '/__fixtures__/before.json');
  const pathToFile2 = path.join(__dirname, '/__fixtures__/after.json');
  const pathToResult = path.join(__dirname, '/__fixtures__/result.txt');
  const result = fs.readFileSync(pathToResult, 'utf8');
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(result);
});
