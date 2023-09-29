// Funciones para manejar la lista de servidores

function listServers(userId) {
    const serverListElement = document.getElementById('serverList');

    // Hacer una solicitud GET al servidor para obtener los servidores
    const serverUrl = "http://127.0.0.1:5000/member/user/" + userId;
    localStorage.setItem('user_id', userId);

    const a = document.getElementById("username");
    a.setAttribute('data-tooltip', userId);

    fetch(serverUrl, {
      method: 'GET',
      credentials: 'include'
    })
    .then(serverResponse => {
      if (serverResponse.status === 200) {
        return serverResponse.json()
        .then(servers => {
            console.log(servers);
          serverListElement.innerHTML = '';
          for (const server of servers) {
            const li = document.createElement('li');
            li.classList.add('decoration-no', 'mb-2');

            const a = document.createElement('a');
            a.setAttribute('title', server.user_id);

            const icon = document.createElement('i');
            icon.classList.add('fa-brands', 'fa-gg-circle', 'is-size-1');

            a.appendChild(icon);
            li.appendChild(a);

            serverListElement.appendChild(li); 

            // Agrega un evento clic a cada elemento de la lista de servidores
            li.addEventListener('click', function() {
              const serverId = server.member_id;
              showChannels(serverId);
            });
          }
        });
      } else if (serverResponse.status === 401) {
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
        localStorage.setItem('server_id', serverId);

        return response.json().then(channels => {
          const channelListElement = document.getElementById('channelList');
          channelListElement.innerHTML = '';
          for (const channel of channels) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            a.textContent = channel.name;
            li.appendChild(a);

            channelListElement.appendChild(li);

            li.addEventListener('click', function() {
            const channelId = channel.channel_id;
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
    
    localStorage.setItem('channel_id', channelId);

    // Verifica si la solicitud fue exitosa
    if (response.status === 200) {
      // Obtiene los mensajes del backend
      const messages = await response.json();
  
      // Ordena los mensajes por fecha
      messages.sort((a, b) => a.created_at - b.created_at);
  
      // Muestra la lista de mensajes en la página HTML
      const messageList = document.getElementById('messageList');;
      messageList.innerHTML = '';
      for (const message of messages) {

        const divRow = document.createElement('div');
        divRow.classList.add('row', 'mt-2');

        const divColumn = document.createElement('div');
        divColumn.classList.add('column', 'justify-content-flex-start');

        const divContainer = document.createElement('div');
        divContainer.classList.add('container', 'fluid', 'align-content-center', 'px-0');

        const innerDivRow = document.createElement('div');
        innerDivRow.classList.add('row');
        innerDivRow.style.flexGrow = '0';
        innerDivRow.style.flexShrink = '0';
        innerDivRow.style.maxWidth = 'fit-content';

        const innerDivColumn1 = document.createElement('div');
        innerDivColumn1.classList.add('column', 'has-min-width', 'align-items-center');

        const icon = document.createElement('i');
        icon.classList.add('fa-brands', 'fa-gg-circle', 'is-size-1');

        const innerDivColumn2 = document.createElement('div');
        innerDivColumn2.classList.add('column', 'mx-2', 'box');

        const paragraph = document.createElement('p');
        paragraph.style.maxWidth = '100%';

        console.log(message)

        paragraph.textContent = `${message.id_users}: ${message.content} - ${message.created}`;
        
        innerDivColumn1.appendChild(icon);
        innerDivColumn2.appendChild(paragraph);
        innerDivRow.appendChild(innerDivColumn1);
        innerDivRow.appendChild(innerDivColumn2);
        divContainer.appendChild(innerDivRow);
        divColumn.appendChild(divContainer);
        divRow.appendChild(divColumn);

        messageList.appendChild(divRow);
      }
    } else if (serverResponse.status === 401) {
      window.location.href = "login.html";
    } else {
      return response.json().then(data => {
        document.getElementById("message").innerHTML = data.message;
      });
    }
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
            document.getElementById("username").setAttribute('data-tooltip', data.username);
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
    getProfile();
});
