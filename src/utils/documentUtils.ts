const locationSearchToObject = () => {
  const search = location.search.substring(1);
  return JSON.parse(
    '{"' +
      decodeURI(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

const DocumentUtils = {
  locationSearchToObject
};

export default DocumentUtils;
