const { getOwnPropertyNames: getPropertyKeys } = Object;

module.exports = class {
  replace (assets) {
    const keys = getPropertyKeys(assets);
    
    keys.forEach(name => {
      const asset = assets[name];
      const source = asset.source();

      if (/.js$/g.test(name)) {
        asset.source = function () {
          return `
            /*** WeChat globalWindow ***/ 
              var window = Object.__globalWindow__ || (Object.__globalWindow__ = {});  
            /*** WeChat globalWindow ***/ 
            ${source}
          `;
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