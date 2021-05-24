# Workspace setup

## Oh MyZSH

### quickz-sh

A simple script to setup an awesome shell environment. Quickly install and setup zsh and oh-my-zsh.
[Quickz-sh] (<https://github.com/jotyGill/quickz-sh>)

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install git
git clone https://github.com/jotyGill/quickz-sh.git
cd quickz-sh
./quickz.sh -c   
```

Change theme to default in

```bash
ZSH_THEME="robbyrussell"
```

exit the vm and reload.

## Install softwares

### Nodejs

```bash
sudo apt-get install curl -y
```

```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
```

```bash
sudo apt-get install -y nodejs
```

### Yarn

```bash
sudo npm install -g yarn
```

### Java

```bash
sudo apt install openjdk-11-jdk -y
```

### Firebase Tools

```bash
sudo npm install -g firebase-tools
```

### GCP SDK

```bash
curl https://sdk.cloud.google.com > install.sh

bash install.sh --disable-prompts
```

add gcloud to zsh

add to .zshrc

```bash
export CLOUDSDK_PYTHON=/usr/bin/python3.8

# The next line updates PATH for the Google Cloud SDK.
if [ -f '/home/vagrant/google-cloud-sdk/path.zsh.inc' ]; then . '/home/vagrant/google-cloud-sdk/path.zsh.inc'; fi

# The next line enables shell command completion for gcloud.
if [ -f '/home/vagrant/google-cloud-sdk/completion.zsh.inc' ]; then . '/home/vagrant/google-cloud-sdk/completion.zsh.inc'; fi

```

### Meilisearch

```bash
bash <(curl -Ls https://gist.githubusercontent.com/CorneilleEdi/4ea9d53ffa4a682440a25f7e8533ea8e/raw/4439e6e2010ae8694aecdfbc32c2dc5741949a3b/meilisearch-nginx-dev.sh)
```

### Docker

```bash
 curl -fsSL https://get.docker.com -o get-docker.sh
 sudo sh get-docker.sh
```

Reload VM

## Configure workspace

Create a Google Cloud Project called `tiptapflow`.
Enable Firebase for the GCP project

## Login with firebase

```bash
firebase login --no-localhost
```

## Setup gcloud

Usually use the App engine service account but i'm going to connect to the user

```bash
gcloud auth login --no-launch-browser
```

Create config

```bash
gcloud init
```

activate config and Enable some services

```bash
gcloud config configurations activate tiptapflow


gcloud services enable appengine.googleapis.com cloudbuild.googleapis.com compute.googleapis.com containerregistry.googleapis.com
```

for development purpose,create and download a service account key related to app engine (editor role)

```bash
gcloud config set compute/region asia-south1
gcloud config set compute/zone asia-south1-b
```

```bash
gcloud iam service-accounts keys list --iam-account tiptapflow@appspot.gserviceaccount.com
```

Create key

```bash
gcloud iam service-accounts keys  create app-engine-sa-credentials.json --iam-account tiptapflow@appspot.gserviceaccount.com
```

Create a keys folders and move the file app-engine-sa-credentials.json in to the folder.

### Install components

```bash
gcloud components install cloud-firestore-emulator pubsub-emulator cloud-build-local
```

### Add env vars

```bash
export GCP_PROJECT=tiptapflow
export GOOGLE_APPLICATION_CREDENTIALS=/home/vagrant/keys/app-engine-sa-credentials.json
export GOOGLE_CREDENTIALS=$GOOGLE_APPLICATION_CREDENTIALS
```

## Install Dev apps

### NestJS

```bash
sudo npm i -g @nestjs/cli
```


## Connect VSCode

Add vagrant ssh config to the .ssh/config file