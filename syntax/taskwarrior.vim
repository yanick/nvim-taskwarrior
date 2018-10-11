syntax match priorityHigh / H / containedin=ALL
syntax match priorityMedium / M / containedin=ALL
syntax match priorityLow / L / containedin=ALL 

syntax match tag / +[a-z][a-z]*/ containedin=ALL
syntax match project / [^|]*>/ containedin=ALL 

syntax match annotations /\[N\]/ containedin=ALL

highlight priorityHigh ctermbg=7
highlight priorityMedium ctermbg=103
highlight priorityLow ctermbg=187

highlight tag ctermfg=103
highlight project ctermfg=red 

highlight annotations ctermfg=100
