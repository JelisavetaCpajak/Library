import * as actionTypes from "./actions";

const initialState = {
  books: [],
  currentBook: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BOOKS:
      //   let books = action.books;
      //   state.books = books;
      return {
        ...state,
        books: action.books,
      };

    case actionTypes.SET_CURRENT_BOOK:
      return {
        ...state,
        currentBook: action.currentBook,
      };

    default:
      return state;
  }
};

export default reducer;
