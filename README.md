This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy

`.github/workflows/deploy.yml`:

- **Pull request:** install, lint, `next build`. No secrets.
- **Push to `main`:** lint, then build the Docker image once and push `ghcr.io/idolrun/bidushi-portfolio:<commit-sha>`, Trivy scan (fails on fixable CRITICAL), then deploy over SSH (`production` environment).

On the VPS, `deploy/deploy.sh <sha>` pulls the image, records `IMAGE_TAG` in `.env`, restarts the container and health-checks `http://127.0.0.1:$APP_PORT/`. If the check fails it restores the previous tag and the job fails.

### VPS setup

Needs Docker with the compose plugin, plus `curl`. The app dir holds `.env`:

```
RAPIDAPI_KEY=...
APP_PORT=3005
```

nginx proxies to `127.0.0.1:$APP_PORT`.

### GitHub `production` environment secrets

| Secret | Value |
|---|---|
| `VPS_HOST` | VPS IP or hostname |
| `VPS_USER` | deploy user (in `docker` group) |
| `VPS_PORT` | SSH port (optional, default 22) |
| `VPS_APP_DIR` | absolute app dir path |
| `VPS_SSH_KEY` | private deploy key |
| `VPS_KNOWN_HOSTS` | output of `ssh-keyscan -p <port> <host>` |

### Rollback

On the VPS (image must be local or you must be logged in to GHCR):

```bash
cd <app dir> && ./deploy.sh <older-commit-sha>
```

Or re-run an older successful run's `deploy` job from the Actions tab; it deploys that run's sha.

Test the deploy script locally: `sh deploy/test-deploy.sh`.
