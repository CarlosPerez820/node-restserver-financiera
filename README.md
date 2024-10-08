# WebServer + Restserver

Recordar agregar los modulos de Node

Lista de comandos para LightSail AWS
sudo apt-get update              # Actualiza la lista de paquetes disponibles
sudo apt-get upgrade             # Actualiza los paquetes instalados

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -  # Añade el repositorio de Node.js 14.x
sudo apt-get install -y nodejs   # Instala Node.js y npm
node --version                   # Muestra la versión de Node.js instalada
npm --version                    # Muestra la versión de npm instalada

sudo apt-get install libcap2-bin # Instala el paquete libcap2-bin
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\`` # Permite que Node.js use puertos privilegiados

sudo npm install pm2 -g          # Instala PM2 globalmente
pm2 ls                           # Lista los procesos gestionados por PM2
pm2 startup                      # Configura PM2 para que se inicie automáticamente

sudo apt-get install git         # Instala Git
git clone https://github.com/JeovaniMartinez/Ge...  # Clona un repositorio de Git
cp .env.example .env             # Copia el archivo .env.example a .env

nano .env                        # Abre el archivo .env en el editor nano
npm install                      # Instala las dependencias de Node.js
pm2 start app.js                 # Inicia la aplicación con PM2
pm2 save                         # Guarda la lista de procesos gestionados por PM2