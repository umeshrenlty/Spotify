const {get_Search_Result, set_Search_Result} = require('../constant');
export const getSearchResult = searchTerm => {
  return {
    type: get_Search_Result,
    searchTerm,
  };
};
export const setSearchResult = data => {
  return {
    type: set_Search_Result,
    data,
  };
};
