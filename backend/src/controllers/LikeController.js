const Dev = require('../models/Dev');

module.exports = {
    async store(req, res){
        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev) {
            return res.status(400).json({ Error: 'User doesn\'t exists' });
        }

        if(targetDev.likes.includes(user)){
            console.log('DEU MATCH!')
        }

        loggedDev.likes.push(targetDev._id);
        
        await loggedDev.save((err, loggedDev) => {
            if(err) return res.status(500).json(err);
            else return res.status(200).json(loggedDev);
        });
    }
}