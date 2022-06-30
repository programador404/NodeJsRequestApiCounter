# API Requests Counter

Este serviço contabiliza as requisições com base nos limites de um usuário. Esses limites são planos de acesso que são adquiridos junto a [Mais Retorno](https://maisretorno.com).

Os limites são carregadas a partir das informações contidas no [Userdata](https://gitlab.com/maisretorno-tech/apis/accounts-api) para o [Redis](https://redis.io/) através de um endpoint específico. Cada requisição que o usuário faz, é debitado do montante adquirido.

## Pré-requisitos

- Redis instalado no cluster Kubernetes.
- Sealed Secret instalado no cluster Kubernetes.

## Rotas disponíveis

|Rota      |Descrição  |
|---       |---   |
|`/set_initial_limit/{email}/{initial_limit}`|Valor do limite inicial do usuário|
|`/check_limit/{email}`|Retorna o valor atual do limite do usuário|
|`/decrease_limit/{email}`|Decrementa do limite do usuário a cada requisição. Além disso, verifica se o limite do usuário. `> 0 = OK`, `< 0 = Limite excedido`|

## Como desenvolver?

Serão apresentadas 3 maneiras executar o projeto localmente para desenvolvimento. Via Minikube, Docker ou `npm`.

> :bulb: **Atenção**: Qualquer uma das 3 maneiras será necessário ter o Redis em execução.

### Usando Minukube

> :bulb: **Importante**: O `Minikube` e o `Kustomize` devem estar instalados na máquina local.

Iniciando o Minikube:

```
minikube start
```

Deploy do Redis Sentinel no Minikube utilizando [helm chart da Bitnami](https://github.com/bitnami/charts/tree/master/bitnami/redis/):

```
helm install my-redis bitnami/redis -f values.yaml --namespace redis
```

Conteudo do `values.yaml`:

```yaml
sentinel:
  enabled: true

auth:
  enabled: true
  sentinel: true
  password: "<password>"
```

Digite no terminal onde será utilizado o comando `docker build`:

```
eval $(minikube docker-env)
```

> :bulb: **Nota**: Isso possibilita que todos os builds das imagens Docker sejeam feitos diretamente do Minikube.

Após executado o comando anterior, basta fazer build da imagem Docker:

```
docker build -t api-requests-limit .
```

Deploy no Kubernetes

```
kustomize build k8s | kubectl apply -f -
```

Para acessar o serviço no K8s, utilize o `port-forward`:

```
kubectl port-forward --namespace api-requests-counter svc/api-requests-counter 3000
```

### Usando Docker

Execute: 

```
docker-compose up -d
```

Ou acrescente `--build` para toda vez quer for atualizar a imagem do projeto:

```
docker-compose up -d --build
```

### Usando diretamente via npm 

Execute diretamente no terminal:

```
npm run start
```

### Acessando o serviço

Para verificar se serviço está acessível:

```
curl http://localhost:3000/health
```

> :bulb: **Nota**: Se tudo estiver certo, deve retornar `{"status":"UP"}`.

## Referências

- https://ioredis.readthedocs.io/en/stable/README/
- https://github.com/luin/ioredis/issues/439
- https://github.com/luin/ioredis
- https://github.com/bitnami/charts/tree/master/bitnami/redis/