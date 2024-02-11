const mongoose = require("mongoose");

const MongoConnect = async () => {
  try {
    await mongoose.connect(
        process.env.DATABASE
    );
    console.log("Mongodb connected")
  } catch (error) {
    console.log("Error while connecting database -", error);
  }
};
module.exports = MongoConnect;
