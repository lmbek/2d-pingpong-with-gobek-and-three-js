package main

import (
	"fmt"
	"github.com/lmbek/gobek/launcher"
	"os"
)

// For windows, we need a organisation name and project name
var organisationName = "Development" // put in organisation name
var projectName = "PingPong"         // put in project name

var frontendPath = "./frontend" // this should be set to where frontend files is (frontend folder: html, css, javascript...)

// remember to change the ports to something unique
var chromeLauncher = launcher.ChromeLauncher{
	Location:                os.Getenv("programfiles") + "\\Google\\Chrome\\Application\\chrome.exe",
	FrontendInstallLocation: os.Getenv("localappdata") + "\\Google\\Chrome\\InstalledApps\\" + organisationName + "\\" + projectName,
}

var chromiumLauncher = launcher.DefaultChromiumLauncher

func main() {
	launchApp()
}

func launchApp() {
	err := launcher.StartDefault(frontendPath, chromeLauncher, chromiumLauncher)
	if err != nil {
		fmt.Println(err)
	}
}
