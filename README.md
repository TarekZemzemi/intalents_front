# intalents_front

### fixes for running/deployments

####error when using `npm start` or `docker build`
```
resolve-url-loader: CSS error
source-map information is not available at url() declaration (found orphan CR, try removeCR option)
```
goto `node_modules` -> `resolve-url-loader` -> `index.js`, 
and set `removeCR: true`

### resources
#### tutos from ms
```
https://portal.azure.com/?l=en.en-us#blade/Microsoft_Azure_ContainerService/ConnectToClusterBlade/resourceId/%2Fsubscriptions%2F567370dd-1d41-4fbc-9e2d-1f8ab6b5d6a5%2Fresourcegroups%2FRG-INTALENTS%2Fproviders%2FMicrosoft.ContainerService%2FmanagedClusters%2FAKS-INTALENTS
https://azure.microsoft.com/fr-fr/get-started/services/kubernetes-service/?subscriptionId=567370dd-1d41-4fbc-9e2d-1f8ab6b5d6a5
https://docs.microsoft.com/en-us/azure/aks/tutorial-kubernetes-prepare-app
```
#### github repo
```
https://github.com/TarekZemzemi/intalents_front
```
#### docker images from / based on
```
https://tiangolo.medium.com/react-in-docker-with-nginx-built-with-multi-stage-docker-builds-including-testing-8cc49d6ec305
https://hub.docker.com/r/fitiavana07/nginx-react
```
