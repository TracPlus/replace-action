const core = require('@actions/core');
const fs = require("fs").promises;
async function run() {
  try {
    const files = core.getInput('files');
    const vars_string = core.getInput('replacements');
    const filenames = files.replace(' ', '').split(',');
    const vars = vars_string.split(',');
    console.log('files l:'+ filenames.length);
    for(const filename of filenames) {
      const data = await fs.readFile(filename, 'utf8');
      let result = data;
      console.log(data);
      for (let i = 0; i < vars.length; i++) {
        const firstEqual = vars[i].indexOf('=');
        const key = vars[i].substr(0, firstEqual);
        const value = vars[i].substr(firstEqual + 1);
        result = result.replaceAll(key, value)
      }
      console.log('file2: ' + filename)
      await fs.writeFile(filename, result, 'utf8');
    }
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
