import commander from 'commander';
import genDiff from '.';

export default function () {
  commander
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format', 'recursive')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(genDiff(firstConfig, secondConfig, commander.format));
    });

  commander.parse(process.argv);
}
