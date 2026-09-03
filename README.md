## Primer paso tener Docker Desktop instalado
```` https://www.docker.com/products/docker-desktop ````

## Segundo paso entrar a la carpeta backend y frontend reemplazar los .env
```bash
backend .env.templete -> .env
frontend .env.templete -> .env
```

## Tercer paso ir a la carpeta raiz el proyecto donde de encuentra "docker-compose"
``Ejecuebta el comando en consola``
```bash
docker-compose up -d --build
```

Esto levanta 3 contenedores: `postgres - db`, `backend - Nestjs ` (puerto 3000) y `frontend - Angular` servido
con ene el (puerto 4200). Abrí `http://localhost:4200` y listo — el simulador ya est




docker-compose down //remueve contedor
docker-compose up -d //Levanta los cambios