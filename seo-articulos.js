import OpenAI from 'openai'
import 'dotenv/config'
import fs from 'fs/promises'
import slugify from '@sindresorhus/slugify';
import axios from 'axios'
import { TwitterApi } from 'twitter-api-v2';
import * as deepl from 'deepl-node';

let guiaSEO = ""
let tituloSEO = ""
let tituloSEOEnglish = ""
let urlSEO = ""
let categoriaSEO = ""
let articuloPathSEO = ""
let seccionesParaPrompt = ""
let imagenPrincipalSEO = ""
let descripcionSEO = ""
const currentDate = new Date();
const youtubeApiKey = process.env.YOUTUBE_API_KEY;

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const bearer = new TwitterApi(process.env.TWITTER_BEAR_TOKEN);
const translator = new deepl.Translator(process.env.DEEPL_AUTH);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

function getPromptGuia(titulo) {
  // return `Create an outline for an article that will be 2,000 words on the keyword "${titulo}" based on the top 10 results from Google in Spanish.Include every relevant heading possible. Keep the keyword density of the headings high.For each section of the outline, include the word count.Include FAQs section in the outline too, based on people also ask section from Google for the keyword.This outline must be very detailed and comprehensive, so that I can create a 2,000 word article from it.Generate a long list of LSI and NLP keywords related to my keyword. Also include any other words related to the keyword.Give me a list of 3 relevant external links to include and the recommended anchor text. Make sure they're not competing articles.`
  return `Crea un guión en español para un artículo sobre las 2000 palabras para la palabra clave "${titulo}" basado en el top 10 resultados de Google de España. Incluye cada título relevante posible. Mantén la densidad de la palbra clave alta.Añade un titulo ClickBait para la palabra clave. Para cada sección del guión, incluye el total de palabras y este listado debe comenzar por la palabra "Sección". Incluye también una sección de Preguntas Frecuentes, basado en lo que las personas preguntan en Google para esta palabra clave. Este guión debe estar muy detallado y completo, del cual pueda crear un artículo de 2000 palabras aproximadamente. Estate seguro que lo los articulos no compiten entre sí`
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

async function tweetAricle() {
  const fullUrl = 'https://comolimpiarcomoexpertas.com/'+categoriaSEO+'/'+urlSEO
  const tweet = `${descripcionSEO} ${fullUrl} #limpiar #DIY #trucos #comolimpiar`
  
  await twitterClient.v2.tweet(tweet);
}

function getMetaData(keywords, tituloClickBait, categoria, imagen, url) {
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
    - name: 'twitter:domain'
      content: 'comolimpiarcomoexpertas.com'
    - name: 'twitter:url'
      content: '${url}'
    - name: 'twitter:title'
      content: '${tituloClickBait}'
    - name: 'twitter:card'
      content: 'summary_large_image'
    - name: 'twitter:description'
      content: '${keywords}'
    - name: 'twitter:image'
      content: '${imagen}'
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
  
  try {
    // Leemos la keyword a generar
    const data = await fs.readFile(filepath, 'utf8');

    const lines = data.split('\n');
    tituloSEO = lines[0];
    console.log(`\x1bCreando la magia para: ${tituloSEO}\x1b[0m`);
    categoriaSEO = await chatgptMagic(getPromptCategorias(tituloSEO))
    
    categoriaSEO = asignarCategoria(categoriaSEO)
    imagenPrincipalSEO = await obtenerImagen(tituloSEO);

    if (!categoriaSEO.includes("salud")) {
        urlSEO = slugify(tituloSEO, {separator: '-'})
        articuloPathSEO = `./content/${categoriaSEO}/${urlSEO}.md`

        guiaSEO = await chatgptMagic(getPromptGuia(tituloSEO), "gpt-4");
        guiaSEO = guiaSEO.split(/\r\n|\r|\n/)
        guiaSEO = guiaSEO.filter((letter) => letter !== "")
        
        await processContent(guiaSEO)
        await createArticle()
        console.log('Articulo creado correctamente')
    }

    // Remove the first line
    lines.shift();

    const modifiedContent = lines.join('\n');
    await fs.writeFile(filepath, modifiedContent, 'utf8');

  } catch (err) {
    console.error(err);
  }
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_GPT_API
})

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

function getDescription(contenido) {
  const startIndexPosition = contenido.indexOf("# ")
  const endIndexPosition = contenido.indexOf("##")

  let description = contenido.substring(startIndexPosition, endIndexPosition)
  description = description.trim()
  description = description.substring(2, description.length)
  console.log('Click bait---')
  console.log(description)
  description = description.replaceAll('*','')
  return description.replaceAll(':', ' ')
}

function addPicture(contenido, imageUrl, caption) {
  // Input String
  const searchTerm = "## ";
  // String to be added
  let stringToAdd = `::photo-article
---
title: ${caption}
imageurl: ${imageUrl}
---
::
`;
  // Position to add string
  let indexPosition = contenido.indexOf(searchTerm)
  
  // Using substring method to split string
  const newString = contenido.substring(0, indexPosition)
          + stringToAdd + contenido.substring(indexPosition)
  return newString
}
function limpiarArticulo(articulo) {
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
  let date = new Date().toUTCString().slice(5, 16);
  let articulo = await chatgptMagic(getPromptArticulo(), 'gpt-4')
  const descripcion = getDescription(articulo)
  console.log('getDescription')
  console.log(descripcion)
  descripcionSEO = descripcion
  let cabeceroMarkdown = `---\ntitle: ${tituloSEO}\ndescription: ${descripcion}\ncategory: ${categoriaSEO}\npublished_time: ${currentDate.toISOString()}\nurl: ${urlSEO}\ncreated: ${date}\nimageUrl: ${imagenPrincipalSEO}\n`
  cabeceroMarkdown += getMetaData(tituloSEO.replace(/[\n\r]+/g, ''), descripcion, categoriaSEO, imagenPrincipalSEO, 'https://comolimpiarcomoexpertas.com/'+categoriaSEO+'/'+urlSEO)
  cabeceroMarkdown += '\n---\n'
  articulo = cabeceroMarkdown + articulo
  articulo = limpiarArticulo(articulo)
  articulo = addPicture(articulo, imagenPrincipalSEO, tituloSEO)  

  try {
    await fs.writeFile(articuloPathSEO, articulo)
    await tweetAricle() 
  } catch (error) {
    console.error('Error appending content to file:', error);
  }
}

async function processContent(contenido) {
  console.log('procesando contenido...')
  for (let i = 0; i < contenido.length; i++) {
    const element = contenido[i];
    let tituloLimpio = ""
    if (element.includes('Sección')) { 
      tituloLimpio = limpiarSeccion(element);
      seccionesParaPrompt += `- ${tituloLimpio},\n`      
    }
  }
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
        max_tokens: 2500,
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
// await obtenerCategoria();

async function generateImage() {
  console.log('Generando imagen...')
  const image = await openai.images.generate({
    size: '1024x1024',
    prompt: `a photograph of someone doing '${tituloSEOEnglish}', realistic` });

  console.log(image.data);
}
async function translateTitle(title) {
  console.log('Traduciendo titulo...')
  const result = await translator.translateText(title, null, 'en-GB');
  tituloSEOEnglish = result.text; // Bonjour, le monde !
}

await translateTitle('como limpiar lavadora por dentro')
console.log(tituloSEOEnglish);
await generateImage();