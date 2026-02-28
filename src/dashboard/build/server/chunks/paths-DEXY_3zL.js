let base = "";
let assets = base;
const app_dir = "_app";
const initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}

export { app_dir as a, base as b, assets as c, override as o, reset as r };
//# sourceMappingURL=paths-DEXY_3zL.js.map
