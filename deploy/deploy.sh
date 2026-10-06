#!/bin/sh
# Usage: ./deploy.sh <image-tag>
# Runs on the VPS from the app dir. Switches to <image-tag>, health-checks,
# and rolls back to the previous tag if the new container never becomes healthy.
set -eu
cd "$(dirname "$0")"

NEW="${1:?usage: deploy.sh <image-tag>}"
touch .env
PREV=$(sed -n 's/^IMAGE_TAG=//p' .env)
PORT=$(sed -n 's/^APP_PORT=//p' .env)
PORT="${PORT:-3000}"

set_tag() {
  # rewrite in place (cat >) so .env keeps its permissions
  { grep -v '^IMAGE_TAG=' .env || true; echo "IMAGE_TAG=$1"; } > .env.tmp
  cat .env.tmp > .env && rm .env.tmp
}

healthy() {
  for _ in $(seq 30); do
    curl -fsS -o /dev/null "http://127.0.0.1:$PORT/" && return 0
    sleep 2
  done
  return 1
}

IMAGE_TAG="$NEW" docker compose pull
set_tag "$NEW"

if docker compose up -d --remove-orphans && healthy; then
  echo "Deployed $NEW"
  # keep a week of images locally so rollback works without the registry
  docker image prune -af --filter "until=168h"
  exit 0
fi

echo "Health check failed for $NEW" >&2
docker compose logs --tail 50 web >&2 || true

if [ -n "$PREV" ] && [ "$PREV" != "$NEW" ]; then
  set_tag "$PREV"
  docker compose up -d --remove-orphans
  if healthy; then echo "Rolled back to $PREV" >&2; else echo "Rollback to $PREV is unhealthy too" >&2; fi
fi
exit 1
