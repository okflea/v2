## Deployment Steps

### Build & Push Images:

Build your Docker images for service1 and service2 (using your provided Dockerfiles) and push them to your registry:
```
docker build -t yourdockerhubusername/service1:latest ./service1
docker build -t yourdockerhubusername/service2:latest ./service2
docker push yourdockerhubusername/service1:latest
docker push yourdockerhubusername/service2:latest
```


### Deploy to Kubernetes:

Apply the manifests:
```
kubectl apply -f k8s/combined-deployment.yaml
kubectl apply -f k8s/service1-service.yaml
kubectl apply -f k8s/service2-service.yaml
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/redis-service.yaml
kubectl apply -f k8s/ingress.yaml
```


### Test Horizontal Scaling:

Increase the number of replicas in `combined-deployment.yaml` (or use `kubectl scale deployment combined-services --replicas=<number>`) and test that your socket connections remain stable. Because service1 and service2 are packaged together, the socket connection (once established) will remain inside the same pod even if new pods are added.

### Verify Connectivity:

Use `kubectl get pods,services,ingress` to verify that all resources are running as expected. Also, test access via your Ingress URL (e.g. `http://yourdomain.com/service1` and `/service2`).
