exports.name = '/instagram/downloadpost';
exports.index = async(req, res, next) => {
const url = req.query.url;
if (!url) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
const axios = require("axios");
 
const options = {
  method: 'GET',
  url: 'https://instagram-story-downloader-media-downloader.p.rapidapi.com/index',
  params: {
    url: 'https://www.instagram.com/reel/C46NMgch5gS/'
  },
    'X-RapidAPI-Key': 'a54ec69eeamsh0361474e0776373p1bac56jsn708b505e7d96',
    'X-RapidAPI-Host': 'instagram-story-downloader-media-downloader.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
