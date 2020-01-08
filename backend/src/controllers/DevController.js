const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { username } = req.body;

        await Dev.findOne({ user: username }).exec(async function(err, userExists) {
            if(err) return res.json(err);

            if (userExists) {
                return res.json(userExists);
            } else {
                const response = await axios.get(`https://api.github.com/users/${username}`);

                const { name, bio, avatar_url: avatar } = response.data;

                Dev.create({
                    name,
                    user: username,
                    bio,
                    avatar
                }, (err, dev) => {
                    if(err) return res.status(500).json(err);

                    else return res.status(200).json(dev);
                });
            }
        });
    },

    async show(req, res) {
        const { user } = req.headers;

        const loggedUser = await Dev.findById(user);

        await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedUser.likes } },
                { _id: { $nin: loggedUser.dislikes } }
            ]
        }).exec((err, devs) => {
            if(err) return res.status(500).json(err);

            else if (!devs) return res.status(404).json({ Error: 'No devs found' });

            else return res.status(200).json(devs);
        });
    },

    index(req, res) {
        Dev.find({}).exec((err, devs) => {
            if (err) return res.status(500).json(err);
            else return res.status(200).json(devs);
        });
    },
}