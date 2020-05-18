export const createReducer = (initialState, functionMap) => {
  return (state = initialState, {type, payLoad}) => {
    const handler = functionMap[type];
    return handler ? handler(state, payLoad) : state;
  }
}