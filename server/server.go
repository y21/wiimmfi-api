package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/y21/wiimmfi-api/cache"
)

const (
	version    = "2.0.0"
	apiVersion = "v2"
)

var httpCache cache.Cache

func main() {
	router := mux.NewRouter()
	httpCache.Games = make(map[string]cache.Game)
	httpCache.Update()

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		_, err := fmt.Fprintf(w, "unofficial wiimmfi api v%s\n\nfind source code/api documentation on github: %s\nsupport on discord: y21#0909", version, "https://github.com/y21/wiimmfi-api")
		if err != nil {
			fmt.Println(err)
		}
	})

	router.HandleFunc("/api/" + apiVersion + "/{game}/overview", func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		w.Header().Set("Content-Type", "application/json")
		var err error
		if params["game"] == "mkw" {
			err = json.NewEncoder(w).Encode(&httpCache.Mkw.Data.Rooms)
		} else {
			err = json.NewEncoder(w).Encode(httpCache.Games[params["game"]].Data)
		}

		if err != nil {
			fmt.Println(err)
		}
	})

	router.HandleFunc("/api/" + apiVersion + "/mkw/regions", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		err := json.NewEncoder(w).Encode(&httpCache.Mkw.Data.Regions)
		if err != nil {
			fmt.Println(err)
		}
	})

	fmt.Println("Webserver started")
	err := http.ListenAndServe(":3000", router)
	if err != nil {
		fmt.Println(err)
	}
}
