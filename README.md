# `install-linuxdeploy-action`

An action to install LinuxDeploy on Github Actions workflow.
See linuxdeploy utility details on [LinuxDeploy project](https://github.com/linuxdeploy/linuxdeploy) home.
The action can handle plugins for LinuxDeploy.

You can specify plugins.

```yml
    - name: Install LinuxDeploy
      uses: miurahr/install-linuxdeploy-action@v1
      with:
        plugins: qt appimage
```
You can call the utility like as follows:

```bash
linuxdeploy-x86_64.AppImage --plugin=qt --output=appimage --create-desktop-file --executable=Apps --appdir appdir --icon-file=Apps.svg
```

You can also optionally specify a directory to install, that is added to search PATH.

```yml
    - name: Install LinuxDeploy
      uses: miurahr/install-linuxdeploy-action@v1
      with:
        dir: ${{ github.workspace }}
```

This action is distributed under the [MIT license](LICENSE).
