#!/bin/bash

# Apagar y eliminar contenedores huérfanos
docker compose down --remove-orphans

# Construir y levantar los contenedores
docker compose up --build