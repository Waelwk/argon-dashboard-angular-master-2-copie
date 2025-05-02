# Étape de build avec Node.js
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration=production

# Étape de déploiement avec Nginx
FROM nginx:alpine

# Supprimer la config par défaut
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/argon-dashboard-angular /usr/share/nginx/html/ui/app1/


# Copier la configuration personnalisée de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
