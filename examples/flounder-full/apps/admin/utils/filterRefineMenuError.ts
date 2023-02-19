export const filterRefineMenuError = () => {
  // why: https://github.com/pankod/refine/issues/1857
  const _error = console.error;

  const itemsWarning =
    '`children` will be removed in next major version. Please use `items` instead.';


  console.error = function (msg, ...args) {
    if (!`${msg}`.includes(itemsWarning)) {
      _error.apply(console, [msg, ...args]);
    }
  };
};
