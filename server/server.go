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
		fmt.Fprintf(w, "unofficial wiimmfi api v%s\n\nfind source code/api documentation on github: %s\nsupport on discord: y21#0909", version, "https://github.com/y21/wiimmfi-api")
	})

	router.HandleFunc("/api/"+apiVersion+"/mkw/overview", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(&httpCache.Mkw.Data.Rooms)
	})

	router.HandleFunc("/api/"+apiVersion+"/mkw/regions", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(&httpCache.Mkw.Data.Regions)
	})

	fmt.Println("Webserver started")
	http.ListenAndServe(":3000", router)
}
