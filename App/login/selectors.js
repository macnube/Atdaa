export const getUserId = (state) => {
	return state.id
}

export const getUserInfo = (state) => {
	var userInfo = {
		email: state.email,
		id: state.id
	}
	return userInfo
}