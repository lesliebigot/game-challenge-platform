# 🤖 DEVOPS.md — Démarche DevOps pour GamerChallenge

# 1. Mise en place d’une CI (GitHub Actions)

Le projet intègre une pipeline simple permettant de :

- vérifier le code backend
- vérifier le code frontend
- garantir une qualité minimale à chaque push

## Fichier `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [ "main" ]

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Backend - install deps
      run: cd backend && npm install

    - name: Backend - lint
      run: cd backend && npx eslint .

    - name: Front - install deps
      run: cd front && npm install

    - name: Front - lint
      run: cd front && npx eslint .
```
