BPBBACK=$(dirname $0)
scriptname > /dev/null
npm --prefix $BPBBACK install 
npm --prefix $BPBBACK run start_manual 