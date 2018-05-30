new Vue({
    el: "#app",
    data: {
        app: {
            name: "wiimmfi-api",
            links: {
                github: "https://github.com/y21/wiimmfi-api/",
                discord: "https://discord.gg/6DPWSmK/",
                gh_releases: "https://github.com/y21/wiimmfi-api/releases",
                about_page: "about.html"
            },
            endpoints: [
                {
                    name: "amount",
                    desc: "This endpoint returns the amount of available worldwides, continentals, privates, total worldwides, total continentals, total privates, total players and players in available rooms.",
                    format: "JSON",
                    parameters: [ ],
                    response: "https://gist.githubusercontent.com/y21/8a742a17585ff92703b12696abc902b6/raw/215a6276f3d77a7f6ff01721d0f3a945f7bb495d/amount-endpoint.json"
                },
                {
                    name: "regions",
                    desc: "This endpoint returns the amount of players logged in for each region which can be either CTGP, Jap/0, Ame/1 or Eur/2.",
                    format: "JSON",
                    parameters: [ ],
                    response: "https://gist.githubusercontent.com/y21/8a742a17585ff92703b12696abc902b6/raw/215a6276f3d77a7f6ff01721d0f3a945f7bb495d/regions-endpoint.json"
                },
                {
                    name: "findUser",
                    desc: "This endpoint returns information about a user such as VR, BR, etc. This may not work for every user that has weird characters in it; most likely hacked mii names. It also won't find players that are playing with 2 or more players (split-screen) if the i flag has not been set.",
                    format: "JSON",
                    parameters: [
                        {
                            name: "name",
                            desc: "The mii name of the player"
                        },
                        {
                            name: "flag",
                            desc: "[optional] Flags; i = includes, search by name includes"
                        }
                    ],
                    response: "https://gist.githubusercontent.com/y21/8a742a17585ff92703b12696abc902b6/raw/215a6276f3d77a7f6ff01721d0f3a945f7bb495d/findUser-endpoint.json"
                },
                {
                    name: "users",
                    desc: "This endpoint returns an array of users in all rooms.",
                    format: "JSON",
                    parameters: [ ],
                    response: "https://gist.githubusercontent.com/y21/8a742a17585ff92703b12696abc902b6/raw/215a6276f3d77a7f6ff01721d0f3a945f7bb495d/users-endpoint.json"
                }
            ]
        }
    }
});
