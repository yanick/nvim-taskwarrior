# nvim-taskwarrior - Neovim UI for Taskwarrior

## Install 

This plugin requires the plugin
[dhruvasagar/vim-table-mode](https://github.com/dhruvasagar/vim-table-mode)
to be installed.

### Install using [vim-plug](https://github.com/junegunn/vim-plug)

In `~/.config/nvim/init.vim`, add:

    call plug#begin('~/.config/nvim/plugged')

    Plug 'dhruvasagar/vim-table-mode', {
        \ 'on': [ 'TableModeEnable' ]
    \ }

    function! NvimTwUpdate(args)
        !npm install 
            " npm could also be yarn or pnpm
        UpdateRemotePlugins
    endfunction

    Plug 'yanick/nvim-taskwarrior', { 'do': function('NvimTwUpdate') }

    call plug#end()

Then, still within neovim, unleash `plugged`:

    :PlugInstall 

That (hopefully) is it. Enjoy!

## How to use 

To enable the mappings and syntaxt highlights, either open
a `.tw` file, or do `:set filetype=taskwarrior`.

## Functions 

    TaskShow( [ filters ] )

    TaskDone()
    TaskDelete()

    TaskAppend()

## Mappings

defined in ``./ftplugin/taskwarrior.vim`.

\L is the leader key.

Most mappings work in both normal and visual mode.

| map | command |
| --- | --- |
| \L ll | TaskShow('+READY')|
| \L lf | TaskShow('+READY +focus')|
| \L lq | TaskShow()|
| ||
| \L d | TaskDone()|
| \L D | TaskDelete()|
| ||
| \L a | TaskAppend()|
| ||
| \L 1 | TaskAppend('priority:L')|
| \L 2 | TaskAppend('priority:M')|
| \L 3 | TaskAppend('priority:H')|
| \L 0 | TaskAppend('priority:')|

## Debugging

    $ export NVIM_NODE_LOG_FILE /tmp/nvim-tw.log
    $ nvim foo.tw
