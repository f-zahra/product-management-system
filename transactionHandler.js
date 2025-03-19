const sequelize = require("./db");
async function transactionHandler(operationCallback) {
  return await sequelize.transaction(async (t) => {
    await operationCallback(t);
  });
}
module.exports = transactionHandler;
