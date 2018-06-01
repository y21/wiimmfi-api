# wiimmfi-api

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9ee46ec893de4624b946b9bf712d6171)](https://app.codacy.com/app/y21/wiimmfi-api?utm_source=github.com&utm_medium=referral&utm_content=y21/wiimmfi-api&utm_campaign=badger)

This is a public API to get information about Mario Kart Wii rooms via Wiimmfi's website.<br/>
<a href="https://wiimmfi.glitch.me/">Demo</a> | <a href="https://wiimmfi.de/mkw/list">Room list</a> | <a href="https://wiimmfi.de">Wiimmfi</a> | <a href="https://y21.github.io/wiimmfi-api">Documentation</a>

## Notice
This is an **unofficial** API and is **not** affiliated with Wiimmfi. Provided data *can* be inaccurate or wrong because of frontend code modifications, but this should not happen often.<br/>
The Nintendo WFC replacement server called <a href="https://wiimmfi.de/">Wiimmfi</a> was made by Leseratte and Wiimm! 

### Code
This project was written in JavaScript and uses the web framework Express. It uses Node.js for backend code such as running the webserver.
If you want to run a private instance, please make sure that you're running >= node.js v8.<br/>
To check your node version, simply type `node -v` in your command prompt.

### What it does
As mentioned above, this project uses Express as webserver. Every file in `~/routes` except the directory itself will be included as an API endpoint, means if you add a valid JavaScript file in there, it will call that function every time with both a request and a response parameter.<br/>
Since <a href="https://wiimmfi.de/">Wiimmfi</a> website uses Hypertext Transfer Protocol Secure (HTTPS), this is using the Node.js' built in HTTPS module. 
All endpoints will probably be a bit slow because of the extremely huge HTML source on Wiimmfi's site. It has about 5000 lines, so it's self-explanatory why it's taking so long.

------
# Endpoints

All endpoints are documented in the docs. 
