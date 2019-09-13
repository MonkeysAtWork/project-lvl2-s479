import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const makePathToFile = (pathFromDirToFile) => path.join(__dirname, pathFromDirToFile);

const jsonPath = [makePathToFile('/__fixtures__/json/before.json'),
  makePathToFile('/__fixtures__/json/after.json')];
const yamlPath = [makePathToFile('/__fixtures__/yaml/before.yml'),
  makePathToFile('/__fixtures__/yaml/after.yml')];
const iniPath = [makePathToFile('/__fixtures__/ini/before.ini'),
  makePathToFile('/__fixtures__/ini/after.ini')];
const pathToResult = makePathToFile('/__fixtures__/result.txt');

const result = fs.readFileSync(pathToResult, 'utf8');


test.each([jsonPath, yamlPath, iniPath])('flat %#', (pathToFile1, pathToFile2) => {
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(result);
});
