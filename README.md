# `install-linuxdeploy-action`

An action to install LinuxDeploy on Github Actions workflow.
See linuxdeploy utility details on [LinuxDeploy project](https://github.com/linuxdeploy/linuxdeploy) home.
The action can handle plugins for LinuxDeploy. 

You can specify plugins and target directory to install.

```yml
    - name: Install LinuxDeploy
      uses: miurahr/install-linuxdeploy-action@v1
      with:
        dir: ${{ github.workspace }}
        plugins: qt appimage
```

A default directory for installation is a place where "${RUNNER_WORKSPACE}/bin/".

You can call the utility like as follows:

```bash
${{ github.workspace }}linuxdeploy-x86_64.AppImage --plugin=qt --output=appimage --create-desktop-file --executable=Apps --appdir appdir --icon-file=Apps.svg
```


## More info

The path where `linuxdeploy-x86_64.AppImage` located is added to your `path` environment variable.
This action is distributed under the [MIT license](LICENSE).

