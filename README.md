# stub-hub-clone-ms

install skaffold, docker, ingress controller, k8, google sdk

https://skaffold.dev/docs/install/#standalone-binary

## clear error >> this is unsafe

setup context for google cloud
https://cloud.google.com/sdk/docs/install-sdk

add the context 
gcloud container clusters get-credentials <clustername>


in GCE context run
* kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml
* kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml

update hosts to point to GCE
* update domain to resolve to the ip of the LB in clound env
- e.g 34.142.92.162 panda-tickets.dev

google: could not find default credentials. error?
* fix: gcloud auth application-default login


user express validator for validating data
https://www.npmjs.com/package/express-validator
https://express-validator.github.io/docs/

// generate a secret in k8
kubectl create secret generic jwt-secret --from-literal=JWT_KEY={asdf}
k get secrets