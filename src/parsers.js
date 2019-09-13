import YAML from 'yaml';

const parsers = {
  json: JSON.parse,
  yml: YAML.parse,
};

export default (format) => parsers[format];
