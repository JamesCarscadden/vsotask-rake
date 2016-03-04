var path = require('path');
var tl = require('vso-task-lib');

// Find rake and get the tasks that it will run
var rake = new tl.ToolRunner(tl.which('rake', true));
var cmd = tl.getInput('command', true);
rake.arg(cmd);

// if dbcmd has been set then add it to the environment
var dbcmd = tl.getInput('dbconnection', false);
if (dbcmd) {
    tl.setVariable('DATABASE_URL', dbcmd);
}

// if environment has been set then add it to the environment
var railsenv = tl.getInput('railsenvironment', false)
if (railsenv) {
    tl.setVariable('RAILS_ENV', railsenv);
}

// Determine if we're going to use bundle exec
var bundleexec = tl.getInput('usebundle', false);
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
