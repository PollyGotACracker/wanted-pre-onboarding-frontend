import { lazy } from "react";

const lazyLoader = (importFunc, minDelay = 300) =>
  lazy(() =>
    Promise.all([
      importFunc(),
      new Promise((resolve) => setTimeout(resolve, minDelay)),
    ]).then(([moduleExports]) => moduleExports)
  );

export default lazyLoader;
