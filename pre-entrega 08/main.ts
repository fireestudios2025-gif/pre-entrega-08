let elementos = JSON.parse(localStorage.getItem('misElementos')) || [];

const formulario = document.getElementById('formulario');
const nombreInput = document.getElementById('nombreInput');
const listaElementos = document.getElementById('listaElementos');

const guardarStorage = (array) => {
    localStorage.setItem('misElementos', JSON.stringify(array));
};

const renderizarElementos = () => {
    listaElementos.innerHTML = '';

    elementos.length === 0 
        ? listaElementos.innerHTML = '<li>No hay elementos guardados.</li>' 
        : elementos.forEach((elemento, index) => {
            const { nombre } = elemento;

            const li = document.createElement('li');
            li.innerHTML = `
                <span>${nombre}</span>
                <button data-index="${index}">Eliminar</button>
            `;
            listaElementos.appendChild(li);
        });
};

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nuevoElemento = {
        nombre: nombreInput.value.trim()
    };

    elementos.push(nuevoElemento);
    guardarStorage(elementos);
    renderizarElementos();

    formulario.reset();
});

listaElementos.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const index = e.target.getAttribute('data-index');

        elementos.splice(index, 1);
        guardarStorage(elementos);
        renderizarElementos();
    }
});

renderizarElementos();