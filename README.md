# wiimmfi-api
Public API to get information about mkwii rooms<br/>
<a href="https://wiimmfi.glitch.me/">Demo</a> | <a href="https://wiimmfi.de/mkw/list">Room list</a>

### Code
This project was written in javascript and uses the web framework express. It uses nodejs for backend code such as running the webserver.
If you want to run a private instance, please make sure that you're running >= node.js v8.<br/>
To check your node version, simply type `node -v` in your command prompt.

### What it does
As mentioned above, this project uses express as webserver. Every file in `~/routes` except the directory itself will be included as an api endpoint, means if you add a valid javacript file in there, it will call that function every time with both a request and a response parameter.<br/>
Since <a href="https://wiimmfi.de/">wiimmfi</a> is using Hypertext Transfer Protocol Secure (HTTPS), this is using the nodejs built in HTTPS module. 
All endpoints will probably be a bit slow because of the extremely huge html source on wiimmfi's site. It has about 5000 lines, so it's self-explanatory why it's taking so long.
