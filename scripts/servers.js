// servers.js
// Funciones para manejar la lista de servidores

function loadServers() {
    // Cargar la lista de servidores del usuario desde el backend
}

function selectServer(serverId) {
    // Cargar la lista de canales del servidor seleccionado
}

function createServer() {
    // Crear un nuevo servidor y actualizar la lista
}

document.addEventListener('DOMContentLoaded', () => {
    // Obtener la lista de servidores del usuario desde la API
    fetch('http://127.0.0.1:5000/user/servers', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        const serverList = document.getElementById('serverList');
        serverList.innerHTML = ''; // Limpiar la lista antes de agregar elementos

        // Iterar a través de los servidores y crear elementos HTML
        data.forEach(server => {
            const serverItem = document.createElement('li');
            serverItem.textContent = server.name;

            // Agregar un evento para seleccionar el servidor
            serverItem.addEventListener('click', () => {
                // Llamar a una función para cargar los canales del servidor
                loadChannels(server.id);
            });

            serverList.appendChild(serverItem);
        });
    })
    .catch(error => {
        console.error('Error al obtener la lista de servidores:', error);
    });
});

// Función para cargar los canales de un servidor seleccionado
function loadChannels(serverId) {
    // Realizar una solicitud a la API para obtener los canales del servidor
    fetch(`http://127.0.0.1:5000/server/${serverId}/channels`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        const channelList = document.getElementById('channelList');
        channelList.innerHTML = ''; // Limpiar la lista antes de agregar elementos

        // Iterar a través de los canales y crear elementos HTML
        data.forEach(channel => {
            const channelItem = document.createElement('li');
            channelItem.textContent = channel.name;

            // Agregar un evento para seleccionar el canal
            channelItem.addEventListener('click', () => {
                // Llamar a una función para cargar los mensajes del canal
                loadMessages(channel.id);
            });

            channelList.appendChild(channelItem);
        });
    })
    .catch(error => {
        console.error('Error al obtener la lista de canales:', error);
    });
}

// Puedes seguir un enfoque similar para cargar mensajes y manejar el envío de mensajes.
