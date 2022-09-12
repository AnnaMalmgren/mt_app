/**
 * Caclulates and returns max score for every given user.
 *
 * @param {[{_id: number, name: string}]} users
 * @param {[{userId: number, score: number}]} scores
 * @returns {[{_id: number, name: string, score: number}]} Array with users and their max score,
 * ordered descending based on the scores.
 */
export const getTopScores = (users, scores) =>
  users
    .map((user) => getMaxScore(user, scores))
    .sort((userA, userB) => userB.score - userA.score)

/**
 * Gets all scores for given user.
 * @param {number} userId id of the user
 * @param {[{userId: number, score: number}]} scores
 * @returns {[number]} Scores for given user, ordered descending.
 */
export const getUserScores = (userId, scores) =>
  scores
    .reduce(
      (acc, curr) => (idMatch(curr, userId) ? [...acc, curr.score] : acc),
      []
    )
    .sort((scoreA, scoreB) => scoreB - scoreA)

/**
 * Gets the name of the user with the given id.
 * @param {number} id
 * @param {[{_id: number, name: string}]} users
 * @returns {string | null} Name of the user, null if no user was found.
 */
export const getUserName = (id, users) => {
  const user = users.find((user) => user._id === id)
  return user ? user.name : null
}

/**
 * Help function to get the max score of the given user.
 * @param {{_id: number, name: string}} user
 * @param {[{userId: number, score: number}]} scores
 * @returns {{_id: number, name: string, score: number}} user object with
 * the user's max score.
 */
const getMaxScore = (user, scores) => ({
  ...user,
  score: scores.reduce(
    (max, current) =>
      idMatch(current, user._id) ? getMax(max, current.score) : max,
    0
  ),
})

/**
 * Check if the given score object's userId is equal to the given userId.
 * @param {{userId: number, score: number}} score
 * @param {number} userId
 * @returns {boolean}
 */
const idMatch = (score, userId) => score.userId === userId

/**
 * Compares the given values and returns the greater of them.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const getMax = (a, b) => (a > b ? a : b)
