#!/bin/bash
BASEDIR = $(dirname $0)
tput setaf 1;
echo "$(cat ./res/banner_shadow.txt)";
tput sgr0;
(./bpb-front/run_front_manual.sh) &
(./bpb-back/run_back_manual.sh) &
