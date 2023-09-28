// Funciones para manejar la lista de servidores

function listServers(userId) {
    // Obtiene la lista de servidores del backend
    const serverUrl = "http://127.0.0.1:5000/member/user/" + userId;
    fetch(serverUrl, {
      method: 'GET',
      credentials: 'include'
    })
    .then(serverResponse => {
      if (serverResponse.status === 200) {
        return serverResponse.json().then(servers => {
          // Muestra la lista de servidores en la página HTML
          //console.log(serverResponse);
          const serverListElement = document.getElementById('serverList');
          //console.log(serverListElement);

          serverListElement.innerHTML = '';
          for (const server of servers) {
            const serverListItemElement = document.createElement('li');
            //console.log(serverListItemElement);
            //serverListItemElement.textContent = server.name;
            serverListItemElement.textContent = server.user_id;
            serverListElement.appendChild(serverListItemElement); 
            // Agrega un evento clic a cada elemento de la lista de servidores
            serverListItemElement.addEventListener('click', function() {
              // Obtiene el ID del servidor seleccionado
              const serverId = server.member_id;
              //console.log(serverId); 
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

            // Agrega un evento clic a cada elemento de la lista de canales
            channelListItemElement.addEventListener('click', function() {
            // Obtiene el nombre del canal seleccionado
            const channelId = channel.channel_id;
            //console.log(channelId)    
            // Muestra el canal seleccionado
            showChannel(channelId);
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
// Función para mostrar todos los mensajes del canal seleccionado ordenados por fecha
async function showChannel(channelId) {
    // Obtiene la lista de mensajes del canal seleccionado
    const messageUrl = "http://127.0.0.1:5000/message/channel/" + channelId;
    const response = await fetch(messageUrl, {
      method: 'GET',
      credentials: 'include'
    });
  
    // Verifica si la solicitud fue exitosa
    if (response.status === 200) {
      // Obtiene los mensajes del backend
      const messages = await response.json();
  
      // Ordena los mensajes por fecha
      messages.sort((a, b) => a.created_at - b.created_at);
  
      // Muestra la lista de mensajes en la página HTML
      const messageListElement = document.getElementById('messageList');
      messageListElement.innerHTML = '';
      for (const message of messages) {
        // Obtiene el nombre del usuario que creó el mensaje
        //console.log(message.id_users);
        const userName = await getUserName(message.id_users);
        //console.log(userName);  

        // Crea un elemento de lista para el mensaje
        const messageListItemElement = document.createElement('li');
        messageListItemElement.textContent = `${userName}: ${message.content} - ${message.created}`;
  
        // Agrega el elemento de lista a la lista de mensajes
        messageListElement.appendChild(messageListItemElement);
      }
    } else if (serverResponse.status === 401) {
      // Usuario no autenticado, redirigir a la página de inicio de sesión
      window.location.href = "login.html";
    } else {
      return response.json().then(data => {
        document.getElementById("message").innerHTML = data.message;
      });
    }
  }
  
  // Función para obtener el nombre del usuario a partir de su ID
  async function getUserName(userId) {
    // Realiza una solicitud GET al backend para obtener el usuario
    const userUrl = "http://127.0.0.1:5000/user/" + userId;
    const response = await fetch(userUrl);
  
    // Verifica si la solicitud fue exitosa
    if (response.status === 200) {
      // Obtiene el usuario del backend
      const user = await response.json();
  
      // Devuelve solo el nombre de usuario
      return user.username;
    } else {
      // Si la solicitud no fue exitosa, devuelve un error
      throw new Error("An error occurred while getting the user.");
    }
  }
  
  // Función para obtener el nombre del usuario a partir de su ID
  async function getUserName(userId) {
    // Realiza una solicitud GET al backend para obtener el usuario
    const userUrl = "http://127.0.0.1:5000/user/" + userId;
    const response = await fetch(userUrl);
  
    // Verifica si la solicitud fue exitosa
    if (response.status === 200) {
      // Obtiene el usuario del backend
      const user = await response.json();
  
      // Devuelve el nombre del usuario
      return user.username;
    } else {
      // Si la solicitud no fue exitosa, devuelve un error
      throw new Error("An error occurred while getting the user.");
    }
  }  
  




  //const channelId = showChannel();
  //console.log(channelId);




  
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

