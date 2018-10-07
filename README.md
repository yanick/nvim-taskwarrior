TODO 
    npm install
    npm run build

function! DoRemote(arg)
    UpdateRemotePlugins
endfunction

Plug 'yanick/nvim-taskwarrior', { 'do': function('DoRemote') }



To debug:

    $ export NVIM_NODE_LOG_FILE /tmp/nvim-tw.log
    $ nvim foo.tw
