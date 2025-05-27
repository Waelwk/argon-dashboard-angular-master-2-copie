# Étape de build avec Node.js 20
FROM node:20 AS build

WORKDIR /app

# Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y libpcap-dev python3 make g++

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --configuration=production

# Étape de déploiement avec Nginx
FROM nginx:alpine

# Copier les fichiers Angular buildés
COPY --from=build /app/dist/ /usr/share/nginx/html

# Copier la config nginx personnalisée si nécessaire
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
