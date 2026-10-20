#!/bin/bash
# Switch which portfolio version seifeddineslimene.com and www serve.
# The chosen version's own subdomain redirects to https://www.seifeddineslimene.com.
# Usage: sudo promote v1|v2|v3|v4
set -euo pipefail

VERSION="${1:-}"
case "$VERSION" in
  v1|v2|v3|v4) ;;
  *)
    echo "Usage: sudo promote v1|v2|v3|v4"
    exit 1
    ;;
esac

if [ "$(id -u)" -ne 0 ]; then
  echo "Run as root: sudo promote $VERSION"
  exit 1
fi

PORTFOLIO=/etc/nginx/sites-available/portfolio.conf
VERSIONS=/etc/nginx/sites-available/portfolio-versions.conf
STATE=/var/www/portfolio/live-version
APEX_CERT=seifeddineslimene.com
V1_CERT=v1.seifeddineslimene.com
SHARED_CERT=v2.seifeddineslimene.com

backup() {
  cp "$PORTFOLIO" "${PORTFOLIO}.bak"
  cp "$VERSIONS" "${VERSIONS}.bak"
}

restore() {
  mv "${PORTFOLIO}.bak" "$PORTFOLIO"
  mv "${VERSIONS}.bak" "$VERSIONS"
}

static_block() {
  local names="$1"
  local root="$2"
  local cert="$3"
  cat <<EOF
server {
    listen 443 ssl http2;
    server_name ${names};

    ssl_certificate /etc/letsencrypt/live/${cert}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${cert}/privkey.pem;

    root ${root};
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2?)\$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }
}
EOF
}

proxy_block() {
  local names="$1"
  local port="$2"
  local cert="$3"
  cat <<EOF
server {
    listen 443 ssl http2;
    server_name ${names};

    ssl_certificate /etc/letsencrypt/live/${cert}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${cert}/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:${port};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
}

redirect_block() {
  local names="$1"
  local cert="$2"
  cat <<EOF
server {
    listen 443 ssl http2;
    server_name ${names};

    ssl_certificate /etc/letsencrypt/live/${cert}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${cert}/privkey.pem;

    return 301 https://www.seifeddineslimene.com\$request_uri;
}
EOF
}

version_block() {
  local version="$1"
  local names="$2"
  local cert="$3"
  if [ "$version" = "$VERSION" ]; then
    redirect_block "$names" "$cert"
    return
  fi
  case "$version" in
    v1) static_block "$names" /var/www/portfolio/current "$cert" ;;
    v2) static_block "$names" /var/www/portfolio/releases/v2 "$cert" ;;
    v3) proxy_block "$names" 3003 "$cert" ;;
    v4) proxy_block "$names" 3004 "$cert" ;;
  esac
}

live_block() {
  local names="seifeddineslimene.com www.seifeddineslimene.com"
  case "$VERSION" in
    v1) static_block "$names" /var/www/portfolio/current "$APEX_CERT" ;;
    v2) static_block "$names" /var/www/portfolio/releases/v2 "$APEX_CERT" ;;
    v3) proxy_block "$names" 3003 "$APEX_CERT" ;;
    v4) proxy_block "$names" 3004 "$APEX_CERT" ;;
  esac
}

backup

cat > "$PORTFOLIO" <<EOF
server {
    listen 80;
    server_name seifeddineslimene.com www.seifeddineslimene.com v1.seifeddineslimene.com v2.seifeddineslimene.com v3.seifeddineslimene.com v4.seifeddineslimene.com;

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/letsencrypt;
        default_type "text/plain";
    }

    location / {
        return 301 https://\$host\$request_uri;
    }
}

$(live_block)

$(version_block v1 v1.seifeddineslimene.com "$V1_CERT")
EOF

cat > "$VERSIONS" <<EOF
$(version_block v2 v2.seifeddineslimene.com "$SHARED_CERT")

$(version_block v3 v3.seifeddineslimene.com "$SHARED_CERT")

$(version_block v4 v4.seifeddineslimene.com "$SHARED_CERT")
EOF

if ! nginx -t; then
  restore
  echo "Nginx test failed. Previous configuration restored."
  exit 1
fi

rm -f "${PORTFOLIO}.bak" "${VERSIONS}.bak"
echo "$VERSION" > "$STATE"
systemctl reload nginx
echo "Live version is ${VERSION}. https://${VERSION}.seifeddineslimene.com redirects to https://www.seifeddineslimene.com"
