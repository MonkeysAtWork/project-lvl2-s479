import renderRecursive from './formatters/recursive';
import renderPlain from './formatters/plain';

const renderers = {
  recursive: renderRecursive,
  plain: renderPlain,
};

export default (format) => renderers[format];
