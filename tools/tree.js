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

exports.getdir = getdir;