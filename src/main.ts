import * as process from "process";
import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function add_path(targetdir) {
  try {
    const filePath = process.env['GITHUB_PATH'] || ''
    if (filePath) {
      await exec.exec(`echo "${targetdir}" >> $GITHUB_PATH`]);
    } else {
      await exec.exec(`echo "PATH=${targetdir}" >> $GITHUB_ENV`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function install_target(target_base, name, targetdir) {
  try {
    const target = target_base + name;
    const executable = targetdir + '/' + name;
    await exec.exec(`wget -c -nv ${target} -O ${executable}`);
    await exec.exec(`chmod +x ${executable}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function run() {
  try {
    const targetdir = (core.getInput("dir") || process.env.RUNNER_WORKSPACE) + "/bin";
    await exec.exec(`mkdir -p ${targetdir}`);
    await install_target("https://github.com/linuxdeploy/linuxdeploy/releases/download/continuous/",
        "linuxdeploy-x86_64.AppImage", targetdir);
    let plugins = core.getInput("plugins").split(" ");
    if (plugins) {
      for (const currentValue of plugins) {
        switch(currentValue){
          case "qt": {
            await install_target( "https://github.com/linuxdeploy/linuxdeploy-plugin-qt/releases/download/continuous/",
                "linuxdeploy-plugin-qt-x86_64.AppImage", targetdir);
            break;
          }
          case "conda": {
            await install_target("https://raw.githubusercontent.com/TheAssassin/linuxdeploy-plugin-conda/master/",
              "linuxdeploy-plugin-conda.sh", targetdir);
            break;
          }
          case "python": {
            await install_target("https://github.com/niess/linuxdeploy-plugin-python/releases/download/continuous/",
                "linuxdeploy-plugin-python-x86_64.AppImage", targetdir);
            break;
          }
          case "appimage": {
            await install_target( "https://github.com/linuxdeploy/linuxdeploy-plugin-appimage/releases/download/continuous/",
                "linuxdeploy-plugin-appimage-x86_64.AppImage", targetdir);
            break;
          }
        };
      }
    }
    await add_path(targetdir)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
