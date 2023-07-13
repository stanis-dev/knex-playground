import app from './app'

const port = process.env.PORT || 4567
app.listen(port, () => console.log(`Listening: http://localhost:${port}`))
