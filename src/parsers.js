import YAML from 'yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: YAML.parse,
  ini: ini.parse,
};

export default (format) => parsers[format];
