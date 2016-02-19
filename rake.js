var path = require('path');
var tl = require('vso-task-lib');

var rake = new tl.ToolRunner(tl.which('rake', true));
var cmd = tl.getInput('command', true);

rake.arg(cmd);

rake.exec({ failOnStdErr: false})
.then(function(code) {
    tl.exit(code);
})
.fail(function(err) {
    console.error(err.message);
    tl.debug('taskRunner fail');
    tl.exit(1);
})
