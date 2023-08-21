"use strict";
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const app = express();
const run = async () => {
    try {
        app.listen(PORT, () => {
            console.log('Server started on port:', PORT);
        });
    }
    catch (e) {
        console.error(e);
    }
};
run();
