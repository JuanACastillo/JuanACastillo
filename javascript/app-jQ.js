$(document).ready(function(){

    console.log('prueba');

    const enlaceAlmeria = 'https://www.juntadeandalucia.es/institutodeestadisticaycartografia/intranet/admin/rest/v1.0/consulta/38665';
    const enlaceCadiz = 'https://www.juntadeandalucia.es/institutodeestadisticaycartografia/intranet/admin/rest/v1.0/consulta/38637';
    const enlaceCordoba = 'https://www.juntadeandalucia.es/institutodeestadisticaycartografia/intranet/admin/rest/v1.0/consulta/38666';
    const enlaceGranada = 'https://www.juntadeandalucia.es/institutodeestadisticaycartografia/intranet/admin/rest/v1.0/consulta/38667';
    const enlaceHuelva = 'https://www.juntadeandalucia.es/institutodeestadisticaycartografia/intranet/admin/rest/v1.0/consulta/38668';
    const enlaceJaen = 'https://www.juntadeandalucia.es/institutodeestadisticaycartografia/intranet/admin/rest/v1.0/consulta/38669';
    const enlaceMalaga = 'https://www.juntadeandalucia.es/institutodeestadisticaycartografia/intranet/admin/rest/v1.0/consulta/38674';
    const enlaceSevilla = 'https://www.juntadeandalucia.es/institutodeestadisticaycartografia/intranet/admin/rest/v1.0/consulta/38676';

    // Botones de escucha
    $('#IA').click(visualizaProvincias);
    $('#covid').click(mapaCovid);
    $('#almeria').click(IAMunicipio);
    $('#cadiz').click(IAMunicipio);
    $('#cordoba').click(IAMunicipio);
    $('#granada').click(IAMunicipio);
    $('#huelva').click(IAMunicipio);
    $('#jaen').click(IAMunicipio);
    $('#malaga').click(IAMunicipio);
    $('#sevilla').click(IAMunicipio);

    
    $('#n0').click(() => $('.n1-50,.n51-150,.n151-250,.n250,#n1-50,#n51-150,#n151-250,#n250').toggle());
    $('#n1-50').click(() => $('.n0,.n51-150,.n151-250,.n250,#n0,#n51-150,#n151-250,#n250').toggle());
    $('#n51-150').click(() => $('.n0,.n1-50,.n151-250,.n250,#n0,#n1-50,#n151-250,#n250').toggle());
    $('#n151-250').click(() => $('.n0,.n1-50,.n51-150,.n250,#n0,#n1-50,#n51-150,#n250').toggle());
    $('#n250').click(() => $('.n0,.n1-50,.n51-150,.n151-250,#n0,#n1-50,#n51-150,#n151-250').toggle());

    limpiaDatos();

    function visualizaProvincias(){
        limpiaDatos();
        $('#provincias').show();
    }

    function IAMunicipio() {
        console.log(this.id);
        if(this.id == 'almeria'){datosPorMunicipio(enlaceAlmeria);}
        if(this.id == 'cadiz'){datosPorMunicipio(enlaceCadiz);}
        if(this.id == 'cordoba'){datosPorMunicipio(enlaceCordoba);}
        if(this.id == 'granada'){datosPorMunicipio(enlaceGranada);}
        if(this.id == 'huelva'){datosPorMunicipio(enlaceHuelva);}
        if(this.id == 'jaen'){datosPorMunicipio(enlaceJaen);}
        if(this.id == 'malaga'){datosPorMunicipio(enlaceMalaga);}
        if(this.id == 'sevilla'){datosPorMunicipio(enlaceSevilla);}
    }


    function datosPorMunicipio(enlace){
        limpiaDatos();
        $('#datos_por_municipio').text('Solicitando datos, espera...');
        $('#provincias').show();
        $('#cabezera_tabla_IA').show();
        fetch(enlace, {'Access-Control-Allow-Origin' : "https://www.juntadeandalucia.es"})
            .then(res => res.json())
            .then(datos => {
                datos = datos.data;
                let html = '';
                datos.forEach(element => {
                    dato4 = parseFloat(element[4].val).toFixed(1);  // toFixed(1) 1 decimal
                    dato0 = element[0].des;
                    var resultadoDato0 = valorDato0(dato0);
                    var resultadoDato4 = valorDato4(dato4);
                    var resultado_clase = resultadoClase(dato4);
                    // console.log(resultadoDato0);
                    if(dato0 == 'Almer??a'){element[0].des = 'Almer??a (provincia)'}
                    if(dato0 == 'C??diz'){element[0].des = 'C??diz (provincia)'}
                    if(dato0 == 'C??rdoba'){element[0].des = 'C??rdoba (provincia)'}
                    if(dato0 == 'Granada'){element[0].des = 'Granada (provincia)'}
                    if(dato0 == 'Huelva'){element[0].des = 'Huelva (provincia)'}
                    if(dato0 == 'Ja??n'){element[0].des = 'Ja??n (provincia)'}
                    if(dato0 == 'M??laga'){element[0].des = 'M??laga (provincia)'}
                    if(dato0 == 'Sevilla'){element[0].des = 'Sevilla (provincia)'}

                    html += `
                    <tr ${resultado_clase}>
                        <td ${resultadoDato0}${element[0].des}</td>
                        <td>${element[1].format}</td>
                        <td>${element[2].format}</td>
                        <td>${element[3].format}</td>
                        <td ${resultadoDato4}${element[4].format}</td>
                        <td>${element[5].format}</td>
                        <td>${element[6].format}</td>
                        <td>${element[7].format}</td>
                        <td>${element[8].format}</td>
                        </tr>
                    `
                    $('#datos_por_municipio').innerHTML = html;
                    $('#leyenda').show();
                    $('#datos_por_municipio').html(html);
                });
                // console.log($('#datos_por_municipio').innerHTML);

            });
    }

    function valorDato0(dato0){
        var resultado = 'class="has-background-link has-text-weight has-text-white">';
        var comarcas = [
        'Almer??a', 'Almer??a (distrito)', 'Almer??a (capital)', 'Levante-Alto Almanzora', 'Poniente de Almer??a',
        'C??diz', 'Campo de Gibraltar Oeste', 'Campo de Gibraltar Este', 'Bah??a de C??diz-La Janda', 'Jerez-Costa Noroeste', 'Sierra de C??diz',
        'C??rdoba', 'C??rdoba (distrito)', 'C??rdoba (capital)', 'C??rdoba Sur', 'Guadalquivir', 'C??rdoba Norte',
        'Granada', 'Granada Sur', 'Granada Nordeste', 'Granada (distrito)', 'Metropolitano de Granada',
        'Huelva', 'Sierra de Huelva-And??valo Central', 'Condado-Campi??a', 'Huelva-Costa',
        'Ja??n', 'Ja??n Sur', 'Ja??n (distrito)', 'Ja??n Norte', 'Ja??n Nordeste',
        'M??laga','Axarqu??a','Costa del Sol','La Vega','M??laga (distrito)','Serran??a','Valle del Guadalhorce',
        'Sevilla', 'Sevilla (distrito)', 'Sevilla (capital)', 'Sevilla Este', 'Sevilla Norte', 'Sevilla Sur'
        ];
        comarcas.forEach(comarca =>{
            if(dato0 == comarca){
                resultado = ' class="has-background-link has-text-weight-bold has-text-white">';
            }
        });
        return resultado;
    }

    function valorDato4(dato4){
        // console.log(typeof(dato4), dato4);
        var resultado = 'class="nivel0 has-text-white">'
        if((dato4 >= 251)){resultado = 'class="nivel250 has-text-white">'}
        else if((dato4 >= 151 & dato4 <= 250.9)){resultado = 'class="nivel151-250 has-text-white">'}
        else if((dato4 >= 51 & dato4 <= 150.9)){resultado = 'class="nivel51-150 has-text-black">'}
        else if(dato4 >= 1 & dato4 <= 50.9){resultado = 'class="nivel1-50 has-text-black">'}
        return resultado;
    }
    function resultadoClase(dato4){
        var variable = 'class="n0 no-boton"';
        if((dato4 >= 251)){variable = 'class="n250 no-boton"'}
        else if((dato4 >= 151 & dato4 <= 250.9)){variable = 'class="n151-250 no-boton"'}
        else if((dato4 >= 51 & dato4 <= 150.9)){variable = 'class="n51-150 no-boton"'}
        else if(dato4 >= 1 & dato4 <= 50.9){variable = 'class="n1-50 no-boton"'}
        return variable;
    }

    function mapaCovid() {
        limpiaDatos();
        $('#mapa').show();
    }

    function limpiaDatos() {
        console.log('Limpia');
        console.clear();
        $('#provincias').hide();
        $('#mapa').hide();
        $('#cabezera_tabla_IA').hide();
        $('#leyenda').hide();
        $('.n0,.n1-50,.n51-150,.n151-250,.n250,#n0,#n1-50,#n51-150,#n151-250,#n250').show();
    }

});