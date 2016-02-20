var path = require('path');
var tl = require('vso-task-lib');

var rake = new tl.ToolRunner(tl.which('rake', true));
var cmd = tl.getInput('command', true);
var bundleexec = tl.getInput('usebundle', false);

rake.arg(cmd);

var bundle = new tl.ToolRunner(tl.which('bundle', true));
bundle.arg('exec');
bundle.arg('rake');
bundle.arg(cmd);

if (bundleexec === 'true') {
    bundle.exec({ failOnStdErr: false})
    .then(function(code) {
        tl.exit(code);
    })
    .fail(function(err) {
        console.error(err.message);
        tl.debug('taskRunner fail');
        tl.exit(1);
    })
}
else {
    rake.exec({ failOnStdErr: false})
    .then(function(code) {
        tl.exit(code);
    })
    .fail(function(err) {
        console.error(err.message);
        tl.debug('taskRunner fail');
        tl.exit(1);
    })
}
