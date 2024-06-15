package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strings"
)

func HttpGet(url string) (interface{}, error) {
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	return stringToJson(string(body)), nil
}

func stringToJson(str string) interface{} {
	var data interface{}
	decoder := json.NewDecoder(strings.NewReader(str))
	decoder.Decode(&data)
	return data
}
