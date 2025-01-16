const mongoose = require("mongoose");

const connection = async (database_url) => {
    return await mongoose.connect(database_url)
}

module.exports = {
    connection
}