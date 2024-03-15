export const usePagination = (page: number) => {
  const size = 100;
  const limit = size ? +size + 1 : 3;

  const from = page ? page * limit : 0;
  const to = page ? from + size : size;

  return { from, to };
};