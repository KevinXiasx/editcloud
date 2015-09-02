var fs = require('fs');
var url = require("url");
var path = require('path');

/*function getdir(filepath) 
{
	var finalyjson;
	fs.readdir(filepath, function (err, paths){
	  	if(err )
	      console.log(err);
	    else if(paths.length == 0)
	      console.log("no exiest file");
	  	else
	  	{
	  		var files  = new Array();
	  		var dirs = new Array();
	  		var nu = 0;
	  		for (var k = 0; k < paths.length; k++)
	  		{
	  			fs.stat(path.join(filepath, paths[k]), 
	  			function (err, stats)
	  			{
	  				if( err )
	          		{
	            		console.log(err);
	  					console.log("read dir err");
	          		}
	  				else
	  				{
		  				if( stats.isDirectory() )
		  					dirs.push(getdir(path.join(filepath, paths[nu])));
		  				else if( stats.isFile() )
		  					files.push(path.join(filepath, paths[nu]));
		  			}
		  			nu++;
		  			if( files.length + dirs.length == paths.length)
		  			{
		  				finalyjson = { file:files, dir:dirs};
		  				console.log(finalyjson);
		  			    return finalyjson;
		  			}
	  			});
	  		}
	  	}
	})
}*/

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

console.log(getdir('..').dir);