exports.name = '/images/videocosplay';
exports.index = async(req, res, next) => {
    try {
        const girl = require('./data/json/videocosplay.txt');
        var image = girl[Math.floor(Math.random() * girl.length)].trim();
        res.jsonp({
            url: image,
            count: girl.length,
            author: 'Danggiakhanh'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
