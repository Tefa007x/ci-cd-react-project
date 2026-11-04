#!/usr/bin/env bash
#
# install.sh - Java 21, Jenkins (LTS), Docker CE and Ansible on Ubuntu 24.04
#
# Usage (as the default "ubuntu" user):
#   chmod +x install.sh
#   ./install.sh


set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

# Use sudo unless we're already root
if [ "$(id -u)" -eq 0 ]; then SUDO=""; else SUDO="sudo"; fi

# The login user that should be allowed to run docker without sudo
TARGET_USER="${SUDO_USER:-${USER:-ubuntu}}"

log() { printf '\n\033[1;32m==> %s\033[0m\n' "$*"; }

#------------------------------------------------------------------
log "1/6 Updating apt and installing base packages"
#------------------------------------------------------------------
$SUDO apt-get update -y
$SUDO apt-get install -y \
  ca-certificates curl wget gnupg lsb-release \
  software-properties-common fontconfig
$SUDO install -m 0755 -d /etc/apt/keyrings

#------------------------------------------------------------------
log "2/6 Installing Java (OpenJDK 21)"
# Java must be installed BEFORE Jenkins, otherwise the service fails to start.
#------------------------------------------------------------------
$SUDO apt-get install -y openjdk-21-jdk-headless
java -version

#------------------------------------------------------------------
log "3/6 Installing Jenkins (LTS)"
#------------------------------------------------------------------
$SUDO curl -fsSL -o /etc/apt/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key

echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" \
  | $SUDO tee /etc/apt/sources.list.d/jenkins.list > /dev/null

$SUDO apt-get update -y
$SUDO apt-get install -y jenkins
$SUDO systemctl enable --now jenkins

#------------------------------------------------------------------
log "4/6 Installing Docker Engine"
#------------------------------------------------------------------
$SUDO curl -fsSL -o /etc/apt/keyrings/docker.asc \
  https://download.docker.com/linux/ubuntu/gpg
$SUDO chmod a+r /etc/apt/keyrings/docker.asc

. /etc/os-release
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu ${UBUNTU_CODENAME:-$VERSION_CODENAME} stable" \
  | $SUDO tee /etc/apt/sources.list.d/docker.list > /dev/null

$SUDO apt-get update -y
$SUDO apt-get install -y \
  docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin
$SUDO systemctl enable --now docker

#------------------------------------------------------------------
log "5/6 Installing Ansible"
#------------------------------------------------------------------
$SUDO add-apt-repository --yes --update ppa:ansible/ansible
$SUDO apt-get install -y ansible

#------------------------------------------------------------------
log "6/6 Adding users to the docker group"
#------------------------------------------------------------------
$SUDO usermod -aG docker "$TARGET_USER"
$SUDO usermod -aG docker jenkins

# Restart Jenkins so it picks up its new docker group membership
$SUDO systemctl restart jenkins

#------------------------------------------------------------------
log "Done. Installed versions:"
#------------------------------------------------------------------
java -version 2>&1 | head -n 1
$SUDO docker --version
ansible --version | head -n 1
echo "Jenkins: $(systemctl is-active jenkins)"

#------------------------------------------------------------------
log "the initial Jenkins admin password:"
#------------------------------------------------------------------
sudo cat /var/lib/jenkins/secrets/initialAdminPassword

cat <<EOF

--------------------------------------------------------------
Next steps
--------------------------------------------------------------
1. Log out and back in (or run: newgrp docker) so that user
   "$TARGET_USER" can run docker without sudo. Test with:
       docker run hello-world

2. Jenkins runs on port 8080. Make sure the SC-Jenkins security
   group allows inbound TCP 8080 from your IP, then open:
       http://<instance-public-ip>:8080
--------------------------------------------------------------
EOF
