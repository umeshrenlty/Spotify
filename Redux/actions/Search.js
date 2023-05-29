const {get_Search_Result, set_Search_Result} = require('../constant');
export const getSearchResult = () => {
  return {
    type: get_Search_Result,
  };
};
export const setSearchResult = data => {
  return {
    type: set_Search_Result,
    data,
  };
};
