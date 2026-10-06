#!/bin/sh
# Self-check for deploy.sh using stub docker/curl. Run: sh deploy/test-deploy.sh
set -eu
ROOT=$(cd "$(dirname "$0")" && pwd)
T=$(mktemp -d)
trap 'rm -rf "$T"' EXIT
mkdir -p "$T/bin" "$T/app"
cp "$ROOT/deploy.sh" "$T/app/"

# docker stub: logs calls; curl stub: healthy unless running tag is "bad"
cat > "$T/bin/docker" <<'EOF'
#!/bin/sh
echo "docker $*" >> "$LOG"
EOF
cat > "$T/bin/curl" <<'EOF'
#!/bin/sh
grep -q '^IMAGE_TAG=bad$' "$APP/.env" && exit 7 || exit 0
EOF
printf '#!/bin/sh\n' > "$T/bin/sleep"
chmod +x "$T/bin/"*
export PATH="$T/bin:$PATH" LOG="$T/log" APP="$T/app"

printf 'RAPIDAPI_KEY=x\nAPP_PORT=3005\nIMAGE_TAG=good1\n' > "$T/app/.env"
chmod 600 "$T/app/.env"

# success: tag switches, secrets kept, permissions kept
sh "$T/app/deploy.sh" good2 >/dev/null
grep -q '^IMAGE_TAG=good2$' "$T/app/.env"
grep -q '^RAPIDAPI_KEY=x$' "$T/app/.env"
[ "$(grep -c '^IMAGE_TAG=' "$T/app/.env")" = 1 ]
ls -l "$T/app/.env" | grep -q '^-rw-------'

# failure: exits non-zero and rolls back to previous tag
if sh "$T/app/deploy.sh" bad >/dev/null 2>&1; then echo "FAIL: bad deploy succeeded"; exit 1; fi
grep -q '^IMAGE_TAG=good2$' "$T/app/.env"

echo "deploy.sh OK"
