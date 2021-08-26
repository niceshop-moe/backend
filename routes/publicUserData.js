const User = require("../mongodb/models/user");

const publicUserDataHandler = function (app) {
    app.get('/api/:username/profile', async (req, res) => {
        const username = req.params.username;

        const userdata = await User.findOne({
            username: new RegExp('^' + username + '$', 'i')
        }, function (err, data) {
            return data;
        });

        const response = {
            "username": userdata.username,
            "surname": userdata.surname,
            "name": userdata.name,
            "avatarUrl": userdata.avatarUrl,
            "bio": userdata.bio
        }

        res.json(response);
    })
}

module.exports = publicUserDataHandler;
