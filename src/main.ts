import * as core from '@actions/core';
import * as exec from '@actions/exec';

const install_target = async (target_base, name, targetdir): Promise<void> => {
  try {
    const target: string = target_base.concat(name);
    const executable: string = targetdir.concat('/', name);
    await exec.exec(`wget -c -nv ${target} -O ${executable}`);
    await exec.exec(`chmod +x ${executable}`);
    core.addPath(targetdir);
  } catch (error) {
    core.setFailed(error.message);
  }
};

const run = async (): Promise<void> => {
  try {
    const targetdir: string = core.getInput('dir') || '/usr/local/bin';
    await exec.exec(`mkdir -p ${targetdir}`);
    await install_target(
      'https://github.com/linuxdeploy/linuxdeploy/releases/download/continuous/',
      'linuxdeploy-x86_64.AppImage',
      targetdir
    );
    const plugins = core.getInput("plugins").split(' ');
    if (plugins) {
      for (const currentValue of plugins) {
        switch (currentValue) {
          case 'qt': {
            await install_target(
              'https://github.com/linuxdeploy/linuxdeploy-plugin-qt/releases/download/continuous/',
              'linuxdeploy-plugin-qt-x86_64.AppImage',
              targetdir
            );
            break
          }
          case 'conda': {
            await install_target(
              'https://raw.githubusercontent.com/TheAssassin/linuxdeploy-plugin-conda/master/',
              'linuxdeploy-plugin-conda.sh',
              targetdir
            );
            break
          }
          case 'python': {
            await install_target(
              'https://github.com/niess/linuxdeploy-plugin-python/releases/download/continuous/',
              'linuxdeploy-plugin-python-x86_64.AppImage',
              targetdir
            );
            break
          }
          case 'appimage': {
            await install_target(
              'https://github.com/linuxdeploy/linuxdeploy-plugin-appimage/releases/download/continuous/',
              'linuxdeploy-plugin-appimage-x86_64.AppImage',
              targetdir
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
