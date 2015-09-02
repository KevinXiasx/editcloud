var exec = require('child_process');

function execshell (comman, sock){
	var child = exec.exec(comman, function (err, stdout, stderr) {
		if(err)
			console.log(err);
	});
	child.stdout.on('data', function  (dd) {
		sock.emit('data', dd);
		console.log(dd);
	})

	child.stdout.on('end', function  () {
		sock.emit('end', 'End');
		console.log('End');
	})
}

exports.execshell = execshell;