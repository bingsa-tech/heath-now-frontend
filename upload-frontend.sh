#!/bin/bash

# Déploiement frontend vers GitHub

# Arrête le script si une commande échoue
set -e  

# Vérifier si un message de commit a été fourni
if [ -z "$1" ]; then
  echo "❌ Usage: ./deploy-frontend.sh \"message de commit\""
  exit 1
fi

# Config Git (si pas déjà configuré globalement)
git config user.name "bingsa-tech"
git config user.email "ton_email@exemple.com"

# Vérifier si remote origin existe déjà
if git remote get-url origin > /dev/null 2>&1; then
  echo "✅ Remote 'origin' déjà configuré"
else
  echo "🔗 Ajout du remote GitHub..."
  git remote add origin https://github.com/bingsa-tech/heath-now-frontend.git
fi

# Étapes Git
echo "📂 Ajout des fichiers..."
git add .

echo "📝 Commit..."
git commit -m "$1" || echo "⚠️ Rien à commit"

echo "🌿 Création/Changement de branche main..."
git branch -M main

echo "🚀 Push vers GitHub..."
git push -u origin main

echo "✅ Déploiement terminé !"
