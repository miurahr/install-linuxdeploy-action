# `install-linuxdeploy-action`

An action to install LinuxDeploy on Github Actions workflow.
See linuxdeploy utility details on [LinuxDeploy project](https://github.com/linuxdeploy/linuxdeploy) home.
The action can handle plugins for LinuxDeploy.

You can specify plugins.

```yml
    - name: Install LinuxDeploy
      id: install-linuxdeploy
      uses: miurahr/install-linuxdeploy-action@v1.8.0
      with:
        plugins: qt appimage
```
You can call the utility in a run step like as follows:

```bash
${{ steps.install-linuxdeploy.outputs.linuxdeploy }} --plugin=qt --output=appimage --create-desktop-file --executable=Apps --appdir appdir --icon-file=Apps.svg
```

You can also optionally specify a directory to install, that is added to search PATH.
You can also optionally request installation of LinuxDeploy and plugins for a specific architecture (allowed values `x64` and `arm64`; defaults to the runner's architecture).

```yml
    - name: Install LinuxDeploy
      uses: miurahr/install-linuxdeploy-action@v1.8.0
      with:
        dir: ${{ github.workspace }}
        arch: x64
```

You can also specify the [linuxdeploy release](https://github.com/linuxdeploy/linuxdeploy/releases) to install:

```yml
    - name: Install LinuxDeploy
      uses: miurahr/install-linuxdeploy-action@v1
      with:
        linuxdeploy-release: 1-alpha-20230713-1
```

This action is distributed under the [MIT license](LICENSE).
