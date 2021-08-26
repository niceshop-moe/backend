const User = require("../mongodb/models/user");

const profileSettingsHandler = function (app) {
    app.post('/api/user/settings', async (req, res) => {
        const token = req.body.token;

        const userdata = await User.findOne({
            token: new RegExp('^' + token + '$', 'i')
        }, function (err, data) {
            return data;
        });

        if (userdata === null) {
            res.sendStatus(418);
            return;
        }

        res.json(userdata);
    })
}

module.exports = profileSettingsHandler;