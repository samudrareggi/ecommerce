export function FetchProducts() {
  return (dispatch) => {
    dispatch({
      type: "FETCH_DATA_LOADING",
      payload: true,
    });
    fetch("https://my-json-server.typicode.com/megasuartika/fe-assignment/db")
      .then((res) => res.json())
      .then(({ shoes }) => {
        dispatch({
          type: "FETCH_DATA",
          payload: shoes,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "FETCH_DATA_LOADING",
          payload: false,
        });
      });
  };
}
