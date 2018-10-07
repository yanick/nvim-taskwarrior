au BufRead,BufNewFile *.tw set filetype=taskwarrior

map <leader>tS :TableSort!<CR>

au FileType taskwarrior TableModeEnable
au FileType taskwarrior set nowrap

au FileType taskwarrior map <buffer> <leader>ll :call TaskShow('+READY')<CR>
au FileType taskwarrior map <buffer> <leader>lf :call TaskShow('+READY +focus')<CR>
au FileType taskwarrior map <buffer> <leader>lq :call TaskShow()<CR>

au FileType taskwarrior map  <buffer> <leader>d :call TaskDone()<CR>
au FileType taskwarrior vmap <buffer> <leader>d :call TaskDone()<CR>

au FileType taskwarrior map  <buffer> <leader>D :call TaskDelete()<CR>
au FileType taskwarrior vmap <buffer> <leader>D :call TaskDelete()<CR>

au FileType taskwarrior map  <buffer> <leader>a :call TaskAppend()<CR>
au FileType taskwarrior vmap <buffer> <leader>a :call TaskAppend()<CR>

au FileType taskwarrior map  <buffer> <leader>1 :call TaskAppend('priority:L')<CR>
au FileType taskwarrior vmap <buffer> <leader>1 :call TaskAppend('priority:L')<CR>

au FileType taskwarrior map  <buffer> <leader>2 :call TaskAppend('priority:M')<CR>
au FileType taskwarrior vmap <buffer> <leader>2 :call TaskAppend('priority:M')<CR>

au FileType taskwarrior map  <buffer> <leader>3 :call TaskAppend('priority:H')<CR>
au FileType taskwarrior vmap <buffer> <leader>3 :call TaskAppend('priority:H')<CR>

au FileType taskwarrior map  <buffer> <leader>0 :call TaskAppend('priority:')<CR>
au FileType taskwarrior vmap <buffer> <leader>0 :call TaskAppend('priority:')<CR>
