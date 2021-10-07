const assert = require("assert");
const {processReplacements} = require("./replace");
const fs = require("fs").promises;

// shows how the runner will run a javascript action with env / stdout protocol
test('Transforms Tokens Correctly', async () => {
    const testFile = "env: flex\n" +
        "runtime: gs://elixir-runtime/elixir.yaml\n" +
        "runtime_config:\n" +
        "  release_app: test_app\n" +
        "env_variables:\n" +
        "  REPLACE_OS_VARS: true\n" +
        "  MIX_ENV: @MIX_ENVIRONMENT\n" +
        "  SECRET_AUTH_TOKEN: @SECRET_TOKEN"
    await fs.writeFile('test.yaml', testFile, "utf-8");
    await processReplacements('test.yaml',"@MIX_ENVIRONMENT=staging,@SECRET_TOKEN=kB504q0fP/wIoMu9hlC1CJiQU9KAVtLk+Il6f4pOCnYfVI9/Z8q8S/EAXe2asDqnOZHrtF3EKjG6rhDKBT2PxdJAfkIErv6hWlwZPD9dIck==" )
    const data = await fs.readFile("test.yaml", "utf-8");
    assert(data.indexOf("staging") !== -1);
    assert(data.indexOf("kB504q0fP/wIoMu9hlC1C") !== -1)
    await fs.unlink('test.yaml');

    console.log("Test data removed.");
})
