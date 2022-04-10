$(() => {

    //traduzione regole
    $('span').click(() => {
        $('#italiano').slideToggle();
        $('#inglese').slideToggle();

    });

    var iniziamo = false;

    let img = [];
    mischiaCarte();

    var contatore_carte = 16;
    function griglia() {
        for (i = 0; i < contatore_carte; i++) {

            let statodellacarta = 'statoimg = "coperta"';   //aggiunta attributo
            let identCarta = 'id = "' + i + '"';
            $('#box').append('<div class="carta"' + identCarta + statodellacarta + '> <img src="img/' + img[i] + '" </div>');
            //  $('.carta').attr('id', i).attr('stato', 'coperta');

        }

    }
    griglia();

    //nascondiamo le carte
    $('.carta img').hide();

    let prima_carta = 'nessuna';


    function voltaCard() {

        startTimer();

        $('#box>div').on('click', function () {
            incremento();
            let selettore_questa_carta = '#' + this.id;
            let selettore_prima_carta = '#' + prima_carta;

            $('#cliccato').show('contaClick');




            //se fatto click su carta indovinata non fare nulla
            if ($(selettore_questa_carta).attr('statoimg') === 'indovinata' || selettore_prima_carta === selettore_questa_carta) {
                return;
            }
            //questa carta va in ogni caso girata
            $(selettore_questa_carta + '>img').fadeIn(150);

            if (prima_carta === 'nessuna') {

                //questa diventa la prima carta girata
                prima_carta = this.id;

            } else {                           //c'è una prima carta già girata

                //se gli src delle immagini sono uguali, segnala come indovinate e non girarle

                if ($(selettore_questa_carta + '>img').attr('src') === $(selettore_prima_carta + '>img').attr('src')) {

                    $(selettore_questa_carta).attr('statoimg', 'indovinata').css({ 'background-color': 'blue' }).find('img').css({ 'background-color': 'red' }).animate({ 'width': '0px' }).animate({ 'width': '81px' });
                    $(selettore_prima_carta).attr('statoimg', 'indovinata').css({ 'background-color': 'blue' }).find('img').css({ 'background-color': 'red' }).animate({ 'width': '0px' }).animate({ 'width': '81px' });


                    //resetto indicatore prima carta
                    prima_carta = 'nessuna';

                    contatore_carte -= 2;
                    if (contatore_carte === 0) {
                        $('#vittoria').css({ 'visibility': 'visible', 'opacity': '0.8' });
                        persoVinto();
                        fineclick = true;
                        clearInterval(vuota);
                    }

                } else {

                    //rigiro le carte e resetto indicatore prima carta
                    $(selettore_prima_carta + '>img').fadeOut(1150);
                    $(selettore_questa_carta + '>img').fadeOut(1000);

                    $(selettore_questa_carta).attr('statoimg', 'coperta');
                    $(selettore_prima_carta).attr('statoimg', 'coperta');

                    prima_carta = 'nessuna';


                }

            }
        });
    };



    function mischiaCarte() {
        for (i = 1; i <= 8; i++) {
            img.push('img' + i + '.png');
            img.push('img' + i + '.png');
        }

        //le mischiamo 100 volte
        for (i = 0; i < 100; i++) {
            let posizione1 = Math.trunc(Math.random() * 16);
            let posizione2 = Math.trunc(Math.random() * 16);

            //scambiare posto
            if (posizione1 !== posizione2) {

                let scambio = img[posizione1];
                img[posizione1] = img[posizione2];
                img[posizione2] = scambio;


            }
        }

    }

    //TIMER
    var timer = $('.timer');
    var vuota;
    var s = 0; var m = 0;

    function startTimer() {

        vuota = setInterval(function () {
            timer.text('Tempo: ' + m + " min " + s + " sec");
            s++;
            if (s == 60) {
                m++;
                s = 0;
            }
        }, 1000);
    }

    //Contatore numero di click e vittoria/sconfitta
    var fineclick = false;
    var contaClick = 1;
    let resultGame = $('#vittoria p:first-child');
    let nbr = $('#cliccato h3').next().css({ 'font-weight': 'bold', 'font-size': '20px', 'margin-left': '10px' });
    nbr.text('0');


    function inserimento(val) {
        nbr.text(val);

    }

    function incremento() {
        if (fineclick === false) {
            inserimento(contaClick++)
        }

    }


    function persoVinto() {
        if (contaClick <= 40 && m < 2) {
            resultGame.text('Hai vinto!!').css({ 'color': 'green', 'margin-top': '25px' });
            $('#sconfitta').addClass('nascondi');
            $('#vincita').animate({ height: "90px", width: '97px' }, 700)
                .animate({ width: '300px' }, 300)
                .animate({ width: '97px' }, 500);
        } else {
            resultGame.text('Hai perso...').css({ 'color': 'red', 'margin-top': '25px' });
            $('#vincita').addClass('nascondi');
            $('#sconfitta').animate({ height: "90px", width: '97px' }, 700)
                .animate({ width: '300px' }, 300)
                .animate({ width: '97px' }, 500);
        }
    }


    //prima di inizia ora
    $('#box div').css({ 'cursor': 'not-allowed' });
    $('#box div').on('click', function () {
        if (iniziamo === false) {
            alert('Ricorda di cliccare su "Inizia ora!!" per cominciare la partita');
        }
    });






    //inizia ora

    $('#partiTempo').on('click', function () {
        iniziamo = true;
        $('#box div').css({ 'cursor': 'default' });

        voltaCard();


    });


    //restart
    $('#restart').click(function () {
        location.reload();
    });



});