const mongoose = require("mongoose");
const dbConfig = require('./config');

class Database {
    constructor () {
        this._connect();
    }

    async _connect() {
        try {
            await mongoose.connect(`mongodb://${dbConfig.ip}/${dbConfig.db}`);
        } catch (e) {
            console.error(e);
        }
    }
};

module.exports = new Database();