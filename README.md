# nvim-taskwarrior - Neovim UI for Taskwarrior

## Install

### Using [vim-plug](https://github.com/junegunn/vim-plug)

In `~/.config/nvim/init.vim`

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

TODO 
    npm install
    npm run build

function! DoRemote(arg)
    UpdateRemotePlugins
endfunction

Plug 'yanick/nvim-taskwarrior', { 'do': function('NvimTwUpdate') }

TODO mention TableMode

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
