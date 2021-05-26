## Deployment


Since there is no direct way to deploy the Cloud Run service via Cloud Build, i'm using the deployment script.
The tag of the docker image is set by the package.json version.

```bash
chmod +x ./backend/api/deploy.sh
./backend/api/deploy.sh
```