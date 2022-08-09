
const DOM = document.querySelector.bind(document);
const DOM_ALL = document.querySelectorAll.bind(document);

// asseganmo tutti gli colori
const colors = ['none', '#000', '#fff', '#ff9b9c', '#ff343d', '#9f1d1b', '#ffb562', '#f26f29', '#bb401e', '#ead531', '#f89515', '#b63f02', '#f3e238', '#dda001', '#a45514', '#c0f05e', '#75c417', '#4c7e1b', '#6ff3a0', '#2ab554', '#207b3b', '#7ee1b7', '#0ba46c', '#006545', '#4be5c9', '#15b0a1', '#156662', '#5de8fb', '#0aaecf', '#10696f', '#7ac9fc', '#139ff1', '#0f68a4', '#7ac1ff', '#2c72e2', '#1144cd', '#9ca5fe', '#4f5de3', '#3c2ec5', '#bbacfa', '#8252df', '#661cd6', '#d3a3fe', '#a24ff8', '#7b1bd6', '#e9a4f8', '#e235ff', '#9a1da9', '#fb94c9', '#e83787', '#b70c50', '#fd95a7', '#f43050', '#b81138'];
// colore di default che si trova anche nella root del file ./style.css
const colorBorderDefaultFieldElement = '#dddddd';

// tutti gli elementi che ci servono dal dom presi e salvati nelle variabili
const DOM_BODY = DOM('body');
const DOM_colors = DOM('.colors');
const DOM_field = DOM('.field');
const DOM_number_X = DOM('#axes_X');
const DOM_number_Y = DOM('#axes_Y');
const DOM_button_reset = DOM('.button_reset');


// chiamiamo prima la funzione per la creazione del palette dei colori
createColorPalette();
// creaiamo anche la criglia come default 100 x 50
createCampo();


// salviamo tutti gli elementi creati di tipo input
const DOM_ALL_colors = DOM_ALL('input[name="color"]');
// ... anche gli elementi da colorare dentro al campo
let DOM_ALL_element_field = DOM_ALL('.field > div ');

// aggiungiamo l'evento click per la creazione del campo
DOM_button_reset.addEventListener('click', createCampo);
// aggiungiamo l'evento click alla raccolta degli elementi DOM dopo il reset dal campo
DOM_button_reset.addEventListener('click', pick_up_DOM_elements);

// variabile per colore selezionato
let selectColor = colors[1];
// prendiamo il valore del input
DOM_ALL_colors.forEach(e => { e.addEventListener('click', () => { selectColor = DOM('input[name="color"]:checked').getAttribute('id'); }); });


function createColorPalette() {
    colors.forEach((e, i) => {
        // creazione degli elementi
        const _dom_color = document.createElement('div');
        const _dom_input_radio = document.createElement('input');
        const _dom_label = document.createElement('label');

        // SE l'index del elemento è === 1, checked del primo elemento = true
        if (i === 1) _dom_input_radio.checked = true;

        // assegnare gli attributi agli elementi
        _dom_input_radio.setAttribute('type', 'radio');
        _dom_input_radio.setAttribute('id', `${e}`);
        _dom_input_radio.setAttribute('name', 'color');
        _dom_label.setAttribute('for', `${e}`);

        // assegnamo il colore al elemento input
        _dom_label.style.backgroundColor = e;

        // appendere gli elementi tra di loro
        _dom_color.append(_dom_input_radio);
        _dom_color.append(_dom_label);
        DOM_colors.append(_dom_color);
    });
}


// funzione per la creazione del campo
function createCampo() {
    // SE i valori sono maggiori di 0
    if (DOM_number_X.value > 0 && DOM_number_Y.value > 0) {
        // reset del campo
        DOM_field.innerHTML = '';

        for (let i = 0; i < DOM_number_X.value * DOM_number_Y.value; i++) {
            // creaiamo un div vuoto per il campo
            const element_field = document.createElement('div');
            // assegnamo il blexBasis con i vari valori
            element_field.style.flexBasis = `calc(100% / ${DOM_number_X.value})`;
            // appendiamo l'elemento creato al campo
            DOM_field.append(element_field);
        }
    }
    // ALTRIMENTI:
    else {
        // attiva una alert del problema
        alert('The values of axes X and axes Y is not correct! Insert values correct, please!');
    }
}


// funzione per il riasegnamento degli elementi del campo
function pick_up_DOM_elements() {
    DOM_ALL_element_field = DOM_ALL('.field > div ');
}


// chiama gli eventi
DOM_field.addEventListener('mousedown', clickMouseLeft);
DOM_BODY.addEventListener('mouseup', leaveMouseLeft);


// funzione per il click del mouse in versione premuto
function clickMouseLeft(click) {
    if (click.button === 0) {
        DOM_ALL_element_field.forEach(e => {
            e.addEventListener('mousemove', draw);
        })
    }
}


// funzione per il click del mouse in versione rilascio
function leaveMouseLeft() {
    DOM_ALL_element_field.forEach(e => {
        e.removeEventListener('mousemove', draw);
    })
}


// funzione per aggiungere colori agli elementi del campo
function draw() {
    // SE il colore e none
    if (selectColor === 'none') {
        // ripristiamo i colori e i bordi
        this.style.background = selectColor;
        this.style.borderRight = `1px solid ${colorBorderDefaultFieldElement}`;
        this.style.borderBottom = `1px solid ${colorBorderDefaultFieldElement}`;
    }

    this.style.background = selectColor;
    this.style.borderRight = `1px solid ${selectColor}`;
    this.style.borderBottom = `1px solid ${selectColor}`;
    // rb = remove border
    this.classList.add('rb');
}