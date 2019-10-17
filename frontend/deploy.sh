#rm -rf node_modules
npm run build
AWS_PROFILE=perfsys aws s3 rm s3://aws-website-cloud-reports --recursive
AWS_PROFILE=perfsys aws s3 sync ./dist s3://aws-website-cloud-reports --exclude=node_modules/*
