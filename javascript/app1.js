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

const provincias = document.querySelector('#provincias');
const leyenda = document.querySelector('#leyenda');
const mapa = document.querySelector('#mapa');
const cabezera_tabla_IA = document.querySelector('#cabezera_tabla_IA');
const cargando = document.querySelector('#cargando');
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
    var get_datos = getDatos(enlace);
    console.log('Esperando a getfdatos: ',get_datos);
    datos_por_municipio.innerHTML = get_datos;

    if(get_datos >= 1){
        leyenda.style.display = 'block';
        cargando.style.display = 'None'
        provincias.style.display = 'block';
        cabezera_tabla_IA.style.display = 'block';
        datos_por_municipio.innerHTML = get_datos;
    }else{
        datos_por_municipio.innerHTML = 'No ha sido posible conectar con la base de datos';

    }

}

function getDatos(enlace){
    limpiaDatos();
    var html = '';
    cargando.style.display = 'block';
    fetch(enlace)
        .then(res => res.json())
        .then(datos => {
            datos = datos.data;
            datos.forEach(element => {
                dato4 = parseFloat(element[4].format);
                dato0 = element[0].des;
                var resultadoDato0 = valorDato0(dato0);
                var resultadoDato4 = valorDato4(dato4);
                // console.log(resultadoDato0);
                if(dato0 == 'Málaga'){element[0].des = 'Málaga (provincia)'}
                html += `
                <tbody>
                    <td ${resultadoDato0}${element[0].des}</td>
                    <td>${element[1].format}</td>
                    <td>${element[2].format}</td>
                    <td>${element[3].format}</td>
                    <td ${resultadoDato4}${element[4].format}</td>
                    <td>${element[5].format}</td>
                    <td>${element[6].format}</td>
                    <td>${element[7].format}</td>
                    <td>${element[8].format}</td>
                </tbody>
                `
                // datos_por_municipio.innerHTML = html;
                // console.log('Rellenando html...')
            });
        // console.log(html);
        return html;
    });
}

function valorDato0(dato0){
    var resultado = 'class="has-background-link has-text-weight has-text-white">';
    var comarcas = [
    'Almería', 'Almería (distrito)', 'Almería (capital)', 'Levante-Alto Almanzora', 'Poniente de Almería',
    'Cádiz', 'Campo de Gibraltar Oeste', 'Campo de Gibraltar Este', 'Bahía de Cádiz-La Janda', 'Jerez-Costa Noroeste', 'Sierra de Cádiz',
    'Córdoba', 'Córdoba (distrito)', 'Córdoba (capital)', 'Córdoba Sur', 'Guadalquivir', 'Córdoba Norte',
    'Granada', 'Granada Sur', 'Granada Nordeste', 'Granada (distrito)', 'Metropolitano de Granada',
    'Huelva', 'Sierra de Huelva-Andévalo Central', 'Condado-Campiña', 'Huelva-Costa',
    'Jaén', 'Jaén Sur', 'Jaén (distrito)', 'Jaén Norte', 'Jaén Nordeste',
    'Málaga','Axarquía','Costa del Sol','La Vega','Málaga (distrito)','Serranía','Valle del Guadalhorce',
    'Sevilla', 'Sevilla (distrito)', 'Sevilla (capital)', 'Sevilla Este', 'Sevilla Norte', 'Sevilla Sur'    
    ];
    comarcas.forEach(comarca =>{
        if(dato0 == comarca){
            resultado = ' class="has-background-link is-size-4 has-text-weight-bold has-text-white">';
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

// // https://www.juntadeandalucia.es/institutodeestadisticaycartografia/intranet/admin/rest/v1.0/consulta/46324

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
    cargando.style.display = 'None';
}

