require("express-async-errors");

const AppError = require('./utils/AppError');

const migrationsRun = require('./database/sqlite/migrations');

const cors = require('cors');
const express = require('express');
const uploadConfig = require('./configs/upload');

const routes = require('./routes');
migrationsRun();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);


app.use(( error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));