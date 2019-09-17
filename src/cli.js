import commander from 'commander';
import genDiff from '.';

export default function () {
  commander
    .version('0.0.4')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output the version number')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(genDiff(firstConfig, secondConfig));
    });

  commander.parse(process.argv);
}
