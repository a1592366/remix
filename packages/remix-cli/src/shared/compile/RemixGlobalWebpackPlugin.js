const keys = Object.keys;
const mark = 'MARK_' + (new Date - 0);

const isJavaScript = (name) => /(\.js|\/.jsx)$/g.test(name);
const hasMarked = source => source.indexOf(mark) > -1;


const polyfill = (source) => {
  `/*** ${mark} WeChat GlobalWindow ***/ var window = Object.__GlobalWindow__ || (Object.__GlobalWindow__ = {}); /*** WeChat globalWindow ***/ ${source.replace('var installedModules = {}', 'var installedModules = window.installedModules || (window.installedModules = {})')}`;
}

class RemixGlobalWebpackPlugin {
  replace (assets) {
    
    keys(assets).forEach(name => {
      const asset = assets[name];
      const source = asset.source();

      if (
        isJavaScript(name) && 
        !hasMarked(source)
      ) {
        asset.source = polyfill(source);
      }
    });

    return assets;
  }

  apply (compiler) {
    compiler.hooks.afterCompile.tap('RemixGlobalWebpackPlugin', (compilation, callback) => {
      
      compilation.assets = this.replace(compilation.assets);
    });

    compiler.hooks.emit.tapAsync('RemixGlobalWebpackPlugin', (compilation, callback) => {
      compilation.assets = this.replace(compilation.assets);
      callback();
    });
  }
}

module.exports = RemixGlobalWebpackPlugin;