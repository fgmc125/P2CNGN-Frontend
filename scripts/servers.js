// Funciones para manejar la lista de servidores

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

                                // Agrega un evento clic a cada elemento de la lista de servidores
                                serverListItemElement.addEventListener('click', function() {
                                    // Obtiene el ID del servidor seleccionado
                                    const serverId = server.id;

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

window.addEventListener('load', function () {

  // Llama a la función getProfile()
  getProfile();

});

// Crea una función para mostrar los canales del servidor seleccionado
function showChannels(serverId) {
  // Obtiene la lista de canales del servidor seleccionado
  const channelUrl = "http://127.0.0.1:5000/channel/server/" + 1;
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
      // Usuario no autenticado, redirigir a la página de inicio de sesion
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
