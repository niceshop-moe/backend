const bcrypt = require('bcrypt');
const e = require('express');

async function encryptData(data) {
    try {
        const salt = await bcrypt.genSalt();
        const hashedData = await bcrypt.hash(data, salt);

        return hashedData;
    } catch (error) {
        console.log(error)
    }
    return '500';
}

async function verifyData(plainData, encryptedData) {
    try {
        if (await bcrypt.compare(plainData, encryptedData))
            return true;
        else
            return false;
    } catch (error) {
        console.log(error)
    }
    return false;
}



module.exports = {
    encryptData, verifyData
}