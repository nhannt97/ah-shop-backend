const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5300;
const router = require('./routers');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`==========App listening on port ${PORT}==========`);
});
