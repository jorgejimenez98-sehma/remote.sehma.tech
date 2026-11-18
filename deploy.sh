#!/bin/bash

# Exit on error
set -e

# Function to extract values from .git/config
get_git_config_value() {
    local key=$1
    git config --get "$key"
}

# Read FTP configuration from .git/config
FTP_HOST=$(get_git_config_value "git-ftp.url")
FTP_USER=$(get_git_config_value "git-ftp.user")
FTP_PASS=$(get_git_config_value "git-ftp.password")

# Check if required variables are set
if [[ -z "$FTP_HOST" || -z "$FTP_USER" || -z "$FTP_PASS" ]]; then
    echo "Error: Missing FTP credentials in .git/config"
    exit 1
fi

echo "Cleaning remote directory: /public/build/"
lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" <<EOF
set ssl:verify-certificate no
cd /public/
rm -r build
bye
EOF

echo "Uploading local public/build files to remote server..."
lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" <<EOF
set ssl:verify-certificate no
mirror -R public/build/ /public/build/
bye
EOF

echo "Deployment completed successfully!"
