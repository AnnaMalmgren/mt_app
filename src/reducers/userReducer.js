export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return addUser(action.payload, state)

    case 'ADD_USERS':
      return addUsers(action.payload, state)

    case 'ACTIVE_USER':
      return { ...state, activeUser: action.payload }

    case 'RESET_ACTIVE_USER':
      return { ...state, activeUser: null }

    default:
      return { ...state }
  }
}

/**
 * Adds given users to the state
 * @param {[{name: String, score: Number}]} payload
 * @param {{activeUser: Number, userData: [{_id: Number, name: String}],
 * scoreData: [{userId: Number, score: Number}]}} state
 * @returns the updated state
 */
const addUsers = (payload, state) => {
  let currentState = { ...state }
  payload.map((user) => (currentState = addUser(user, currentState)))
  return currentState
}

/**
 * Adds given user to the state
 * @param {{name: String, score: Number}} user
 * @param {{activeUser: Number,
 *          userData: [{_id: Number, name: String}],
 *          scoreData: [{userId: Number, score: Number}]}} state
 * @returns the updated state
 */
const addUser = (user, state) => {
  let currentUser = exists(user, state.userData)
  return currentUser
    ? updateUser(user, currentUser._id, state)
    : addNewUser(user, state)
}

/**
 * Adds new user to the state
 * @param {{ name: String, score: Number }} payload
 * @param {{activeUser: Number,
 *          userData: [{_id: Number, name: String}],
 *          scoreData: [{userId: Number, score: Number}]}} state
 * @returns the updated state
 */
const addNewUser = (payload, state) => {
  const id = generateUserId(state.userData)

  return {
    ...state,
    userData: [...state.userData, { _id: id, name: payload.name }],
    scoreData: [...state.scoreData, { userId: id, score: payload.score }],
  }
}

/**
 * Updates given user's score state
 * @param {{name: String, score: Number}} payload
 * @param {Number} userId
 * @param {{activeUser: Number,
 *          userData: [{_id: Number, name: String}],
 *          scoreData: [{userId: Number, score: Number}]}} state
 * @returns the updated state
 */
const updateUser = (payload, userId, state) => {
  return {
    ...state,
    scoreData: [...state.scoreData, { userId: userId, score: payload.score }],
  }
}

/**
 * Checks if username already exists and returns user object if found,
 * else undefined.
 * @param {{name: String, score: Number}} newUser
 * @param {[{_id: Number, name: String}]} users
 * @returns {{_id: Number, name: String} | undefined}
 */
const exists = (newUser, users) =>
  users.find((user) => user.name === newUser.name)

/**
 * Generates a user id based on the length of the state's
 * userData array.
 * @param {[{_id: Number, name: String}]} users
 * @returns {Number} the generated id
 */
const generateUserId = (users) => {
  return users.length + 1
}
