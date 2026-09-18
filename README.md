## Primer paso tener Docker Desktop instalado
```` https://www.docker.com/products/docker-desktop ````

## Segundo paso entrar a la carpeta backend y frontend reemplazar los .env
```bash
backend .env.templete -> .env
frontend .env.templete -> .env
```

## Tercer paso ir a la carpeta raiz el proyecto donde se encuentra "docker-compose"
``Ejecuta el comando en consola``
```bash
docker-compose up -d --build
```

Esto levanta 3 contenedores: `postgresql - db`, `backend - Nestjs ` (puerto 3000) y `frontend - Angular` servidor en el (puerto 4200). Abrír `http://localhost:4200` y listo — el simulador ya esta




docker-compose down //remueve contenedor
docker-compose up -d //Levanta los cambios