import renderRecursive from './recursive';
import renderPlain from './plain';


const renderers = {
  recursive: renderRecursive,
  plain: renderPlain,
  json: JSON.stringify,
};


export default (format) => renderers[format];
