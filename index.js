var riot = require('riot-compiler'),
    loaderUtils = require('loader-utils'),
    progeny = require('progeny'),
    REQUIRE_RIOT = 'var riot = require("riot");\n\n';

module.exports = function (source) {

  var content = source;
  var options = loaderUtils.parseQuery(this.query);

  if (this.cacheable) this.cacheable();

  Object.keys(options).forEach(function(key) {
    switch(options[key]) {
      case 'true':
        options[key] = true;
        break;
      case 'false':
        options[key] = false;
        break;
      case 'undefined':
        options[key] = undefined;
        break;
      case 'null':
        options[key] = null;
        break;
    }
  });

  try {
    var loader = this;
    var dependencies = progeny.Sync()(loader.resourcePath, source);
    dependencies.forEach(function(file) {
      loader.addDependency(file);
    });
    return REQUIRE_RIOT + riot.compile(content, options, loader.resourcePath);
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    } else {
      throw new Error(e);
    }
  }
};
