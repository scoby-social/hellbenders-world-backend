
# build docker image
gcloud builds submit --tag gcr.io/hellbenders-public/docker-image . --project hellbenders-public

# restart instances (this loads new images)
gcloud compute instance-groups managed rolling-action restart hellbenders-node-be-instance-group --zone us-central1-a  --project hellbenders-public
