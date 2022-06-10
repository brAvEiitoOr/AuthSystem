const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    return hash;
};

helpers.matchPassword = async (password, hash) => {
    const correct = await bcrypt.compare(password, hash);
    return correct;
}

helpers.datetimeToDate = (datetime) => {
    const date = datetime.getDate()+'/'+(datetime.getMonth()+1)+'/'+datetime.getFullYear();
    return date;
}

module.exports = helpers;