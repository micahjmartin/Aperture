"![](https://github.com/nektos/act/wiki/img/logo-150.png)\n\n# Overview [![push](https://github.com/nektos/act/workflows/push/badge.svg?branch=master&event=push)](https://github.com/nektos/act/actions) [![Join the chat at https://gitter.im/nektos/act](https://badges.gitter.im/nektos/act.svg)](https://gitter.im/nektos/act?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Go Report Card](https://goreportcard.com/badge/github.com/nektos/act)](https://goreportcard.com/report/github.com/nektos/act)\n\n> \"Think globally, <code>act</code> locally\"\n\nRun your [GitHub Actions](https://developer.github.com/actions/) locally! Why would you want to do this? Two reasons:\n\n- **Fast Feedback** - Rather than having to commit/push every time you want to test out the changes you are making to your `.github/workflows/` files (or for any changes to embedded GitHub actions), you can use `act` to run the actions locally. The [environment variables](https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables) and [filesystem](https://help.github.com/en/actions/reference/virtual-environments-for-github-hosted-runners#filesystems-on-github-hosted-runners) are all configured to match what GitHub provides.\n- **Local Task Runner** - I love [make](<https://en.wikipedia.org/wiki/Make_(software)>). However, I also hate repeating myself. With `act`, you can use the GitHub Actions defined in your `.github/workflows/` to replace your `Makefile`!\n\n# How Does It Work?\n\nWhen you run `act` it reads in your GitHub Actions from `.github/workflows/` and determines the set of actions that need to be run. It uses the Docker API to either pull or build the necessary images, as defined in your workflow files and finally determines the execution path based on the dependencies that were defined. Once it has the execution path, it then uses the Docker API to run containers for each action based on the images prepared earlier. The [environment variables](https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables) and [filesystem](https://help.github.com/en/actions/reference/virtual-environments-for-github-hosted-runners#filesystems-on-github-hosted-runners) are all configured to match what GitHub provides.\n\nLet's see it in action with a [sample repo](https://github.com/cplee/github-actions-demo)!\n\n![Demo](https://github.com/nektos/act/wiki/quickstart/act-quickstart-2.gif)\n\n# Installation\n\nTo install with [Homebrew](https://brew.sh/), run:\n\n`brew install nektos/tap/act`\n\nAlternatively, you can use the following:\n\n`curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash`\n\nIf you are running Windows, download the [latest release](https://github.com/nektos/act/releases/latest) and add the binary into your PATH.  \nIf you are using [Chocolatey](https://chocolatey.org/) then run:  \n`choco install act-cli`\n\nIf you are using [Scoop](https://scoop.sh/) then run:  \n`scoop install act`\n\nIf you are running Arch Linux, you can install the [act](https://aur.archlinux.org/packages/act/) package with your favorite package manager:\n\n`yay -S act`\n\nIf you are using NixOS or the Nix package manager on another platform you can install act globally by running\n\n`nix-env -iA nixpkgs.act`\n\nor in a shell by running\n\n`nix-shell -p act`\n\n# Commands\n\n```\n# List the actions\nact -l\n\n# Run the default (`push`) event:\nact\n\n# Run a specific event:\nact pull_request\n\n# Run a specific job:\nact -j test\n\n# Run in dry-run mode:\nact -n\n\n# Enable verbose-logging (can be used with any of the above commands)\nact -v\n```\n\n# Flags\n\n```\n  -b, --bind                   bind working directory to container, rather than copy\n  -C, --directory string       working directory (default \".\")\n  -n, --dryrun                 dryrun mode\n      --env-file string        environment file to read (default \".env\")\n  -e, --eventpath string       path to event JSON file\n  -h, --help                   help for act\n  -j, --job string             run job\n  -l, --list                   list workflows\n  -P, --platform stringArray   custom image to use per platform (e.g. -P ubuntu-18.04=nektos/act-environments-ubuntu:18.04)\n  -p, --pull                   pull docker image(s) if already present\n  -q, --quiet                  disable logging of output from steps\n  -r, --reuse                  reuse action containers to maintain state\n  -s, --secret stringArray     secret to make available to actions with optional value (e.g. -s mysecret=foo or -s mysecret)\n      --secret-file            file with list of secrets to read from (e.g. --secret-file .secrets)\n  -v, --verbose                verbose output\n      --version                version for act\n  -w, --watch                  watch the contents of the local repo and run when files change\n  -W, --workflows string       path to workflow files (default \"./.github/workflows/\")\n```\n\n# Known Issues\n\nMODULE_NOT_FOUND during `docker cp` command [#228](https://github.com/nektos/act/issues/228)\n\n```\nsteps:\n  - name: Checkout\n    uses: actions/checkout@v2\n    with:\n      path: \"your-action-root-directory\"\n```\n\n# Runners\n\nGitHub Actions offers managed [virtual environments](https://help.github.com/en/actions/reference/virtual-environments-for-github-hosted-runners) for running workflows. In order for `act` to run your workflows locally, it must run a container for the runner defined in your workflow file. Here are the images that `act` uses for each runner type:\n\n| GitHub Runner  | Docker Image                                                      |\n| -------------- | ----------------------------------------------------------------- |\n| ubuntu-latest  | [node:12.6-buster-slim](https://hub.docker.com/_/buildpack-deps)  |\n| ubuntu-18.04   | [node:12.6-buster-slim](https://hub.docker.com/_/buildpack-deps)  |\n| ubuntu-16.04   | [node:12.6-stretch-slim](https://hub.docker.com/_/buildpack-deps) |\n| windows-latest | `unsupported`                                                     |\n| windows-2019   | `unsupported`                                                     |\n| macos-latest   | `unsupported`                                                     |\n| macos-10.15    | `unsupported`                                                     |\n\n## Default runners are intentionally incomplete\n\nThese default images do **not** contain **all** the tools that GitHub Actions offers by default in their runners.\n\n## Alternative runner images\n\nIf you need an environment that works just like the corresponding GitHub runner then consider using an image provided by [nektos/act-environments](https://github.com/nektos/act-environments):\n\n- [nektos/act-environments-ubuntu:18.04](https://hub.docker.com/r/nektos/act-environments-ubuntu/tags) - built from the Packer file GitHub uses in [actions/virtual-environments](https://github.com/actions/runner).\n\n:warning: :elephant: `*** WARNING - this image is >18GB \ud83d\ude31***`\n\n## Use an alternative runner image\n\nTo use a different image for the runner, use the `-P` option:\n\n```\nact -P ubuntu-latest=nektos/act-environments-ubuntu:18.04\n```\n\n# Secrets\n\nTo run `act` with secrets, you can enter them interactively or supply them as environment variables. The following options are available for providing secrets:\n\n- `act -s MY_SECRET=somevalue` - use `somevalue` as the value for `MY_SECRET`.\n- `act -s MY_SECRET` - check for an environment variable named `MY_SECRET` and use it if it exists. If the environment variable is not defined, prompt the user for a value.\n\n# Configuration\n\nYou can provide default configuration flags to `act` by either creating a `./.actrc` or a `~/.actrc` file. Any flags in the files will be applied before any flags provided directly on the command line. For example, a file like below will always use the `nektos/act-environments-ubuntu:18.04` image for the `ubuntu-latest` runner:\n\n```\n# sample .actrc file\n-P ubuntu-latest=nektos/act-environments-ubuntu:18.04\n```\n\nAdditionally, act supports loading environment variables from an `.env` file. The default is to look in the working directory for the file but can be overridden by:\n\n```\nact --env-file my.env\n```\n\n# Events\n\nEvery [GitHub event](https://developer.github.com/v3/activity/events/types) is accompanied by a payload. You can provide these events in JSON format with the `--eventpath` to simulate specific GitHub events kicking off an action. For example:\n\n```pull-request.json\n{\n  \"pull_request\": {\n    \"head\": {\n      \"ref\": \"sample-head-ref\"\n    },\n    \"base\": {\n      \"ref\": \"sample-base-ref\"\n    }\n  }\n}\n```\n\n```\nact -e pull-request.json\n```\n\nAct will properly provide `github.head_ref` and `github.base_ref` to the action as expected.\n\n# Support\n\nNeed help? Ask on [Gitter](https://gitter.im/nektos/act)!\n\n# Contributing\n\nWant to contribute to act? Awesome! Check out the [contributing guidelines](CONTRIBUTING.md) to get involved.\n\n## Building from source\n\n- Install Go tools 1.11.4+ - (https://golang.org/doc/install)\n- Clone this repo `git clone git@github.com:nektos/act.git`\n- Pull the default docker image `docker pull nektos/act-environments-ubuntu:18.04`\n- Run unit tests with `make test`\n- Build and install: `make install`\n"