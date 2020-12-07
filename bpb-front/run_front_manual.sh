BPBFRONT=$(dirname $0)
scriptname > /dev/null
npm --prefix $BPBFRONT install 
npm --prefix $BPBFRONT run start_manual 