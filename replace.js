const core = require('@actions/core');
const fs = require("fs").promises;

async function executeReplacement(files, replacements) {
    const filenames = files.replace(' ', '').split(',');
    const vars = replacements.split(',');
    console.log(`Processing: ${filenames.length} Files`);
    for(const filename of filenames) {
        let result = await fs.readFile(filename, 'utf8');
        for (let i = 0; i < vars.length; i++) {
            const firstEqual = vars[i].indexOf('=');
            const key = vars[i].substr(0, firstEqual);
            const value = vars[i].substr(firstEqual + 1);
            const regx = new RegExp(key, 'g');
            result = result.replace(regx, value);
        }
        console.log('Processed File: ' + filename)
        await fs.writeFile(filename, result, 'utf8');
    }
}

module.exports.executeAction = async () => {
    const files = core.getInput('files', {required: true});
    const replacements = core.getInput('replacements', {required: true});
    await executeReplacement(files, replacements);
}

module.exports.processReplacements = executeReplacement;
