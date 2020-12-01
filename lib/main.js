"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const process = __importStar(require("process"));
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
function install_target(target_base, name, targetdir) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const target = target_base.concat(name);
            const executable = targetdir.concat('/', name);
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
            const targetdir = ''.concat(core.getInput('dir') || process.env.RUNNER_WORKSPACE || '', '/bin');
            yield exec.exec(`mkdir -p ${targetdir}`);
            yield install_target('https://github.com/linuxdeploy/linuxdeploy/releases/download/continuous/', 'linuxdeploy-x86_64.AppImage', targetdir);
            const plugins = core.getInput('plugins').split(' ');
            if (plugins) {
                for (const currentValue of plugins) {
                    switch (currentValue) {
                        case 'qt': {
                            yield install_target('https://github.com/linuxdeploy/linuxdeploy-plugin-qt/releases/download/continuous/', 'linuxdeploy-plugin-qt-x86_64.AppImage', targetdir);
                            break;
                        }
                        case 'conda': {
                            yield install_target('https://raw.githubusercontent.com/TheAssassin/linuxdeploy-plugin-conda/master/', 'linuxdeploy-plugin-conda.sh', targetdir);
                            break;
                        }
                        case 'python': {
                            yield install_target('https://github.com/niess/linuxdeploy-plugin-python/releases/download/continuous/', 'linuxdeploy-plugin-python-x86_64.AppImage', targetdir);
                            break;
                        }
                        case 'appimage': {
                            yield install_target('https://github.com/linuxdeploy/linuxdeploy-plugin-appimage/releases/download/continuous/', 'linuxdeploy-plugin-appimage-x86_64.AppImage', targetdir);
                            break;
                        }
                    }
                }
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
