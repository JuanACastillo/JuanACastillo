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
document.querySelector('#IA').addEventListener('click', visualizaProvincias);
document.querySelector('#covid').addEventListener('click', mapaCovid);
document.querySelector('#almeria').addEventListener('click', IAMunicipio);
document.querySelector('#cadiz').addEventListener('click', IAMunicipio);
document.querySelector('#cordoba').addEventListener('click', IAMunicipio);
document.querySelector('#granada').addEventListener('click', IAMunicipio);
document.querySelector('#huelva').addEventListener('click', IAMunicipio);
document.querySelector('#jaen').addEventListener('click', IAMunicipio);
document.querySelector('#malaga').addEventListener('click', IAMunicipio);
document.querySelector('#sevilla').addEventListener('click', IAMunicipio);

document.querySelector('#n2').addEventListener('click', filtro);

const provincias = document.querySelector('#provincias');
const leyenda = document.querySelector('#leyenda');
const mapa = document.querySelector('#mapa');
const cabezera_tabla_IA = document.querySelector('#cabezera_tabla_IA');
const datos_por_municipio = document.querySelector('#datos_por_municipio');
limpiaDatos();

function visualizaProvincias(){
    limpiaDatos();
    provincias.style.display = 'block';
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
    datos_por_municipio.innerHTML = 'Espera...';
    provincias.style.display = 'block';
    cabezera_tabla_IA.style.display = 'block';
    fetch(enlace)
        .then(res => res.json())
        .then(datos => {
            datos = datos.data;
            let html = '';
            datos.forEach(element => {
                dato4 = parseFloat(element[4].format);
                dato0 = element[0].des;
                var resultadoDato0 = valorDato0(dato0);
                var resultadoDato4 = valorDato4(dato4);
                var resultado_clase = resultadoCalse(dato4);
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
                <tbody>
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
                </tbody>
                `
                datos_por_municipio.innerHTML = html;
                leyenda.style.display = 'block';
                console.log(datos_por_municipio.innerHTML);
            });
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
    var resultado = 'class="nivel2 has-text-white">'
    if((dato4 >= 1.000 & dato4 <= 3.9)){resultado = 'class="nivel4GradoII has-text-white">'}
    else if((dato4 >= 500 & dato4 <= 999)){resultado = 'class="nivel4GradoI has-text-white">'}
    else if((dato4 >= 100 & dato4 <= 499)){resultado = 'class="nivel4 has-text-black">'}
    else if(dato4 >= 4 & dato4 <= 99){resultado = 'class="nivel3 has-text-black">'}
    return resultado;
}
function resultadoCalse(dato4){
    var variable = 'class="n2"';
    if((dato4 >= 1.000 & dato4 <= 3.9)){variable = 'class="n3"'}
    else if((dato4 >= 500 & dato4 <= 999)){variable = 'class="n4"'}
    else if((dato4 >= 100 & dato4 <= 499)){variable = 'class="n4-1"'}
    else if(dato4 >= 4 & dato4 <= 99){variable = 'class="n4-2"'}
    return variable;
}

// function verN2(){
//     var resultado = 'class="nivel2 has-text-white ">'
// }
function filtro(){
    // var tabla = document.querySelectorAll('td');
    var tabla = [0,1,2,3,4,5,6,7,8,9,10];
    tabla.each(function(element){
        console.log(element);
    })
}
    

// https://www.juntadeandalucia.es/institutodeestadisticaycartografia/intranet/admin/rest/v1.0/consulta/46324

function mapaCovid() {
    limpiaDatos();
    mapa.style.display = 'block';
}

function limpiaDatos() {
    console.log('Limpia');
    console.clear();
    provincias.style.display = 'None';
    mapa.style.display = 'None';
    cabezera_tabla_IA.style.display = 'None';
    leyenda.style.display = 'None';
}

