const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJSdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handleErrorMiddleware = require('./app/middlewares/handler-error');
const notFoundMiddleware = require('./app/middlewares/not-found');
const app = express();
const routes = require('./routes');
const options = {
	definition: {
		swagger: "2.0",
		title: "API DOCS",
		openapi: "3.1.0",
		info: {
			title: "API DOCS",
			description: "Api Documentation",
		},
		schemes: ["dev-sandbox"]
	},
	apis: ["./routers/*.js"],
};

const specs = swaggerJSdoc(options);
const errorHandleMiddleware = require('./app/middlewares/handler-error');

app.use(
	"/docs",
	swaggerUi.serve,
	swaggerUi.setup(specs, { explorer: true })
);

app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Welcome to the API",
	})
});
app.use(routes);
app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

module.exports = app;
