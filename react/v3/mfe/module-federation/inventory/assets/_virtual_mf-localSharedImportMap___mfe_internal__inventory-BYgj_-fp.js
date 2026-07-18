import { _ as __vitePreload } from './preload-helper-D00R3Sny.js';


const importMap = {
      
        "react": async () => {
          let pkg = await __vitePreload(() => import('./_virtual_mf___mfe_internal__inventory__loadShare__react__loadShare__.js-CMbQQlkX.js').then(n => n.p),true              ?[]:void 0);
            return pkg;
        }
      ,
        "react-dom": async () => {
          let pkg = await __vitePreload(() => import('./_virtual_mf___mfe_internal__inventory__loadShare__react_mf_2_dom__loadShare__.js-D9KS16vq.js').then(n => n.c),true              ?[]:void 0);
            return pkg;
        }
      ,
        "react/jsx-runtime": async () => {
          let pkg = await __vitePreload(() => import('./_virtual_mf___mfe_internal__inventory__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.js-DGw0ZAHT.js').then(n => n.c),true              ?[]:void 0);
            return pkg;
        }
      
    };
      const usedShared = {
      
          "react": {
            name: "react",
            version: "19.2.7",
            scope: ["default"],
            loaded: false,
            from: "inventory",
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
            from: "inventory",
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
            from: "inventory",
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
