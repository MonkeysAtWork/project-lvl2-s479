import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('JSON', () => {
  const pathToFile1 = path.join(__dirname, '/__fixtures__/json/before.json');
  const pathToFile2 = path.join(__dirname, '/__fixtures__/json/after.json');
  const pathToResult = path.join(__dirname, '/__fixtures__/result.txt');
  const result = fs.readFileSync(pathToResult, 'utf8');
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(result);
});

test('YAML', () => {
  const pathToFile1 = path.join(__dirname, '/__fixtures__/yaml/before.yml');
  const pathToFile2 = path.join(__dirname, '/__fixtures__/yaml/after.yml');
  const pathToResult = path.join(__dirname, '/__fixtures__/result.txt');
  const result = fs.readFileSync(pathToResult, 'utf8');
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(result);
});
