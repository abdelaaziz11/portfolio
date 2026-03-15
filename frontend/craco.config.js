const path = require("path");

module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            // 1. Change the entry point to index.js in the root of the frontend folder
            paths.appIndexJs = path.resolve(__dirname, 'index.js');
            webpackConfig.entry = path.resolve(__dirname, 'index.js');

            // 2. Remove ModuleScopePlugin so we can import files outside of the src folder
            const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
                ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
            );
            if (scopePluginIndex > -1) {
                webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
            }

            // 3. Update the Babel loader rule to include the frontend root directory
            const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
            if (oneOfRule) {
                const babelLoader = oneOfRule.oneOf.find(
                    (rule) => rule.loader && rule.loader.includes('babel-loader')
                );
                if (babelLoader) {
                    if (Array.isArray(babelLoader.include)) {
                        babelLoader.include.push(path.resolve(__dirname));
                    } else if (typeof babelLoader.include === 'string') {
                        babelLoader.include = [babelLoader.include, path.resolve(__dirname)];
                    } else {
                        babelLoader.include = [path.resolve(__dirname, 'src'), path.resolve(__dirname)];
                    }
                }
            }

            return webpackConfig;
        },
    },
};
