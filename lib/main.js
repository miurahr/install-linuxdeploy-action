"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const process = __importStar(require("process"));
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
function install_target(target_base, name, targetdir) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const target = target_base + name;
            const executable = targetdir + '/' + name;
            yield exec.exec(`wget -c -nv ${target} -O ${executable}`);
            yield exec.exec(`chmod +x ${executable}`);
            core.addPath(targetdir);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const targetdir = (core.getInput("dir") || process.env.RUNNER_WORKSPACE) + "/bin";
            yield exec.exec(`mkdir -p ${targetdir}`);
            yield install_target("https://github.com/linuxdeploy/linuxdeploy/releases/download/continuous/", "linuxdeploy-x86_64.AppImage", targetdir);
            let plugins = core.getInput("plugins").split(" ");
            if (plugins) {
                for (const currentValue of plugins) {
                    switch (currentValue) {
                        case "qt": {
                            yield install_target("https://github.com/linuxdeploy/linuxdeploy-plugin-qt/releases/download/continuous/", "linuxdeploy-plugin-qt-x86_64.AppImage", targetdir);
                            break;
                        }
                        case "conda": {
                            yield install_target("https://raw.githubusercontent.com/TheAssassin/linuxdeploy-plugin-conda/master/", "linuxdeploy-plugin-conda.sh", targetdir);
                            break;
                        }
                        case "python": {
                            yield install_target("https://github.com/niess/linuxdeploy-plugin-python/releases/download/continuous/", "linuxdeploy-plugin-python-x86_64.AppImage", targetdir);
                            break;
                        }
                        case "appimage": {
                            yield install_target("https://github.com/linuxdeploy/linuxdeploy-plugin-appimage/releases/download/continuous/", "linuxdeploy-plugin-appimage-x86_64.AppImage", targetdir);
                            break;
                        }
                    }
                    ;
                }
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
