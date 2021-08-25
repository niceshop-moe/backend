const { encryptData } = require('../utilities/hasher');
const User = require('../mongodb/models/user');

const accountHandler = function (app) {
    app.post('/api/user/create', async (req, res) => {

        const username = req.body.username;
        const password = await encryptData(req.body.password);
        const email = req.body.email;
        const name = req.body.name;
        const surname = req.body.surname;

        const user = new User({
            username: username,
            password: password,
            email: email,
            name: name,
            surname: surname
        });
    
        user.save()
            .then((result) => {
                res.json({result})
            })
            .catch((err) => {
                console.log(err);
                res.end();
            })
    })
}

module.exports = accountHandler;