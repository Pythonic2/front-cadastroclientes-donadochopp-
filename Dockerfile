FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY index.html ./
COPY styles.css ./
COPY script.js ./
COPY chopeiras2.png ./
COPY logo-dona-chopp.png ./
COPY fundo-praia.jpg ./
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3002
CMD ["nginx", "-g", "daemon off;"]
