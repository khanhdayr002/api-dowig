exports.name = '/info';
exports.index = async (req, ress, next) => {
const request = require('request');
var uid = req.query.uid
var tokenU = req.query.token
if(!uid) return ress.json({ error: 'thiếu dữ liệu uid'})
try {
const token = 'EAAD6V7os0gcBOwFXfCZC4Xt2QMFxUiXJAJa3th84Bc0yIY8Niw0HV4QLJWY597CtmYGoz3zoP3DBkxLGnLNQinwtqckMru6rD92Xir6OjERCpv2r2XQ6ibIoSQB2uU0v0 7ofZA1wwRZBRWIZBUHN5fwR5YDKj7qBZANfa4cMeTxWbB7l95rh5TqpsfQZDZD'
const options = {
  method: 'POST',
  url: 'https://get-info-user-facebook.p.rapidapi.com/api-no-key/info',
  headers: {
    'content-type': 'application/json',
    'x-rapidapi-host': 'get-info-user-facebook.p.rapidapi.com',
    'x-rapidapi-key': 'a012e05802msh4ce48bff26d5c0ap151d85jsn4edde7f89de0',
    useQueryString: true
  },
  body: {id: uid, token: tokenU || token},
  json: true
};
request(options, function (error, response, body) {
	return ress.json({ data: body })
});
} catch(e) {
  return ress.json({ error: 'Token die, vui lòng đợi admin thay token hoặc bạn tự nhập token'})
}
}