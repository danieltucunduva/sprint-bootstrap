
exports.getToken = async function (req, res) {
  const username = req.get('username')
  const password = req.get('password')
  const tokenUsername = process.env.TOKEN_USERNAME
  const tokenPassword = process.env.TOKEN_PASSWORD

  if (tokenUsername && tokenPassword && username === tokenUsername && password === tokenPassword) {
    return res.status(200).json({
      status: 200,
      data: {
        token: process.env.TOKEN
      },
      message: 'Success: authorization token retrieved'
    })
  }
  return res.status(400).json({
    status: 400,
    message: 'Invalid username or password'
  })
}
