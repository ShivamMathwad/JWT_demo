const jwt = require('jsonwebtoken');


exports.main = (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
}

exports.posts = (req, res) => {
    const token = req.body.token;

    jwt.verify(token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created!',
                authData: authData
            });
        }
    });
}

exports.signup = (req, res) => {
    const insert_sql = "INSERT INTO users(username, email, password) VALUES ?";

    const value = [
        [req.body.username, req.body.email, req.body.password]
    ];

    mysqldbconnection.query(insert_sql, [value], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                statusCode: 200,
                message: "Account created successfully"
            });
        }
    });
}

exports.login = async(req, res) => {
    const user = req.body;

    /*
    jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        if(err) {
            res.sendStatus(403);
        }
        res.json({
            statusCode: 200,
            message: "Token created successfully",
            token: token
        });
    });
    */
    let token;
    await jwt.sign({ user }, 'secretkey', (err, responsetoken) => {
        if (err) {
            res.sendStatus(403);
        }
        console.log(responsetoken);
        token = responsetoken;
    });
    
    const insert_sql = "INSERT INTO token(userEmail, token) VALUES ?";

    const value = [
        [user.email, token]
    ];

    mysqldbconnection.query(insert_sql, [value], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                statusCode: 200,
                message: "Login success! (Token created)",
                token: token
            });
        }
    });
}