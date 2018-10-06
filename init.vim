au BufRead,BufNewFile *.tw set filetype=task

map <leader>tS :TableSort!<CR>

au FileType task TableModeEnable
au FileType task set nowrap

au FileType task map <buffer> <leader>ll :call TaskShow('+READY')<CR>
au FileType task map <buffer> <leader>lf :call TaskShow('+READY +focus')<CR>
au FileType task map <buffer> <leader>lq :call TaskShow()<CR>

au FileType task map  <buffer> <leader>d :call TaskDone()<CR>
au FileType task vmap <buffer> <leader>d :call TaskDone()<CR>

au FileType task map  <buffer> <leader>D :call TaskDelete()<CR>
au FileType task vmap <buffer> <leader>D :call TaskDelete()<CR>

au FileType task map  <buffer> <leader>a :call TaskAppend()<CR>
au FileType task vmap <buffer> <leader>a :call TaskAppend()<CR>

au FileType task map  <buffer> <leader>1 :call TaskAppend('priority:L')<CR>
au FileType task vmap <buffer> <leader>1 :call TaskAppend('priority:L')<CR>

au FileType task map  <buffer> <leader>2 :call TaskAppend('priority:M')<CR>
au FileType task vmap <buffer> <leader>2 :call TaskAppend('priority:M')<CR>

au FileType task map  <buffer> <leader>3 :call TaskAppend('priority:H')<CR>
au FileType task vmap <buffer> <leader>3 :call TaskAppend('priority:H')<CR>

au FileType task map  <buffer> <leader>0 :call TaskAppend('priority:')<CR>
au FileType task vmap <buffer> <leader>0 :call TaskAppend('priority:')<CR>
