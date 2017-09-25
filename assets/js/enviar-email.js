$(function() {
    var formPresenca = $('.form-presenca');
    var formRecados = $('.form-recados');

    $(formPresenca).submit(function(ev) {
        ev.preventDefault();
        enviarEmail(formPresenca);
    });
    $(formRecados).submit(function(ev) { 
        ev.preventDefault();
        enviarEmail(formRecados);
    });

    function enviarEmail(form) {
        var formData = $(form).serialize();

        $('.btn-enviar').attr('disabled','disabled').css('cursor', 'wait').fadeTo(0,0.2);

        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
            var result = JSON.parse(response);   
            
            swal(result.msg, result.text, result.type);

            if(result.type == "success") $(form)[0].reset();

            $('.btn-enviar').removeAttr('disabled','disabled').css('cursor', 'pointer').fadeTo(0,1);
        })
        .fail(function(data) {
            if (data.responseText !== '') {
                swal("Oops!", data.responseText, "error");
            } else {                
                swal("Oops!", "Ocorreu um erro e sua mensagem não pôde ser enviada.", "error");
            }
        });
    };
});