import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as tc from '@actions/tool-cache';

const install_target = async (target_base, name, optionDir): Promise<void> => {
  try {
    const target: string = target_base.concat(name);
    core.info(`⬇️ Downloading ${name}...`)
    let executable: string;
    if (optionDir) {
      executable = optionDir.concat('/', name);
      await exec.exec(`wget -c -nv ${target} -O ${executable}`);
      await exec.exec(`chmod +x ${executable}`);
      core.debug(`Downloaded to ${executable}`)
    } else {
  		executable = await tc.downloadTool(target)
      await exec.exec(`chmod +x ${executable}`);
      core.debug(`Downloaded to ${executable}`)
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

const run = async (): Promise<void> => {
  try {
    const optionDir: string = core.getInput('dir');
    if (optionDir) {
      await exec.exec(`mkdir -p ${optionDir}`);
      core.addPath(optionDir);
    }
    await install_target(
      'https://github.com/linuxdeploy/linuxdeploy/releases/download/continuous/',
      'linuxdeploy-x86_64.AppImage',
				optionDir
    );
    const plugins = core.getInput("plugins").split(' ');
    if (plugins) {
      for (const currentValue of plugins) {
        switch (currentValue) {
          case 'qt': {
            await install_target(
              'https://github.com/linuxdeploy/linuxdeploy-plugin-qt/releases/download/continuous/',
              'linuxdeploy-plugin-qt-x86_64.AppImage',
               optionDir
            );
            break
          }
          case 'conda': {
            await install_target(
              'https://raw.githubusercontent.com/TheAssassin/linuxdeploy-plugin-conda/master/',
              'linuxdeploy-plugin-conda.sh',
                optionDir
            );
            break
          }
          case 'python': {
            await install_target(
              'https://github.com/niess/linuxdeploy-plugin-python/releases/download/continuous/',
              'linuxdeploy-plugin-python-x86_64.AppImage',
                optionDir
            );
            break
          }
          case 'appimage': {
            await install_target(
              'https://github.com/linuxdeploy/linuxdeploy-plugin-appimage/releases/download/continuous/',
              'linuxdeploy-plugin-appimage-x86_64.AppImage',
                optionDir
            );
            break
          }
        }
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
