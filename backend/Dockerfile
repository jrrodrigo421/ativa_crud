FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONPATH=/app

RUN echo '#!/bin/bash\n\
echo "Configurações de ambiente:"\n\
echo "PORT: ${PORT:-8000}"\n\
echo "PYTHONPATH: ${PYTHONPATH}"\n\
echo "DATABASE_URL: ${DATABASE_URL}"\n\
\n\
# Verifica se a URL do banco de dados está definida\n\
if [ -z "${DATABASE_URL}" ]; then\n\
  echo "ERRO: A variável DATABASE_URL não está definida!"\n\
  exit 1\n\
fi\n\
\n\
# Verifica se a URL contém as credenciais\n\
if [[ ! "${DATABASE_URL}" =~ ://[^:]+:[^@]+@ ]]; then\n\
  echo "AVISO: A URL do banco de dados não parece conter credenciais válidas."\n\
  echo "Formato esperado: postgresql://usuario:senha@host:porta/banco"\n\
fi\n\
\n\
echo "Running migrations..."\n\
cd /app && PYTHONPATH=/app alembic upgrade head || echo "Migrations failed but continuing..."\n\
\n\
echo "Starting application..."\n\
cd /app && exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}' > /app/start.sh && \
    chmod +x /app/start.sh

CMD ["/app/start.sh"] 