# `install-linuxdeploy-action`

Installing LinuxDeploy on Github Actions workflows manually is the worst.

See linuxdeploy utility details on [LinuxDeploy project](https://github.com/linuxdeploy/linuxdeploy) home.

You know what's easier than dealing with that? Just using this:
```yml
    - name: Install LinuxDeploy
      uses: miurahr/install-linuxdeploy-action@v0
```

All done.

## More info

The path where 'linuxdeploy-x86_64.AppImage' located is added to your `path` environment variable.

This action is distributed under the [MIT license](LICENSE).

