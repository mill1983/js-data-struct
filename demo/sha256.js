const cryto = require('crypto');


class StringUtil {
    applySha256(input) {
        var hex = cryto.createHash("sha256");
        hex.update(input)
        return hex.digest('hex');
    }
}

module.exports = {
    StringUtil
}