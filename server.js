const mongoose = require("mongoose");

const { DATABASE_URI } = process.env;

(async function initializeConnection() {
  try {
    await mongoose.connect(DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection established successfully!");
  } catch (error) {
    console.log(error);
  }
})();
