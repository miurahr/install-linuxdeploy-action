import * as os from 'os'
import * as temp from 'temp'
import * as core from '@actions/core'
import * as exec from '@actions/exec'

const get_appimage_arch = (runner_arch: string): string => {
  switch (runner_arch.toLowerCase()) {
    case 'x64':
      return 'x86_64'
    case 'arm64':
      return 'aarch64'
    default:
      throw `Unsupported runner architecture ${runner_arch}`
  }
}

const install_target = async (
  target_base,
  name,
  targetdir
): Promise<string | undefined> => {
  try {
    const target: string = target_base.concat(name)
    core.info(`⬇Downloading ${name}...`)
    const executable: string = targetdir.concat('/', name)
    await exec.exec(`wget -c -nv ${target} -O ${executable}`)
    await exec.exec(`chmod +x ${executable}`)
    core.debug(`Downloaded to ${executable}`)
    return executable
  } catch (error) {
    core.setFailed(error.message)
  }
}

const run = async (): Promise<void> => {
  try {
    const arch = get_appimage_arch(core.getInput('arch') || os.arch())
    const targetdir: string = core.getInput('dir') || temp.mkdirSync()
    const linuxdeployRelease: string =
      core.getInput('linuxdeploy-release') || 'continuous'
    if (targetdir) {
      await exec.exec(`mkdir -p ${targetdir}`)
      core.addPath(targetdir)
    }
    const executable = await install_target(
      `https://github.com/linuxdeploy/linuxdeploy/releases/download/${linuxdeployRelease}/`,
      'linuxdeploy-x86_64.AppImage',
      targetdir
    )
    if (executable) {
      core.setOutput('linuxdeploy', executable)
    }
    const plugins = core.getInput('plugins').split(' ')
    if (plugins) {
      for (const currentValue of plugins) {
        switch (currentValue) {
          case 'qt': {
            await install_target(
              'https://github.com/linuxdeploy/linuxdeploy-plugin-qt/releases/download/continuous/',
              `linuxdeploy-plugin-qt-${arch}.AppImage`,
              targetdir
            )
            break
          }
          case 'gtk': {
            await install_target(
              'https://raw.githubusercontent.com/linuxdeploy/linuxdeploy-plugin-gtk/master/',
              'linuxdeploy-plugin-gtk.sh',
              targetdir
            )
            break
          }
          case 'conda': {
            await install_target(
              'https://raw.githubusercontent.com/TheAssassin/linuxdeploy-plugin-conda/master/',
              'linuxdeploy-plugin-conda.sh',
              targetdir
            )
            break
          }
          case 'python': {
            await install_target(
              'https://github.com/niess/linuxdeploy-plugin-python/releases/download/continuous/',
              `linuxdeploy-plugin-python-${arch}.AppImage`,
              targetdir
            )
            break
          }
          case 'appimage': {
            await install_target(
              'https://github.com/linuxdeploy/linuxdeploy-plugin-appimage/releases/download/continuous/',
              `linuxdeploy-plugin-appimage-${arch}.AppImage`,
              targetdir
            )
            break
          }
          case 'gstreamer': {
            await install_target(
              'https://raw.githubusercontent.com/linuxdeploy/linuxdeploy-plugin-gstreamer/master/',
              'linuxdeploy-plugin-gstreamer.sh',
              targetdir
            )
            break
          }
          case 'ncurses': {
            await install_target(
              'https://raw.githubusercontent.com/linuxdeploy/linuxdeploy-plugin-ncurses/main/',
              'linuxdeploy-plugin-ncurses.sh',
              targetdir
            )
          }
        }
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
