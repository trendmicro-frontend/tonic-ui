import { _ as __vitePreload } from './preload-helper-3GUi9osH.js';


const importMap = {
      
        "react": async () => {
          let pkg = await __vitePreload(() => import('./_virtual_mf___mfe_internal__widget_updates__loadShare__react__loadShare__.js-D6hxoBD0.js').then(n => n.m),true              ?[]:void 0);
            return pkg;
        }
      ,
        "react-dom": async () => {
          let pkg = await __vitePreload(() => import('./_virtual_mf___mfe_internal__widget_updates__loadShare__react_mf_2_dom__loadShare__.js-BzEa_IlA.js').then(n => n.a),true              ?[]:void 0);
            return pkg;
        }
      ,
        "react/jsx-runtime": async () => {
          let pkg = await __vitePreload(() => import('./_virtual_mf___mfe_internal__widget_updates__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.js-DJVUU5ri.js').then(n => n.b),true              ?[]:void 0);
            return pkg;
        }
      
    };
      const usedShared = {
      
          "react": {
            name: "react",
            version: "19.2.7",
            scope: ["default"],
            loaded: false,
            from: "widget_updates",
            async get () {
              usedShared["react"].loaded = true;
              const {"react": pkgDynamicImport} = importMap;
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.2.7",
              strictVersion: false,
              
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "19.2.7",
            scope: ["default"],
            loaded: false,
            from: "widget_updates",
            async get () {
              usedShared["react-dom"].loaded = true;
              const {"react-dom": pkgDynamicImport} = importMap;
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.2.7",
              strictVersion: false,
              
            }
          }
        ,
          "react/jsx-runtime": {
            name: "react/jsx-runtime",
            version: "19.2.7",
            scope: ["default"],
            loaded: false,
            from: "widget_updates",
            async get () {
              usedShared["react/jsx-runtime"].loaded = true;
              const {"react/jsx-runtime": pkgDynamicImport} = importMap;
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.2.7",
              strictVersion: false,
              
            }
          }
        
    };
      const usedRemotes = [
      ];

export { usedRemotes, usedShared };
