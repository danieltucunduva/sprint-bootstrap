
/**
 * @swagger
 * /api/token/
 *   get:
 *     tags:
 *      - tokens
 *     parameters:
 *       - name: user
 *         description: User
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *     description: Deletes all data concerning a user
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *             data:
 *               type: number
 *             message:
 *               type: string
 *       400:
 *         description: bad request
 */
exports.getToken = async function (req, res) {
  const username = req.get('username')
  const password = req.get('password')
  const tokenUsername = process.env.TOKEN_USERNAME
  const tokenPassword = process.env.TOKEN_PASSWORD

  if (tokenUsername && tokenPassword && username === tokenUsername && password === tokenPassword) {
    return res.status(200).json({
      status: 200,
      data: process.env.TOKEN,
      message: 'Success: authorization token retrieved'
    })
  }
  return res.status(400).json({
    status: 400,
    message: 'Invalid username or password'
  })
}
