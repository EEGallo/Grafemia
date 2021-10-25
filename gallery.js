const grid = new Muuri('.grid',{
    layout: {
        rounding: false,
      }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');


    //Agregamos los listener de los enlaces para filtar por categoria.
    const enlaces = document.querySelectorAll(" #categories a");
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();                                                /* previene/elimina el comportamiento por defecto que tiene el navegador, elimina el # */
                enlaces.forEach((enlace) => enlace.classList.remove('active'));     /*desmarca las otras categorías*/
                evento.target.classList.add('active');                              /*trae el enlace a la que clickeamos*/

                const categoria = evento.target.innerHTML.toLowerCase();            /*llama a los elementos cikcleados y los transforma en minusculas*/
                categoria === 'todo' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);        /*filtrado de categorias*/
        });
    });

    //Agregamos el listener para la barra de busqueda.
    document.querySelector('#bar-search').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
    })

    //Agregar un listener para las imagenes.

    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) => {
        const ruta = elemento.getAttribute('src');

        elemento.addEventListener('click', () => {
            overlay.classList.add('activo')
            document.querySelector('#overlay img').src =ruta;

        })
    }); 
    
    //Eventlistener del boton de cerrar.
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    })

    //Eventlistener del overlay.
    overlay.addEventListener('click', (evento) => {
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    })
}); 