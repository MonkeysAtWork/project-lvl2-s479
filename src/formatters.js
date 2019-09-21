import renderRecursive from './formatters/recursive';
import renderPlain from './formatters/plain';

const renderers = {
  recursive: renderRecursive,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (format) => renderers[format];
