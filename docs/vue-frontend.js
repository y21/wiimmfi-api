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
                    parameters: [
                        {
                            name: "/",
                            desc: "/"
                        }
                    ],
                    response: "https://gist.githubusercontent.com/y21/8a742a17585ff92703b12696abc902b6/raw/215a6276f3d77a7f6ff01721d0f3a945f7bb495d/amount-endpoint.json"
                }
            ]
        }
    }
});
