console.log(`---server.js---`);
const express = require(`express`);
const app = express();
const PORT = process.env.PORT || 4000;
// middleware
app.use(`/public`, express.static(`client_see`));
// route
app.get(`/`, (request, response) => {
    response.redirect(`public`);
});
// listen
app.listen(PORT, () => {
    console.log(`Listen at port: ${PORT}`);
});