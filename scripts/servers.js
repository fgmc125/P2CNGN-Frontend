// Funciones para manejar la lista de servidores

function listServers(userId) {
    // Obtiene la lista de servidores del backend
    const serverUrl = "http://127.0.0.1:5000/server/list_user/" + userId;
    fetch(serverUrl, {
      method: 'GET',
      credentials: 'include'
    })
    .then(serverResponse => {
      if (serverResponse.status === 200) {
        return serverResponse.json().then(servers => {
          // Muestra la lista de servidores en la página HTML
          console.log(serverResponse);
          const serverListElement = document.getElementById('serverList');
          console.log(serverListElement);

          serverListElement.innerHTML = '';
          for (const server of servers) {
            const serverListItemElement = document.createElement('li');
            console.log(serverListItemElement);
            serverListItemElement.textContent = server.name;
            serverListElement.appendChild(serverListItemElement); 
            // Agrega un evento clic a cada elemento de la lista de servidores
            serverListItemElement.addEventListener('click', function() {
              // Obtiene el ID del servidor seleccionado
              const serverId = server.server_id;
              console.log(serverId); 
              // Muestra los canales del servidor seleccionado
              showChannels(serverId);
            });
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
  }
  
  function showChannels(serverId) {
    // Obtiene la lista de canales del servidor seleccionado
    const channelUrl = "http://127.0.0.1:5000/channel/server/" + serverId;
    fetch(channelUrl, {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      if (response.status === 200) {
        return response.json().then(channels => {
          // Muestra la lista de canales en la página HTML
          const channelListElement = document.getElementById('channelList');
          channelListElement.innerHTML = '';
          for (const channel of channels) {
            const channelListItemElement = document.createElement('li');
            channelListItemElement.textContent = channel.name;
            channelListElement.appendChild(channelListItemElement);
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
  }
  
  function getProfile() {
    const url = "http://127.0.0.1:5000/user/profile";
    fetch(url, {
        method: "GET",
        credentials: "include"
    })
    .then(async response => {
        if (response.status === 200) {
            const data = await response.json();
            document.getElementById("username").innerText = data.username;
            listServers(data.user_id);
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

// Función para iniciar el proceso al cargar la página
window.addEventListener("load", function() {
    // Llama a la función getProfile()
    getProfile();
  });

