/* Funcionalidades para abrir y cerrar un modal */
const modals = document.querySelectorAll('.modal');

const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        console.log("modal")
        modal.showModal();
        modal.classList.add('is-active');
    }
}

const closeModal = () => {
    modals.forEach((modal) => {
        modal.close();
        modal.classList.remove('is-active');
    });
}

// Función para cargar las categorías desde el servidor
function loadCategories() {
    const serverCategorySelect = document.getElementById("serverCategory");

    // Hacer una solicitud GET al servidor para obtener las categorías
    fetch("http://127.0.0.1:5000/category/categories", {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            // Limpiar el campo de selección antes de agregar nuevas opciones
            serverCategorySelect.innerHTML = '';

            // Iterar a través de las categorías y agregarlas como opciones al campo de selección
            data.forEach(category => {
                const option = document.createElement("option");
                option.value = category.category_id;
                option.textContent = category.name;
                serverCategorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error al cargar categorías:", error);
        });
}

// Llama a la función para cargar categorías cuando se cargue la página
window.addEventListener('load', loadCategories);

/* Funcionalidades crear un servidor */

document.getElementById("serverForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Crear un objeto Data para enviar los datos del formulario, incluida la imagen (si es necesario)
    const data = {
        name: document.getElementById("serverName").value,
        description: document.getElementById("serverDescription").value,
        category_id: document.getElementById("serverCategory").value,
        img: document.getElementById("serverImage").files[0],
    };

    fetch("http://127.0.0.1:5000/server/createserver", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 201) {
                // Servidor creado con éxito, puedes redirigir o realizar otras acciones
                // Por ejemplo, cerrar la ventana modal
                closeModal("newServerModal");
            } else {
                return response.json().then(data => {
                    // Mostrar un mensaje de error si la creación falla
                    alert("Error al crear el servidor: " + data.message);
                });
            }
        })
        .catch(error => {
            alert("Error al crear el servidor. Por favor, intenta de nuevo.");
        });
});

function sendMessage(event) {
    event.preventDefault();
    const message = document.getElementById("messageInput").value;

    // Crea un objeto de mensaje
    const data = {
        id_channels: localStorage.getItem('channel_id'),
        users_id: localStorage.getItem('user_id'),
        content: message
    };

    // Agrega los encabezados CORS a la solicitud fetch()
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(data),
    };

    console.log("http://127.0.0.1:5000/message/send/" + localStorage.getItem('channel_id'))

    fetch("http://127.0.0.1:5000/message/send/" + localStorage.getItem('channel_id'), options)
        .then(response => {
            if (response.status === 200) {
                console.log(response.status)
                message = "";
            } else {
                console.log(response.status)
            }
        })
        .catch(error => {
            // Handle error
        });
}

const messageForm = document.getElementById("messageForm");
messageForm.addEventListener("submit", sendMessage);

function logout() {
    const url = "http://127.0.0.1:5000/user/logout";
    
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                window.location.href = "login.html";
            });
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
