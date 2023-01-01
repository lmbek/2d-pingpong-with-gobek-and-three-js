package main

import (
	"github.com/NineNineFive/go-local-web-gui/fileserver"
	"github.com/NineNineFive/go-local-web-gui/launcher"
	"net/http"
	"os"
	"runtime"
)

// For windows we need a organisation name and project name
var organisationName = "NewOrganisationName" // put in organisation name
var projectName = "NewProjectName"           // put in project name

var frontendPath = "./frontend" // this should be set to where frontend files is (frontend folder: html, css, javascript...)

// remember to change the ports to something unique
var chromeLauncher = launcher.ChromeLauncher{
	Location:                "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
	LocationCMD:             "C:\\\"Program Files\"\\Google\\Chrome\\Application\\chrome.exe",
	FrontendInstallLocation: os.Getenv("localappdata") + "\\Google\\Chrome\\InstalledApps\\" + organisationName + "\\" + projectName,
	Domain:                  "localhost",
	PortMin:                 11430,
	PreferredPort:           11451,
	PortMax:                 11500,
}

var chromiumLauncher = launcher.DefaultChromiumLauncher // default chrome or chromium launcher settings can be used like this
/* // Otherwise they can also be customized like this
var chromiumLauncher = launcher.ChromiumLauncher{
	Location:      "/var/lib/snapd/desktop/applications/chromium_chromium.desktop", // TODO: check if better location or can be customised
	Domain:        "localhost",
	PortMin:       11430,
	PreferredPort: 11451,
	PortMax:       11500,
}
*/

func main() {
	launchApp()
}

func initHTTPHandlers() {
	// static fileserver
	http.HandleFunc("/", fileserver.ServeFileServer)

	// api (local api can be added)
	//http.HandleFunc("/api/", api.ServeAPIUseGZip)
}

func launchApp() {
	switch runtime.GOOS {
	case "windows":
		initHTTPHandlers()
		launcher.StartOnWindows(frontendPath, chromeLauncher)
		return
	case "darwin": // "mac"
		panic("Darwin/Mac Will Not Be Supported")
		return
	case "linux": // "linux"
		initHTTPHandlers()
		launcher.StartOnLinux(frontendPath, chromiumLauncher)
		return
	default: // "freebsd", "openbsd", "netbsd"
		initHTTPHandlers()
		launcher.StartOnLinux(frontendPath, chromiumLauncher)
		return
	}
}
