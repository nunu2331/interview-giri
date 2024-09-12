const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

function validateHeaders(req, res, next) {
    const userId = req.headers['user-id'];
    const scope = req.headers['scope'];

    if (userId === 'ifabula' && scope === 'user') {
        next();
    } else {
        return res.status(401).json({
            responseCode: 401,
            responseMessage: 'UNAUTHORIZED'
        });
    }
}

app.get('/api/getData', validateHeaders, (req, res) => {
    res.json({
        responseCode: 200,
        responseMessage: 'Data fetched successfully',
        data: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com'
        }
    });
});

app.post('/api/postData', validateHeaders, (req, res) => {
    const { id, name, email } = req.body;

    if (!id || !name || !email) {
        return res.status(400).json({
            responseCode: 400,
            responseMessage: 'Invalid data'
        });
    }

    res.json({
        responseCode: 200,
        responseMessage: 'Data posted successfully',
        postedData: {
            id,
            name,
            email
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
