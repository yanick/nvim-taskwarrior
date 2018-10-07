# nvim-taskwarrior - Neovim UI for Taskwarrior

TODO 
    npm install
    npm run build

function! DoRemote(arg)
    UpdateRemotePlugins
endfunction

Plug 'yanick/nvim-taskwarrior', { 'do': function('DoRemote') }

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
