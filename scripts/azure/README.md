* Tutorial: Build and deploy your app to Azure Container Apps
  https://learn.microsoft.com/en-us/azure/container-apps/tutorial-code-to-cloud
* Introducing: `az containerapp up`
  https://www.youtube.com/watch?v=AeX0kZO9CRA

Create resource group
```sh
az group create --name myResourceGroup --location eastus
```

Create Azure Container Registry
```sh
az acr create --resource-group myResourceGroup --name myContainerRegistry --sku Basic
```

Build and push image to Azure Container Registry
```sh
az acr build -t mycontainerregistry.azurecr.io/myimage:latest --registry mycontainerregistry .
```

Create Azure Container Apps environment
```sh
az containerapp env create --resource-group myResourceGroup --name myContainerAppsEnvironment --location eastus
```

Create and deploy container app
```sh
az containerapp create \
  --resource-group myResourceGroup \
  --name myContainerApp \
  --location eastus \
  --image mycontainerregistry.azurecr.io/myimage:latest \
  --target-port 80 \
  --ingress external \
  --environment myContainerAppsEnvironment
```
