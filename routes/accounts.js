const {
    encryptData
} = require('../utilities/hasher');

const User = require('../mongodb/models/user');

const accountHandler = function (app) {
    app.post('/api/user/create', async (req, res) => {
        
        try {
            const password = await encryptData(req.body.password);

            const user = new User({
                username: req.body.username,
                password: password,
                email: req.body.email,
                name: req.body.name,
                surname: req.body.surname
            });

            const userExists = await User.findOne({username: new RegExp('^'+req.body.username+'$', "i")}, function(err, doc) {
                return doc;
            });

            if(userExists !== null) {
                res.sendStatus(418);
                return;
            }

            const emailExists = await User.findOne({email: new RegExp('^'+req.body.email+'$', "i")}, function(err, doc) {
                return doc;
            });

            if(emailExists !== null) {
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
}

module.exports = accountHandler;