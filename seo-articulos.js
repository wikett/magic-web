import OpenAI from 'openai'
import 'dotenv/config'
import fs from 'fs/promises'
import slugify from '@sindresorhus/slugify';
import axios from 'axios'

let guiaSEO = ""
let tituloSEO = ""
let urlSEO = ""
let categoriaSEO = ""
let articuloPathSEO = ""
let seccionesParaPrompt = ""
let imagenPrincipalSEO = ""
const youtubeApiKey = process.env.YOUTUBE_API_KEY;

function getPromptGuia(titulo) {
  // return `Create an outline for an article that will be 2,000 words on the keyword "${titulo}" based on the top 10 results from Google in Spanish.Include every relevant heading possible. Keep the keyword density of the headings high.For each section of the outline, include the word count.Include FAQs section in the outline too, based on people also ask section from Google for the keyword.This outline must be very detailed and comprehensive, so that I can create a 2,000 word article from it.Generate a long list of LSI and NLP keywords related to my keyword. Also include any other words related to the keyword.Give me a list of 3 relevant external links to include and the recommended anchor text. Make sure they're not competing articles.`
  return `Crea un guión en español para un artículo sobre las 2000 palabras para la palabra clave "${titulo}" basado en el top 10 resultados de Google de España. Incluye cada título relevante posible. Mantén la densidad de la palbra clave alta.Añade un titulo ClickBait para la palabra clave. Para cada sección del guión, incluye el total de palabras y este listado debe comenzar por la palabra "Sección". Incluye también una sección de Preguntas Frecuentes, basado en lo que las personas preguntan en Google para esta palabra clave. Este guión debe estar muy detallado y completo, del cual pueda crear un artículo de 2000 palabras aproximadamente. Además general una lista de LSI y NLP palabras claves relacionadas con mi palabra clave. Estate seguro que lo los articulos no compiten entre sí`
}

function getPromptTitulo(titulo, palabras=200) {
  //return `Write an article around ${palabras} words about '${titulo}', like a guy who knows 80% English, use very easy-to-understand English words, and give them nuance. Write this article in Spanish. Do not use normal AI words. Could you use markdown and emphasize some parts of the text?`
  return `Escribe un artículo en español sobre "${titulo}" que tenga un total de ${palabras} aproximadamente, como una persona que sabe el 80% de español, utilizando palabras muy sencillas de entender y dándoles matices. No uses palabras normales de Inteligencia Artificial. ¿Podrías utilizar markdown y resaltar algunas partes del texto?`
}

function getPromptCategorias(titulo) {
  return `Podrías clasificar esta frase "${titulo}" en alguna de estas categorías: hogar, ropa, tecnologia, salud u otros. En la respuesta indica solo la categoría, por favor.`
}

function getPromptArticulo() {
  console.log('generar articulo para: '+tituloSEO)
  return `Por favor,  escribe un artículo en español sobre "${tituloSEO}" de unas 2000 palabras, como una persona que sabe el 80% de español, utilizando palabras muy sencillas de entender y dándoles matices, que contenga las siguientes secciones:\n${seccionesParaPrompt}. El resultado redáctalo en Markdown, resaltando algunas partes del texto y utiliza cada sección como h2. No uses palabras normales de Inteligencia Artificial. Manten una densidad alta de la palbra clave. Incluye un título ClickBait al principio del artículo.`
}

function getMetaData(keywords, tituloClickBait, categoria, imagen, url) {
  const currentDate = new Date();
  return `head:
  meta:
    - name: 'keywords'
      content: '${keywords}'
    - name: 'robots'
      content: 'index, follow'
    - name: 'og:title'
      content: '${keywords}'
    - name: 'og:description'
      content: '${tituloClickBait}'
    - name: 'og:type'
      content: 'article'
    - name: 'article:published_time'
      content: '${currentDate.toISOString()}'
    - name: 'article:modified_time'
      content: '${currentDate.toISOString()}'
    - name: 'article:section'
      content: '${categoria}'
    - name: 'article:author'
      content: 'Mayte y Sonia'
    - name: 'og:image'
      content: '${imagen}'
    - name: 'og:url'
      content: '${url}'
    - name: 'copyright'
      content: '© ${new Date().getFullYear()} comolimpiarcomoexpertas.com'`
}

const filepath = 'keywords.txt';

function asignarCategoria(categoria) {
  if (categoria.includes('hogar'))
    return 'hogar'
  if (categoria.includes('ropa'))
    return 'ropa'
  if (categoria.includes('tecnologia'))
    return 'tecnologia'
  return 'otros'
}

async function obtenerCategoria() {
  console.log('Obteniendo categoria...')
  try {
    // Read the contents of the file
    const data = await fs.readFile(filepath, 'utf8');

    // Split the contents into an array of lines
    const lines = data.split('\n');
    tituloSEO = lines[0];
    categoriaSEO = await chatgptMagic(getPromptCategorias(tituloSEO))
    
    categoriaSEO = asignarCategoria(categoriaSEO)

    imagenPrincipalSEO = await obtenerImagen(tituloSEO);
    console.log(imagenPrincipalSEO)

    if (!categoriaSEO.includes("salud")) {
      // Creamos fichero con lo basico
      try {
        let date = new Date().toUTCString().slice(5, 16);
        urlSEO = slugify(tituloSEO, {separator: '-'})
        articuloPathSEO = `./content/${categoriaSEO}/${urlSEO}.md`
        const primeraMayuscula =  tituloSEO.charAt(0).toUpperCase() + tituloSEO.slice(1);
        let contenidoArticulo = `---\ntitle: ${tituloSEO}\ndescription: ${tituloSEO}\ncategory: ${categoriaSEO}\nurl: ${urlSEO}\ncreated: ${date}\nimageUrl: ${imagenPrincipalSEO}\n`
        contenidoArticulo += getMetaData(tituloSEO.replace(/[\n\r]+/g, ''), tituloSEO, categoriaSEO, imagenPrincipalSEO, 'https://comolimpiarcomoexpertas.com/'+categoriaSEO+'/'+urlSEO)
        contenidoArticulo += '\n---\n'
        await fs.writeFile(articuloPathSEO, contenidoArticulo, 'utf8');
      } catch (err) {
        console.error(err);
      }

      console.log('Preparando guia SEO...')
      guiaSEO = await chatgptMagic(getPromptGuia(tituloSEO), "gpt-4");
      //console.log(guiaSEO)
      guiaSEO = guiaSEO.split(/\r\n|\r|\n/)
      guiaSEO = guiaSEO.filter((letter) => letter !== "")
      
      await processContent(guiaSEO)
      await createArticle()
      console.log('Articulo creado correctamente')
    }

    // Remove the first line
    lines.shift();

    // Join the remaining lines back into a single string
    const modifiedContent = lines.join('\n');

    // Write the modified string back to the file
    await fs.writeFile(filepath, modifiedContent, 'utf8');

  } catch (err) {
    console.error(err);
  }
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_GPT_API
})

function letrasaquitar(titulo) {
    for (let index = 0; index < titulo.length; index++) {
        const element = titulo[index];
        if(element === ' ' && index>1) {
        // if(element === ':'){
            return index;
        }        
    }
}
function letrasaquitarES(titulo) {
  for (let index = 0; index < titulo.length; index++) {
      const element = titulo[index];
      if(element === ':'){
          return index + 1;
      }        
  }
}

function letrasaquitarFinal(titulo) {
    for (let index = titulo.length; index > 1; index--) {
        const element = titulo[index];
        if(element === '-') {
            return index;
        }        
    }
}

function numeroPalabras(titulo){
    // Using match with regEx
    let matches = titulo.match(/(\d+)/);
     
    // Display output if number extracted
    if (matches) {
        return matches[0];
    }
}

function limpiarSeccion(titulo) {
  titulo = titulo.replace(/['"]+/g, '')
  const letrasAQuitar = letrasaquitarES(titulo);
  const letrasAQuitarAtras = letrasaquitarFinal(titulo);
  let tituloFinal = titulo.substring(letrasAQuitar, letrasAQuitarAtras)
  tituloFinal = tituloFinal.trim()
  return tituloFinal;
}

function limpiarTituloConNumero(titulo) {
  return titulo.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "")
}

function limpiarTituloDirecto(titulo) {
  titulo = titulo.replace('Título: ','')
  return titulo.replace('"','')
}
function limpiarArticulo(articulo) {
  console.log(articulo)
  articulo = articulo.replace('Sección 1 – ','')
  articulo = articulo.replace('Sección 2 – ','')
  articulo = articulo.replace('Sección 3 – ','')
  articulo = articulo.replace('Sección 4 – ','')
  articulo = articulo.replace('Sección 5 – ','')
  articulo = articulo.replace('Sección 5 – ','')
  articulo = articulo.replace('Sección 6 – ','')
  articulo = articulo.replace('Sección 7 – ','')
  articulo = articulo.replace('Sección 8 – ','')
  articulo = articulo.replace('Sección 9 – ','')
  articulo = articulo.replace('Sección 10 – ','')
  
  if(articulo.includes('Título ClickBait: ')) {
    articulo = articulo.replace('Título ClickBait:','#')
  }

  return articulo
}

async function createArticle() {
  let articulo = await chatgptMagic(getPromptArticulo(), 'gpt-4')
  articulo = limpiarArticulo(articulo)
  try {
    await fs.appendFile(articuloPathSEO, articulo);
  } catch (error) {
    console.error('Error appending content to file:', error);
  }
}

async function processContent(contenido) {
  console.log('procesando contenido...')
  // console.log(contenido)
  

  for (let i = 0; i < contenido.length; i++) {
    const element = contenido[i];
    let tituloLimpio = ""
    // Obtenemos titulo
    // if (element.includes('Título') || element.includes('Titulo')) {
    //   console.log('procesamos h1 limpiarTitulo...')
    //   tituloLimpio = limpiarTituloDirecto(element)
    //   try {
    //     await fs.appendFile(articuloPathSEO, tituloLimpio);
    //   } catch (error) {
    //     console.error('Error appending content to file:', error);
    //   }
    // }
    if (element.includes('Sección')) { 
      tituloLimpio = limpiarSeccion(element);
      seccionesParaPrompt += `- ${tituloLimpio},\n`

      
      // if (!(tituloLimpio.includes('Introduction') || tituloLimpio.includes('Introducción'))) {
      //   console.log('---- H2 ------')
      //   console.log(tituloLimpio + ': '+numeroPalabras(element))
        
      //   console.log('- H2 -')
      //   console.log(tituloLimpio)
      //   console.log('Generando parrafo...')
      //   let totalPalabras = numeroPalabras(element)
      //   console.log('totalPalabras: ' + totalPalabras)
      //   totalPalabras = totalPalabras < 100 ? 200 : totalPalabras
      //   const parrafo = await chatgptMagic(getPromptTitulo(tituloLimpio, totalPalabras), 'gpt-4')
      //   tituloLimpio = `## ${tituloLimpio}\n${parrafo}`
      //   try {
      //     await fs.appendFile(articuloPathSEO, tituloLimpio);
      //   } catch (error) {
      //     console.error('Error appending content to file:', error);
      //   }
      // }
      
    }

    

  } // end for
  console.log('================================================================')
  console.log(seccionesParaPrompt)
}

async function chatgptMagic(contenido, model = 'gpt-3.5-turbo') {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: contenido
            }
        ],
        model: model,
        //     model: 'gpt-4',
      });
  return completion.choices[0].message.content
}

async function obtenerImagen(titulo){
  const baseApiUrl = 'https://www.googleapis.com/youtube/v3';
  const url = `${baseApiUrl}/search?key=${youtubeApiKey}&type=video&part=snippet&q=${titulo}`
  const response = await axios.get(url)
  console.log(response.data.items[0].snippet.thumbnails.high)
  
  return response.data.items[0].snippet.thumbnails.high.url;
}


await obtenerCategoria();



// await processContent(prueba);

// const tituloPrueba =  'A. Importancia de limpiar plata (50 palabras)';
// console.log(tituloPrueba)
// const letrasAQuitar = letrasaquitar(tituloPrueba);
// console.log('letras a quitar: ' + letrasAQuitar)
// const letrasAQuitarAtras = letrasaquitarFinal(tituloPrueba);
// console.log('letras a quitar atras: ' + letrasAQuitarAtras)
// console.log('-------------------------');
// let tituloFinal = tituloPrueba.substring(letrasAQuitar, letrasAQuitarAtras)
// tituloFinal = tituloFinal.trim()
// console.log(tituloFinal)
// console.log('Numero de palabras: '+numeroPalabras(tituloPrueba))