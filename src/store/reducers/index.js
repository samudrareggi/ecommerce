const initialState = {
  shoes: [],
  loading: false,
  bags: [],
  bagsLoading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, shoes: action.payload };
    case "FETCH_DATA_LOADING":
      return { ...state, loading: action.payload };
    case "ADD_BAG":
      const newBag = state.bags.concat(action.payload);
      return { ...state, bags: newBag };
    case "DELETE_BAG":
      const updatedBag = state.bags.filter(bag => (bag.name !== action.payload));
      return { ...state, bags: updatedBag };
    case "SET_BAG_LOADING":
      return { ...state, bagsLoading: action.payload };
    default:
      return state;
  }
}
