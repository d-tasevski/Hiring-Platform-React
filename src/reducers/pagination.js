const paginationReducerDefaultState = {
  page: 1,
  current: '',
  last: '',
  limit: 6,
};

const paginationReducer = (state = paginationReducerDefaultState, action) => {
  switch (action.type) {
  case 'PAGINATE_NEXT':
    return { ...state, page: action.page };
  case 'PAGINATE_BACK':
    return { ...action.persons, page: action.page };
  default:
    return state;
  }
};

export default paginationReducer;
