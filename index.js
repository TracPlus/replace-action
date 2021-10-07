const core = require('@actions/core');
const {executeAction} = require("./replace");

async function run() {
  try {
      await executeAction();
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run().then(() => {
  console.log("Completed");
})
