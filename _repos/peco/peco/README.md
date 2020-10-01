"# peco\n\nSimplistic interactive filtering tool\n\n*NOTE*: If you are viewing this on GitHub, this document refers to the state of `peco` in whatever current branch you are viewing, _not_ necessarily the state of a currently released version. Please make sure to checkout the [Changes](./Changes) file for features and changes.\n\nThis README is long and comprehensive. Use the [Table of Contents](#table-of-contents) to navigate to the section that interests you. It has been placed at the bottom of the README file because of its length.\n\n> If you use peco, please consider sponsoring the authors of this project from the \"Sponsor\" button on the project page at https://github.com/peco/peco. Sponsorship plans start at $1 :)\n\n# Description\n\n`peco` (pronounced *peh-koh*) is based on a python tool, [percol](https://github.com/mooz/percol). `percol` was darn useful, but I wanted a tool that was a single binary, and forget about python. `peco` is written in Go, and therefore you can just grab [the binary releases](https://github.com/peco/peco/releases) and drop it in your $PATH.\n\n`peco` can be a great tool to filter stuff like logs, process stats, find files, because unlike grep, you can type as you think and look through the current results.\n\nFor basic usage, continue down below. For more cool elaborate usage samples, [please see the wiki](https://github.com/peco/peco/wiki/Sample-Usage), and if you have any other tricks you want to share, please add to it!\n\n## Demo\n\nDemos speak more than a thousand words! Here's me looking for a process on my mac. As you can see, you can page through your results, and you can keep changing the query:\n\n![Executed `ps -ef | peco`, then the query `root` was typed. This shows all lines containing the word root](http://peco.github.io/images/peco-demo-ps.gif)\n\nHere's me trying to figure out which file to open:\n\n![Executed `find . -name '*.go' | peco` (within camlistore repository), then the query `camget` was typed. This shows all lines including the word `camget`](http://peco.github.io/images/peco-demo-filename.gif)\n\nWhen you combine tools like zsh, peco, and [ghq](https://github.com/motemen/ghq), you can make managing/moving around your huge dev area a piece of cake! (this example doesn't use zsh functions so you can see what I'm doing)\n\n![Executed `cd $(ghq list --full-path | peco --query peco)` to show all repositories containing the word `peco`, then to change directories into the one selected](http://peco.github.io/images/peco-demo-ghq.gif)\n\n\n# Features\n\n## Incremental Search\n\nSearch results are filtered as you type. This is great to drill down to the\nline you are looking for\n\nMultiple terms turn the query into an \"AND\" query:\n\n![Executed `ps aux | peco`, then the query `root app` was typed. This shows all lines containing both `root` and `app`](http://peco.github.io/images/peco-demo-multiple-queries.gif)\n\nWhen you find that line that you want, press enter, and the resulting line\nis printed to stdout, which allows you to pipe it to other tools\n\n## Select Multiple Lines\n\nYou can select multiple lines! (this example uses C-Space)\n\n![Executed `ls -l | peco`, then used peco.ToggleSelection to select multiple lines](http://peco.github.io/images/peco-demo-multiple-selection.gif)\n\n## Select Range Of Lines\n\nNot only can you select multiple lines one by one, you can select a range of lines (Note: The ToggleRangeMode action is not enabled by default. You need to put a custom key binding in your config file)\n\n![Executed `ps -ef | peco`, then used peco.ToggleRangeMode to select a range of lines](http://peco.github.io/images/peco-demo-range-mode.gif)\n\n## Select Filters\n\nDifferent types of filters are available. Default is case-insensitive filter, so lines with any case will match. You can toggle between IgnoreCase, CaseSensitive, SmartCase, Regexp and Fuzzy filters.\n\nThe SmartCase filter uses case-*insensitive* matching when all of the queries are lower case, and case-*sensitive* matching otherwise.\n\nThe Regexp filter allows you to use any valid regular expression to match lines.\n\nThe Fuzzy filter allows you to find matches using partial patterns. For example, when searching for `ALongString`, you can enable the Fuzzy filter and search `ALS` to find it. The Fuzzy filter uses smart case search like the SmartCase filter.\n\n![Executed `ps aux | peco`, then typed `google`, which matches the Chrome.app under IgnoreCase filter type. When you change it to Regexp filter, this is no longer the case. But you can type `(?i)google` instead to toggle case-insensitive mode](http://peco.github.io/images/peco-demo-matcher.gif)\n\n## Selectable Layout\n\nAs of v0.2.5, if you would rather not move your eyes off of the bottom of the screen, you can change the screen layout by either providing the `--layout=bottom-up` command line option, or set the `Layout` variable in your configuration file\n\n![Executed `ps -ef | peco --layout=bottom-up` to toggle inverted layout mode](http://peco.github.io/images/peco-demo-layout-bottom-up.gif)\n\n## Works on Windows!\n\nI have been told that peco even works on windows :) Look ma! I'm not lying!\n\n![Showing peco running on Windows cmd.exe](https://gist.githubusercontent.com/taichi/26814518d8b00352693b/raw/b7745987de32dbf068e81a8308c0c5ed38138649/peco.gif)\n\n# Installation\n\n### Just want the binary?\n\nGo to the [releases page](https://github.com/peco/peco/releases), find the version you want, and download the zip file. Unpack the zip file, and put the binary to somewhere you want (on UNIX-y systems, /usr/local/bin or the like). Make sure it has execution bits turned on. Yes, it is a single binary! You can put it anywhere you want :)\n\n_THIS IS THE RECOMMENDED WAY_ (except for macOS homebrew users)\n\n### macOS (Homebrew, Scarf)\n\nIf you're on macOS and want to use homebrew:\n\n```\nbrew install peco\n```\n\nor with Scarf:\n\n```\nscarf install peco\n```\n\n### Debian and Ubuntu based distributions (APT, Scarf)\n\nThere is an official Debian package that can be installed via APT:\n\n```\napt install peco\n```\n\nor with Scarf:\n\n```\nscarf install peco\n```\n\n### Void Linux (XBPS)\n\n```\nxbps-install -S peco\n```\n\n### Arch Linux (AUR)\n\n```\nyay -S peco\n```\n\n### Windows (Chocolatey NuGet Users)\n\nThere's a third-party [peco package available](https://chocolatey.org/packages/peco) for Chocolatey NuGet.\n\n```\nC:\\> choco install peco\n```\n\n### Building peco yourself\n\nMake sure to clone the source code under $GOPATH (i.e. $GOPATH/src/github.com/peco/peco). This is required\nas the main binary refers to an internal package, which requires that the source code be located in\nthe correct package location.\n\nNavigate to the directory above, then run:\n\n```\nmake build\n```\n\nThis will do the following:\n\n1. Run `go build` to create `releases/$VERSION_NUMBER/peco`\n\nYou can copy the binary to somewhere in your $PATH, and it should just work.\n\nThe above installs the correct versions of peco's dependencies. Then build it:\n\n```\ngo build cmd/peco/peco.go\n```\n\nThis compiles a peco binary in the root of the cloned peco repository. Copy this file to an appropriate location.\n\n### go get IS NOT RECOMMENDED\n\nPlease DO NOT use `go get` to install this tool. It bypasses the developers' intention of controlling the dependency versioning.\n\n# Command Line Options\n\n### -h, --help\n\nDisplay a help message\n\n### --version\n\nDisplay the version of peco\n\n### --query <query>\n\nSpecifies the default query to be used upon startup. This is useful for scripts and functions where you can figure out before hand what the most likely query string is.\n\n### --print-query\n\nWhen exiting, prints out the query typed by the user as the first line of output. The query will be printed even if there are no matches, if the program is terminated normally (i.e. enter key). On the other hand, the query will NOT be printed if the user exits via a cancel (i.e. esc key).\n\n### --rcfile <filename>\n\nPass peco a configuration file, which currently must be a JSON file. If unspecified it will try a series of files by default. See `Configuration File` for the actual locations searched.\n\n### -b, --buffer-size <num>\n\nLimits the buffer size to `num`. This is an important feature when you are using peco against a possibly infinite stream, as it limits the number of lines that peco holds at any given time, preventing it from exhausting all the memory. By default the buffer size is unlimited.\n\n### --null\n\nWARNING: EXPERIMENTAL. This feature will probably stay, but the option name may change in the future.\n\nChanges how peco interprets incoming data. When this flag is set, you may insert NUL ('\\0') characters in your input. Anything before the NUL character is treated as the string to be displayed by peco and is used for matching against user query. Anything after the NUL character is used as the \"result\": i.e., when peco is about to exit, it displays this string instead of the original string displayed.\n\n[Here's a simple example of how to use this feature](https://gist.github.com/mattn/3c7a14c1677ecb193acd)\n\n### --initial-index\n\nSpecifies the initial line position upon start up. E.g. If you want to start out with the second line selected, set it to \"1\" (because the index is 0 based).\n\n### --initial-filter `IgnoreCase|CaseSensitive|SmartCase|Regexp|Fuzzy`\n\nSpecifies the initial filter to use upon start up. You should specify the name of the filter like `IgnoreCase`, `CaseSensitive`, `SmartCase`, `Regexp` and `Fuzzy`. Default is `IgnoreCase`.\n\n### --prompt\n\nSpecifies the query line's prompt string. When specified, takes precedence over the configuration file's `Prompt` section. The default value is `QUERY>`.\n\n### --layout `top-down|bottom-up`\n\nSpecifies the display layout. Default is `top-down`, where query prompt is at the top, followed by the list, then the system status message line. `bottom-up` changes this to the list first (displayed in reverse order), the query prompt, and then the system status message line.\n\nFor `percol` users, `--layout=bottom-up` is almost equivalent of `--prompt-bottom --result-bottom-up`.\n\n### --select-1\n\nWhen specified *and* the input contains exactly 1 line, peco skips prompting you for a choice, and selects the only line in the input and immediately exits.\n\nIf there are multiple lines in the input, the usual selection view is displayed.\n\n### --on-cancel `success|error`\n\nSpecifies the exit status to use when the user cancels the query execution.\nFor historical and back-compatibility reasons, the default is `success`, meaning if the user cancels the query, the exit status is 0. When you choose `error`, peco will exit with a non-zero value.\n\n### --selection-prefix `string`\n\nWhen specified, peco uses the specified prefix instead of changing line color to indicate currently selected line(s). default is to use colors. This option is experimental.\n\n### --exec `string`\n\nWhen specified, peco executes the specified external command (via shell), with peco's currently selected line(s) as its input from STDIN.\n\nUpon exiting from the external command, the control goes back to peco where you can keep browsing your search buffer, and to possibly execute your external command repeatedly afterwards.\n\nTo exit out of peco when running in this mode, you must execute the Cancel command, usually the escape key.\n\n# Configuration File\n\npeco by default consults a few locations for the config files.\n\n1. Location specified in --rcfile. If this doesn't exist, peco complains and exits\n2. $XDG\\_CONFIG\\_HOME/peco/config.json\n3. $HOME/.config/peco/config.json\n4. for each directory listed in $XDG\\_CONFIG\\_DIRS, $DIR/peco/config.json\n5. If all else fails, $HOME/.peco/config.json\n\nBelow are configuration sections that you may specify in your config file:\n\n* [Global](#global)\n* [Keymaps](#keymaps)\n* [Styles](#styles)\n* [CustomFilter](#customfilter)\n* [Prompt](#prompt)\n* [InitialMatcher](#initialmatcher)\n* [Use256Color](#use256color)\n\n## Global\n\nGlobal configurations that change the global behavior.\n\n### Prompt\n\nYou can change the query line's prompt, which is `QUERY>` by default.\n\n```json\n{\n    \"Prompt\": \"[peco]\"\n}\n```\n\n### InitialMatcher\n\n*InitialMatcher* has been deprecated. Please use `InitialFilter` instead.\n\n### InitialFilter\n\nSpecifies the filter name to start peco with. You should specify the name of the filter, such as `IgnoreCase`, `CaseSensitive`, `SmartCase`, `Regexp` and `Fuzzy`.\n\n### StickySelection\n\n```json\n{\n    \"StickySelection\": true\n}\n```\n\nStickySelection allows selections to persist even between changes to the query.\nFor example, when you set this to true you can select a few lines, type in a\nnew query, select those lines, and then delete the query. The result is all\nthe lines that you selected before and after the modification to the query are\nleft intact.\n\nDefault value for StickySelection is false.\n\n### OnCancel\n\n```json\n{\n    \"OnCancel\": \"error\"\n}\n```\n\nOnCancel is equivalent to `--on-cancel` command line option.\n\n### MaxScanBufferSize\n\n```json\n{\n    \"MaxScanBufferSize\": 256\n}\n```\n\nControls the buffer sized (in kilobytes) used by `bufio.Scanner`, which is\nresponsible for reading the input lines. If you believe that your input has\nvery long lines that prohibit peco from reading them, try increasing this number.\n\nThe same time, the default MaxScanBuferSize is 256kb.\n\n## Keymaps\n\nExample:\n\n```json\n{\n    \"Keymap\": {\n        \"M-v\": \"peco.ScrollPageUp\",\n        \"C-v\": \"peco.ScrollPageDown\",\n        \"C-x,C-c\": \"peco.Cancel\"\n    }\n}\n```\n\n### Key sequences\n\nAs of v0.2.0, you can use a list of keys (separated by comma) to register an action that is associated with a key sequence (instead of a single key). Please note that if there is a conflict in the key map, *the longest sequence always wins*. So In the above example, if you add another sequence, say, `C-x,C-c,C-c`, then the above `peco.Cancel` will never be invoked.\n\n### Combined actions\n\nAs of v0.2.1, you can create custom combined actions. For example, if you find yourself repeatedly needing to select 4 lines out of the list, you may want to define your own action like this:\n\n```json\n{\n    \"Action\": {\n        \"foo.SelectFour\": [\n            \"peco.ToggleRangeMode\",\n            \"peco.SelectDown\",\n            \"peco.SelectDown\",\n            \"peco.SelectDown\",\n            \"peco.ToggleRangeMode\"\n        ]\n    },\n    \"Keymap\": {\n        \"M-f\": \"foo.SelectFour\"\n    }\n}\n```\n\nThis creates a new combined action `foo.SelectFour` (the format of the name is totally arbitrary, I just like to put namespaces), and assigns that action to `M-f`. When it's fired, it toggles the range selection mode and highlights 4 lines, and then goes back to waiting for your input.\n\nAs a similar example, a common idiom in emacs is that `C-c C-c` means \"take the contents of this buffer and accept it\", whatever that means.  This adds exactly that keybinding:\n\n```json\n{\n    \"Action\": {\n        \"selectAllAndFinish\": [\n            \"peco.SelectAll\",\n            \"peco.Finish\"\n        ]\n    },\n    \"Keymap\": {\n        \"C-c,C-c\": \"selectAllAndFinish\"\n    }\n}\n```\n\n### Available keys\n\nSince v0.1.8, in addition to values below, you may put a `M-` prefix on any\nkey item to use Alt/Option key as a mask.\n\n| Name        | Notes |\n|-------------|-------|\n| C-a ... C-z | Control + whatever character |\n| C-2 ... C-8 | Control + 2..8 |\n| C-[         ||\n| C-]         ||\n| C-~         ||\n| C-\\_        ||\n| C-\\\\\\\\      | Note that you need to escape the backslash |\n| C-/         ||\n| C-Space     ||\n| F1 ... F12  ||\n| Esc         ||\n| Tab         ||\n| Enter       ||\n| Insert      ||\n| Delete      ||\n| BS          ||\n| BS2         ||\n| Home        ||\n| End         ||\n| Pgup        ||\n| Pgdn        ||\n| ArrowUp     ||\n| ArrowDown   ||\n| ArrowLeft   ||\n| ArrowRight  ||\n| MouseLeft   ||\n| MouseMiddle ||\n| MouseRight  ||\n\n\n### Key workarounds\n\nSome keys just... don't map correctly / too easily for various reasons. Here, we'll list possible workarounds for key sequences that are often asked for:\n\n\n| You want this | Use this instead | Notes             |\n|---------------|------------------|-------------------|\n| Shift+Tab     | M-\\[,Z           | Verified on macOS |\n\n### Available actions\n\n| Name | Notes |\n|------|-------|\n| peco.ForwardChar        | Move caret forward 1 character |\n| peco.BackwardChar       | Move caret backward 1 character |\n| peco.ForwardWord        | Move caret forward 1 word |\n| peco.BackwardWord       | Move caret backward 1 word|\n| peco.BackToInitialFilter| Switch to first filter in the list |\n| peco.BeginningOfLine    | Move caret to the beginning of line |\n| peco.EndOfLine          | Move caret to the end of line |\n| peco.EndOfFile          | Delete one character forward, otherwise exit from peco with failure status |\n| peco.DeleteForwardChar  | Delete one character forward |\n| peco.DeleteBackwardChar | Delete one character backward |\n| peco.DeleteForwardWord  | Delete one word forward |\n| peco.DeleteBackwardWord | Delete one word backward |\n| peco.InvertSelection    | Inverts the selected lines |\n| peco.KillBeginningOfLine | Delete the characters under the cursor backward until the beginning of the line |\n| peco.KillEndOfLine      | Delete the characters under the cursor until the end of the line |\n| peco.DeleteAll          | Delete all entered characters |\n| peco.RefreshScreen      | Redraws the screen. Note that this effectively re-runs your query |\n| peco.SelectPreviousPage | (DEPRECATED) Alias to ScrollPageUp |\n| peco.SelectNextPage     | (DEPRECATED) Alias to ScrollPageDown |\n| peco.ScrollPageDown     | Moves the selected line cursor for an entire page, downwards |\n| peco.ScrollPageUp       | Moves the selected line cursor for an entire page, upwards |\n| peco.SelectUp           | Moves the selected line cursor to one line above |\n| peco.SelectDown         | Moves the selected line cursor to one line below |\n| peco.SelectPrevious     | (DEPRECATED) Alias to SelectUp |\n| peco.SelectNext         | (DEPRECATED) Alias to SelectDown |\n| peco.ScrollLeft         | Scrolls the screen to the left |\n| peco.ScrollRight        | Scrolls the screen to the right |\n| peco.ScrollFirstItem    | Scrolls to the first item (in the entire buffer, not the current screen) |\n| peco.ScrollLastItem     | Scrolls to the last item (in the entire buffer, not the current screen) |\n| peco.ToggleSelection    | Selects the current line, and saves it |\n| peco.ToggleSelectionAndSelectNext | Selects the current line, saves it, and proceeds to the next line |\n| peco.ToggleSingleKeyJump | Enables SingleKeyJump mode a.k.a. \"hit-a-hint\" |\n| peco.SelectNone         | Remove all saved selections |\n| peco.SelectAll          | Selects the all line, and save it  |\n| peco.SelectVisible      | Selects the all visible line, and save it |\n| peco.ToggleSelectMode   | (DEPRECATED) Alias to ToggleRangeMode |\n| peco.CancelSelectMode   | (DEPRECATED) Alias to CancelRangeMode |\n| peco.ToggleQuery        | Toggle list between filterd by query and not filterd. |\n| peco.ToggleRangeMode   | Start selecting by range, or append selecting range to selections |\n| peco.CancelRangeMode   | Finish selecting by range and cancel range selection |\n| peco.RotateMatcher     | (DEPRECATED) Use peco.RotateFilter |\n| peco.RotateFilter       | Rotate between filters (by default, ignore-case/no-ignore-case)|\n| peco.Finish             | Exits from peco with success status |\n| peco.Cancel             | Exits from peco with failure status, or cancel select mode |\n\n\n### Default Keymap\n\nNote: If in case below keymap seems wrong, check the source code in [keymap.go](https://github.com/peco/peco/blob/master/keymap.go) (look for NewKeymap).\n\n|Key|Action|\n|---|------|\n|Esc|peco.Cancel|\n|C-c|peco.Cancel|\n|Enter|peco.Finish|\n|C-f|peco.ForwardChar|\n|C-a|peco.BeginningOfLine|\n|C-b|peco.BackwardChar|\n|C-d|peco.DeleteForwardChar|\n|C-e|peco.EndOfLine|\n|C-k|peco.KillEndOfLine|\n|C-u|peco.KillBeginningOfLine|\n|BS|peco.DeleteBackwardChar|\n|C-8|peco.DeleteBackwardChar|\n|C-w|peco.DeleteBackwardWord|\n|C-g|peco.SelectNone|\n|C-n|peco.SelectDown|\n|C-p|peco.SelectUp|\n|C-r|peco.RotateFilter|\n|C-t|peco.ToggleQuery|\n|C-Space|peco.ToggleSelectionAndSelectNext|\n|ArrowUp|peco.SelectUp|\n|ArrowDown|peco.SelectDown|\n|ArrowLeft|peco.ScrollPageUp|\n|ArrowRight|peco.ScrollPageDown|\n\n## Styles\n\nFor now, styles of following 5 items can be customized in `config.json`.\n\n```json\n{\n    \"Style\": {\n        \"Basic\": [\"on_default\", \"default\"],\n        \"SavedSelection\": [\"bold\", \"on_yellow\", \"white\"],\n        \"Selected\": [\"underline\", \"on_cyan\", \"black\"],\n        \"Query\": [\"yellow\", \"bold\"],\n        \"Matched\": [\"red\", \"on_blue\"]\n    }\n}\n```\n\n- `Basic` for not selected lines\n- `SavedSelection` for lines of saved selection\n- `Selected` for a currently selecting line\n- `Query` for a query line\n- `Matched` for a query matched word\n\n### Foreground Colors\n\n- `\"black\"` for `termbox.ColorBlack`\n- `\"red\"` for `termbox.ColorRed`\n- `\"green\"` for `termbox.ColorGreen`\n- `\"yellow\"` for `termbox.ColorYellow`\n- `\"blue\"` for `termbox.ColorBlue`\n- `\"magenta\"` for `termbox.ColorMagenta`\n- `\"cyan\"` for `termbox.ColorCyan`\n- `\"white\"` for `termbox.ColorWhite`\n- `\"0\"`-`\"255\"` for 256color ([Use256Color](#use256color) must be enabled)\n\n### Background Colors\n\n- `\"on_black\"` for `termbox.ColorBlack`\n- `\"on_red\"` for `termbox.ColorRed`\n- `\"on_green\"` for `termbox.ColorGreen`\n- `\"on_yellow\"` for `termbox.ColorYellow`\n- `\"on_blue\"` for `termbox.ColorBlue`\n- `\"on_magenta\"` for `termbox.ColorMagenta`\n- `\"on_cyan\"` for `termbox.ColorCyan`\n- `\"on_white\"` for `termbox.ColorWhite`\n- `\"on_0\"`-`\"on_255\"` for 256color ([Use256Color](#use256color) must be enabled)\n\n### Attributes\n\n- `\"bold\"` for fg: `termbox.AttrBold`\n- `\"underline\"` for fg: `termbox.AttrUnderline`\n- `\"reverse\"` for fg: `termbox.AttrReverse`\n- `\"on_bold\"` for bg: `termbox.AttrBold` (this attribute actually makes the background blink on some platforms/environments, e.g. linux console, xterm...)\n\n## CustomFilter\n\nThis is an experimental feature. Please note that some details of this specification may change\n\nBy default `peco` comes with `IgnoreCase`, `CaseSensitive`, `SmartCase`, `Regexp` and `Fuzzy` filters, but since v0.1.3, it is possible to create your own custom filter.\n\nThe filter will be executed via  `Command.Run()` as an external process, and it will be passed the query values in the command line, and the original unaltered buffer is passed via `os.Stdin`. Your filter must perform the matching, and print out to `os.Stdout` matched lines. Your filter MAY be called multiple times if the buffer\ngiven to peco is big enough. See `BufferThreshold` below.\n\nNote that currently there is no way for the custom filter to specify where in the line the match occurred, so matched portions in the string WILL NOT BE HIGHLIGHTED.\n\nThe filter does not need to be a go program. It can be a perl/ruby/python/bash script, or anything else that is executable.\n\nOnce you have a filter, you must specify how the matcher is spawned:\n\n```json\n{\n    \"CustomFilter\": {\n        \"MyFilter\": {\n            \"Cmd\": \"/path/to/my-matcher\",\n            \"Args\": [ \"$QUERY\" ],\n            \"BufferThreshold\": 100\n        }\n    }\n}\n```\n\n`Cmd` specifies the command name. This must be searcheable via `exec.LookPath`.\n\nElements in the `Args` section are string keys to array of program arguments. The special token `$QUERY` will be replaced with the unaltered query as the user typed in (i.e. multiple-word queries will be passed as a single string). You may pass in any other arguments in this array. If you omit this in your config, a default value of `[]string{\"$QUERY\"}` will be used\n\n`BufferThreshold` specifies that the filter command should be invoked when peco has this many lines to process\nin the buffer. For example, if you are using peco against a 1000-line input, and your `BufferThreshold` is 100 (which is the default), then your filter will be invoked 10 times. For obvious reasons, the larger this threshold is, the faster the overall performance will be, but the longer you will have to wait to see the filter results.\n\nYou may specify as many filters as you like in the `CustomFilter` section.\n\n### Examples\n\n* [An example of a simple perl regexp matcher](https://gist.github.com/mattn/24712964da6e3112251c)\n* [An example using migemogrep Japanese grep using latin-1 chars](https://github.com/peco/peco/wiki/CustomFilter)\n\n## Layout\n\nSee --layout.\n\n## SingleKeyJump\n\n```\n{\n  \"SingleKeyJump\": {\n    \"ShowPrefix\": true\n  }\n}\n```\n\n## SelectionPrefix\n\n`SelectionPrefix` is equivalent to using `--selection-prefix` in the command line.\n\n```\n{\n  \"SelectionPrefix\": \">\"\n}\n```\n\n## Use256Color\n\nBoolean value that determines whether or not to use 256color. The default is `false`.\n\nNote: This has no effect on Windows because Windows console does not support extra color modes.\n\n```json\n{\n    \"Use256Color\": true\n}\n```\n\n# FAQ\n\n## Does peco work on (msys2|cygwin)?\n\nNo. https://github.com/peco/peco/issues/336#issuecomment-243939696\n(Updated Feb 23, 2017: \"Maybe\" on cygwin https://github.com/peco/peco/issues/336#issuecomment-281912949)\n\n## Non-latin fonts (e.g. Japanese) look weird on my Windows machine...?\n\nAre you using raster fonts? https://github.com/peco/peco/issues/341\n\n## Seeing escape sequences `[200~` and `[201~` when pasting text?\n\nDisable bracketed paste mode. https://github.com/peco/peco/issues/417\n\n# Hacking\n\nFirst, fork this repo, and get your clone locally.\n\n1. Make sure you have [go](http://golang.org) installed, with GOPATH appropriately set\n2. Make sure you have `make` installed\n3. Run `make installdeps` (You only need to do this once)\n\nTo test, run\n\n```\nmake test\n```\n\nTo build, run\n\n```\nmake build\n```\n\nThis will create a `peco` binary in `$(RELEASE_DIR)/peco_$(GOOS)_$(GOARCH)/peco$(SUFFIX)`. Or, of course, you can just run\n\n```\ngo build cmd/peco/peco.go\n```\n\nwhich will create the binary in the local directory.\n\n# TODO\n\nUnit test it.\n\n# AUTHORS\n\n* Daisuke Maki (lestrrat)\n* mattn\n* syohex\n\n# CONTRIBUTORS\n\n* HIROSE Masaaki\n* Joel Segerlind\n* Lukas Lueg\n* Mitsuoka Mimura\n* Ryota Arai\n* Shinya Ohyanagi\n* Takashi Kokubun\n* Yuya Takeyama\n* cho45\n* cubicdaiya\n* kei\\_q\n* negipo\n* sona\\_tar\n* sugyan\n* swdyh\n* MURAOKA Taro (kaoriya/koron), for aho-corasick search\n* taichi, for the gif working on Windows\n* uobikiemukot\n* Samuel Lemaitre\n* Yousuke Ushiki\n* Linda\\_pp\n* Tomohiro Nishimura (Sixeight)\n* Naruki Tanabe (narugit)\n\n# Notes\n\nObviously, kudos to the original percol: https://github.com/mooz/percol\nMuch code stolen from https://github.com/mattn/gof\n\n# Table of Contents\n\n<!-- START doctoc generated TOC please keep comment here to allow auto update -->\n<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->\n\n\n- [peco](#peco)\n- [Description](#description)\n  - [Demo](#demo)\n- [Features](#features)\n  - [Incremental Search](#incremental-search)\n  - [Select Multiple Lines](#select-multiple-lines)\n  - [Select Range Of Lines](#select-range-of-lines)\n  - [Select Filters](#select-filters)\n  - [Selectable Layout](#selectable-layout)\n  - [Works on Windows!](#works-on-windows)\n- [Installation](#installation)\n    - [Just want the binary?](#just-want-the-binary)\n    - [macOS (Homebrew, Scarf)](#macos-homebrew-scarf)\n    - [Debian and Ubuntu based distributions (APT, Scarf)](#debian-and-ubuntu-based-distributions-apt-scarf)\n    - [Void Linux (XBPS)](#void-linux-xbps)\n    - [Arch Linux (AUR)](#arch-linux-aur)\n    - [Windows (Chocolatey NuGet Users)](#windows-chocolatey-nuget-users)\n    - [Building peco yourself](#building-peco-yourself)\n    - [go get IS NOT RECOMMENDED](#go-get-is-not-recommended)\n- [Command Line Options](#command-line-options)\n    - [-h, --help](#-h---help)\n    - [--version](#--version)\n    - [--query <query>](#--query-query)\n    - [--print-query](#--print-query)\n    - [--rcfile <filename>](#--rcfile-filename)\n    - [-b, --buffer-size <num>](#-b---buffer-size-num)\n    - [--null](#--null)\n    - [--initial-index](#--initial-index)\n    - [--initial-filter `IgnoreCase|CaseSensitive|SmartCase|Regexp|Fuzzy`](#--initial-filter-ignorecasecasesensitivesmartcaseregexpfuzzy)\n    - [--prompt](#--prompt)\n    - [--layout `top-down|bottom-up`](#--layout-top-downbottom-up)\n    - [--select-1](#--select-1)\n    - [--on-cancel `success|error`](#--on-cancel-successerror)\n    - [--selection-prefix `string`](#--selection-prefix-string)\n    - [--exec `string`](#--exec-string)\n- [Configuration File](#configuration-file)\n  - [Global](#global)\n    - [Prompt](#prompt)\n    - [InitialMatcher](#initialmatcher)\n    - [InitialFilter](#initialfilter)\n    - [StickySelection](#stickyselection)\n    - [OnCancel](#oncancel)\n    - [MaxScanBufferSize](#maxscanbuffersize)\n  - [Keymaps](#keymaps)\n    - [Key sequences](#key-sequences)\n    - [Combined actions](#combined-actions)\n    - [Available keys](#available-keys)\n    - [Key workarounds](#key-workarounds)\n    - [Available actions](#available-actions)\n    - [Default Keymap](#default-keymap)\n  - [Styles](#styles)\n    - [Foreground Colors](#foreground-colors)\n    - [Background Colors](#background-colors)\n    - [Attributes](#attributes)\n  - [CustomFilter](#customfilter)\n    - [Examples](#examples)\n  - [Layout](#layout)\n  - [SingleKeyJump](#singlekeyjump)\n  - [SelectionPrefix](#selectionprefix)\n  - [Use256Color](#use256color)\n- [FAQ](#faq)\n  - [Does peco work on (msys2|cygwin)?](#does-peco-work-on-msys2cygwin)\n  - [Non-latin fonts (e.g. Japanese) look weird on my Windows machine...?](#non-latin-fonts-eg-japanese-look-weird-on-my-windows-machine)\n  - [Seeing escape sequences `[200~` and `[201~` when pasting text?](#seeing-escape-sequences-200-and-201-when-pasting-text)\n- [Hacking](#hacking)\n- [TODO](#todo)\n- [AUTHORS](#authors)\n- [CONTRIBUTORS](#contributors)\n- [Notes](#notes)\n- [Table of Contents](#table-of-contents)\n\n<!-- END doctoc generated TOC please keep comment here to allow auto update -->\n"