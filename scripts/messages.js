// messages.js
// Funciones para manejar los mensajes del chat

function loadMessages(channelId) {
    // Cargar los mensajes del canal seleccionado desde el backend
}

function sendMessage(message) {
    // Enviar un nuevo mensaje al canal seleccionado y actualizar la lista de mensajes
}

document.addEventListener('DOMContentLoaded', () => {
    // Llama a una función para cargar mensajes por defecto (por ejemplo, mensajes generales)
    loadDefaultMessages();
});

// Función para cargar mensajes de un canal seleccionado
function loadMessages(channelId) {
    // Realizar una solicitud a la API para obtener los mensajes del canal
    fetch(`http://127.0.0.1:5000/channel/${channelId}/messages`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        const messageList = document.getElementById('messageList');
        messageList.innerHTML = ''; // Limpiar la lista antes de agregar elementos

        // Iterar a través de los mensajes y crear elementos HTML
        data.forEach(message => {
            const messageItem = document.createElement('li');
            messageItem.textContent = `${message.author}: ${message.content}`;
            messageList.appendChild(messageItem);
        });
    })
    .catch(error => {
        console.error('Error al obtener los mensajes:', error);
    });
}

// Función para enviar un nuevo mensaje al canal actual
document.getElementById('sendMessage').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const channelId = currentChannelId/* Obtener el ID del canal actual */;
    const messageContent = messageInput.value;

    // Realizar una solicitud a la API para enviar el mensaje
    fetch(`http://127.0.0.1:5000/channel/${channelId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: messageContent }),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 201) {
            // Mensaje enviado con éxito, puedes realizar alguna acción adicional si es necesario
            messageInput.value = ''; // Limpiar el cuadro de texto
        } else {
            console.error('Error al enviar el mensaje:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error al enviar el mensaje:', error);
    });
});
