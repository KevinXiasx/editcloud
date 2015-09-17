#include <iostream>
#include <fstream>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdlib.h>

using namespace std;

int main(int argc, char const *argv[])
{
	if(argc < 2){
		cout<<"arg too less"<<endl;
		return 0;
	}

/*	int fd = open(argv[1], O_RDONLY);
	if( fd == -1)
		cout<<"open fail\n";

	char buf[4096];
	while( (ret = read(fd, buf, 4096)) > 0)
*/

	ifstream infile;
	infile.open(argv[1]);
	if( !infile.is_open() ){
		cout<<"open fail\n";
		return 0;
	}

	ofstream outfile;
	outfile.open("new.css", ios::trunc);
	if( !outfile.is_open() ){
		cout<<"open write fail\n";
		return 0;
	}

	string content;

	while( getline(infile, content) )
	{
		string::size_type loc = content.find( "rem", 0);
		string outcont;
		if( loc != string::npos )
		{
			string s1 = content.substr(0, loc);
			string::size_type loc2 = s1.find_last_not_of("1234567890.");
			string s2 = s1.substr(0, loc2);
			string nub = s1.substr(loc2+1);

			outcont += s2;

			float numb = atof(nub.c_str());

			float newnumb = numb * 900/75;
			char buf[10];
			sprintf(buf, "%.*lfpx", 0,newnumb);

			outcont += buf;

			outcont += content.substr(loc+3);

			cout<<numb<<endl;
			cout<<outcont<<endl;
		}
		else
			outcont = content;
		outfile<<outcont<<endl;
	}
	return 0;
}