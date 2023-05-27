const {get_Category_Playlists, set_Category_Playlists} = require('../constant');

const getCategory = () => {
  return {
    type: get_Category_Playlists,
  };
};
const setCategory = data => {
  return {
    type: set_Category_Playlists,
    data,
  };
};
export default getCategory;
