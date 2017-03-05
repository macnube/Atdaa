export const getFilters = (state) => {
  var result = []
  for (var i = 0; i < 4; i++) {
    if (state.toolbarIcons[i].id !== 0) {
      result.push(state.toolbarIcons[i])
    }
  }
  return result
}

export const getTrashState = (state) => {
  return state.showingTrash
}
