import { setSort } from "../redux/actions";

export const setSortColumn = (col, mode, dispatch, sortCol) => {
  if (sortCol.by === col) {
    dispatch(setSort({ mode: mode, sort: { by: col, cres: !sortCol.cres } }));
  } else {
    dispatch(setSort({ mode: mode, sort: { by: col, cres: true } }));
  }
};
