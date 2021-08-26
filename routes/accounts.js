const {
    encryptData, verifyData
} = require('../utilities/hasher');

const User = require('../mongodb/models/user');
const genToken = require('../utilities/tokenizer');

const accountHandler = function (app) {
    app.post('/api/user/create', async (req, res) => {

        try {

            if (
                req.body.username.length > 32 ||
                req.body.username === '' ||
                req.body.email === '' ||
                req.body.password === '' ||
                req.body.name === '' ||
                req.body.surname === ''
            ) {
                res.sendStatus(418);
                return;
            }

            const password = await encryptData(req.body.password);
            const token = genToken(64);

            const user = new User({
                "username": req.body.username,
                "password": password,
                "email": req.body.email,
                "name": req.body.name,
                "surname": req.body.surname,
                "token": token
            });

            const userExists = await User.findOne({
                username: new RegExp('^' + req.body.username + '$', "i")
            }, function (err, doc) {
                return doc;
            });

            if (userExists !== null) {
                res.sendStatus(418);
                return;
            }

            const emailExists = await User.findOne({
                email: new RegExp('^' + req.body.email + '$', "i")
            }, function (err, doc) {
                return doc;
            });

            if (emailExists !== null) {
                res.sendStatus(418);
                return;
            }

            user.save()
                .then((result) => {
                    res.json({
                        result
                    })
                })
                .catch((err) => {
                    console.log(err);
                    res.end();
                })
        } catch (error) {
            console.log(error);
        }
    })

    app.post('/api/user/login', async (req, res) => {

        if (
            req.body.username === '' ||
            req.body.password === ''
        ) {
            res.sendStatus(418);
            return;
        }

        const userFound = await User.findOne({
            username: new RegExp('^' + req.body.username + '$', "i")
        }, function (err, doc) {
            return doc;
        });

        if(userFound === null) {
            res.sendStatus(418);
            return;
        }

        if (!(await verifyData(req.body.password, userFound.password))) {
            res.sendStatus(418);
            return;
        }

        res.json({
            "token": userFound.token
        })

    })
}

module.exports = accountHandler;