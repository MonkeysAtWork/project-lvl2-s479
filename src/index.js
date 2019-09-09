import commander from 'commander';

export default function () {
  commander
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output the version number')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(firstConfig);
      console.log(secondConfig);
    });

  commander.parse(process.argv);
}
