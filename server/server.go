package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

const version string = "2.0.0"

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "unofficial wiimmfi api v%s\n\nfind source code/api documentation on github: %s\nsupport on discord: y21#0909", version, "https://github.com/y21/wiimmfi-api")
	})

	fmt.Println("Webserver started")
	http.ListenAndServe(":3000", router)
}
