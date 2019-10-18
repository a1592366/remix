const { getOwnPropertyNames: getPropertyKeys } = Object;
const mark = 'MARK_' + (new Date - 0);

const isJavaScript = (name) => /(\.js|\/.jsx)$/g.test(name);
const isMarked = source => source.indexOf(mark) > -1;

module.exports = class {
  replace (assets) {
    const keys = getPropertyKeys(assets);
    
    keys.forEach(name => {
      const asset = assets[name];
      const source = asset.source();

      if (isJavaScript(name) && !isMarked(source)) {
        asset.source = function () {
          return `/*** ${mark} WeChat globalWindow ***/ var window = Object.__globalWindow__ || (Object.__globalWindow__ = {}); /*** WeChat globalWindow ***/ ${source.replace('var installedModules = {}', 'var installedModules = window.installedModules || (window.installedModules = {})')}`;
        }
      }
    });

    return assets;
  }

  apply (compiler) {
    compiler.hooks.afterCompile.tap('RemixJSPlugin', (compilation, callback) => {
      
      compilation.assets = this.replace(compilation.assets);
    });

    compiler.hooks.emit.tapAsync('RemixJSPlugin', (compilation, callback) => {
      compilation.assets = this.replace(compilation.assets);
      callback();
    });
  }
}