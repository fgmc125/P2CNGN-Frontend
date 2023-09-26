// servers.js
// Funciones para manejar la lista de servidores

// servers.js
// Funciones para manejar la lista de servidores

window.addEventListener('load', function () {
    getProfile();
});

//document.getElementById("logout").addEventListener("click", logout);

function getProfile() {
    const url = "http://127.0.0.1:5000/user/profile";
    
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {

                document.getElementById("username").innerText = data.username;

                // Corregido: Obtener la lista de servidores del backend
                const serverUrl = "http://127.0.0.1:5000/server/list_user/" + data.user_id;
                fetch(serverUrl, {
                    method: 'GET',
                    credentials: 'include'
                })
                .then(serverResponse => {
                    if (serverResponse.status === 200) {
                        return serverResponse.json().then(servers => {
                            // Mostrar la lista de servidores en la página HTML
                            const serverListElement = document.getElementById('serverList');
                            for (const server of servers) {
                                const serverListItemElement = document.createElement('li');
                                serverListItemElement.textContent = server.name;
                                serverListElement.appendChild(serverListItemElement);
                            }
                        });
                    } else if (serverResponse.status === 401) {
                        // Usuario no autenticado, redirigir a la página de inicio de sesión
                        window.location.href = "login.html";
                    } else {
                        return serverResponse.json().then(data => {
                            document.getElementById("message").innerHTML = data.message;
                        });
                    }
                })
                .catch(error => {
                    document.getElementById("message").innerHTML = "An error occurred.";
                });
            });
        } else if (response.status === 401) {
            // Usuario no autenticado, redirigir a la página de inicio de sesión
            window.location.href = "login.html";
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}


function loadServers() {
    // Cargar la lista de servidores del usuario desde el backend
    
    const url = "http://127.0.0.1:5000/user/";
        
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {

                document.getElementById("username").innerText = data.username;
                
            });
        } else if (response.status === 401) {
            // Usuario no autenticado, redirigir a la página de inicio de sesión
            window.location.href = "login.html";
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });


}

function selectServer(serverId) {
    // Cargar la lista de canales del servidor seleccionado
}

function createServer() {
    // Crear un nuevo servidor y actualizar la lista
}

document.addEventListener('DOMContentLoaded', () => {
    // Obtener la lista de servidores del usuario desde la API
    fetch('http://127.0.0.1:5000/servers/1', {
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
