import {set_Category_Playlists} from '../constant';
const initialState = {catData: []};
const browseData = (state = initialState, action) => {
  const items = action.data?.categories?.items;
  console.log(items);
  switch (action.type) {
    case set_Category_Playlists:
      console.log(items, 1344);
      return {
        ...state,
        catData: items,
      };
    default:
      return state;
  }
};
export default browseData;
