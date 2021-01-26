const initialState = {
  shoes: [],
  loading: false,
  svgs: null,
  svgsLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, shoes: action.payload };
    case "FETCH_DATA_LOADING":
      return { ...state, loading: action.payload };
    case "FETCH_SVG":
      console.log(action.payload);
      return { ...state, svgs: action.payload };
    case "FETCH_SVG_LOADING":
      return { ...state, svgsLoading: action.payload };
    default:
      return state;
  }
}
