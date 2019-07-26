const koa = require('koa');
const routes = require("./routes/routes").router
const cors = require('koa-cors');

const app = new koa();

app.use(cors());
app.use(routes.routes());

const server = app.listen(process.env.PORT || 4000, function(){
	console.log("Server running")
});

module.exports = server;
