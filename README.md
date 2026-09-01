## Opción A — Levantar todo con docker

```bash
backend .env.templete -> .env
frontend .env.templete -> .env
docker-compose up -d --build
```

Esto levanta 3 contenedores: `postgres`, `backend` (puerto 3000) y `frontend` servido
con nginx (puerto 4200). Abrí `http://localhost:4200` y listo — el simulador ya está
mandando eventos.




