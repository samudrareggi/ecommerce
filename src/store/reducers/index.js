const initialState = {
  shoes: [],
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, shoes: action.payload };
    case "FETCH_DATA_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state
  }
}
