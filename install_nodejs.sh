#!/bin/bash
wget -O- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh|bash
# New Shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
command -v nvm
nvm install node
echo 'Adding export PATH for binaries inside .bashrc'
echo 'export PATH=~/node_modules/.bin:$PATH' >> ~/.bashrc
echo 
echo "******RESTART TERMINAL****"
