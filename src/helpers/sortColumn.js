export const sortColumn = (column, data) => {

  const { by, cres } = column;

  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }

  function ajustDate(date) {
    try {
      const [day, month, rest] = date.split('/');
      return [month, day, rest].join('/');

    } catch (error) {
      return 0;
    }
  }

  if (by === 'createdAt') {
    if (cres) return data.sort((a, b) =>
      toTimestamp(ajustDate(a[by])) - toTimestamp(ajustDate(b[by])));
    if (!cres) return data.sort((a, b) =>
      toTimestamp(ajustDate(b[by])) - toTimestamp(ajustDate(a[by])));
  }

  if (by === 'updates') {
    if (cres) return data.sort((a, b) =>
      toTimestamp(ajustDate(a[by][0] ? a[by][a[by].length - 1].createdAt : 0)) - toTimestamp(ajustDate(b[by][0] ? b[by][b[by].length - 1].createdAt : 0)));
    if (!cres) return data.sort((a, b) =>
      toTimestamp(ajustDate(b[by][0] ? b[by][b[by].length - 1].createdAt : 0)) - toTimestamp(ajustDate(a[by][0] ? a[by][a[by].length - 1].createdAt : 0)));
  }

  if (cres) return data.sort((a, b) => a[by].localeCompare(b[by]));
  if (!cres) return data.sort((a, b) => b[by].localeCompare(a[by]));

};
