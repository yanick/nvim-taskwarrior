map <leader>tS :TableSort!<CR>

TableModeEnable
set nowrap

map <buffer> <leader>ll :call TaskShow('+READY')<CR>
map <buffer> <leader>lf :call TaskShow('+READY +focus')<CR>
map <buffer> <leader>lq :call TaskShow()<CR>

map  <buffer> <leader>d :call TaskDone()<CR>
vmap <buffer> <leader>d :call TaskDone()<CR>

map  <buffer> <leader>D :call TaskDelete()<CR>
vmap <buffer> <leader>D :call TaskDelete()<CR>

map  <buffer> <leader>a :call TaskAppend()<CR>
vmap <buffer> <leader>a :call TaskAppend()<CR>

map  <buffer> <leader>i :call TaskInfo()<CR>
vmap <buffer> <leader>i :call TaskInfo()<CR>

map  <buffer> <leader>1 :call TaskAppend('priority:L')<CR>
vmap <buffer> <leader>1 :call TaskAppend('priority:L')<CR>

map  <buffer> <leader>2 :call TaskAppend('priority:M')<CR>
vmap <buffer> <leader>2 :call TaskAppend('priority:M')<CR>

map  <buffer> <leader>3 :call TaskAppend('priority:H')<CR>
vmap <buffer> <leader>3 :call TaskAppend('priority:H')<CR>

map  <buffer> <leader>0 :call TaskAppend('priority:')<CR>
vmap <buffer> <leader>0 :call TaskAppend('priority:')<CR>
