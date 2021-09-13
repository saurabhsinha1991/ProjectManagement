const jwt = require('jsonwebtoken');
const config = require('config');


function getCookie(cname, cookie) {
    let name = cname + "=";
    let ca = cookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      if (ca[i].indexOf(name) !== -1) {
          return ca[i].split(name)[1];
      }
    }
    return "";
}

  
module.exports = function(req, res, next) {
    const cookie = req.headers.cookie;

    const token = cookie ? getCookie('X-Auth-Token', cookie) : null;
    if (!token) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch(err) {
        return res.status(401).json({ msg: 'Unauthorized' });
    };
};
