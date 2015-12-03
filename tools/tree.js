var fs = require('fs');
var url = require("url");
var path = require('path');

function getdir (filepath) {
	var finalyjson;
	var files  = new Array();
	var dirs = new Array();

	var tmp = fs.readdirSync(filepath);
	if(tmp.length != 0)
	{
		for (var i = tmp.length - 1; i >= 0; i--) 
		{
			var tmpstat = fs.statSync( path.join(filepath, tmp[i]) );
			if( tmpstat.isDirectory() )
				dirs.push(getdir(path.join(filepath, tmp[i])));
			else if( tmpstat.isFile() )
				files.push(tmp[i]);
		};
	}
	finalyjson = { self:filepath, file:files, dir:dirs};
	return finalyjson;
}



function midden(filepath, finalyjson, total, callback) {
	fs.stat(filepath, function (err, stats) {
		if(err){
			console.log(err);
			return;
		}
		if( stats.isDirectory())
			finalyjson.dirs.push( filepath );
		if( stats.isFile() )
			finalyjson.files.push( path.basename(filepath) );

		if(finalyjson.dirs.length + finalyjson.files.length == total){
			callback(finalyjson);
		}
	})
}

function readpath (filepath, callback) {
	fs.readdir(filepath, function (err, date) {
		if(err){
			console.log(err);
			return;
		}
		var finalyjson = { self:filepath, files:new Array(), dirs:new Array() };

		if( !err && date.length != 0){
			for (var i = date.length - 1; i >= 0; i--) {
				midden( path.join(filepath, date[i]), finalyjson, date.length, callback);
			};
		}
	});
}

exports.readpath = readpath;
exports.getdir = getdir;