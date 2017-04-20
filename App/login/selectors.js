import { createSelector } from 'reselect'
import { NAME } from './constants'

const _getUserInfo = (state) => {
  var userInfo = {
    email: state[NAME].email,
    id: state[NAME].id
  }
  return userInfo
}
export const getUserId = createSelector(
  [ (state) => state[NAME].id ],
  (id) => id
)

export const getUserInfo = createSelector(
  [_getUserInfo],
  (userInfo) => userInfo
)
