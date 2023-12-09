import OpenAI from 'openai'
import 'dotenv/config'
import fs from 'fs/promises'
import slugify from '@sindresorhus/slugify';
import axios from 'axios'
// import { TwitterApi } from 'twitter-api-v2';
import * as deepl from 'deepl-node';
import sharp from 'sharp';
import pipeline from 'stream';
import promisify from 'util';

let guiaSEO = ""
let tituloSEO = ""
let tituloSEOEnglish = ""
let urlSEO = ""
let categoriaSEO = ""
let articuloPathSEO = ""
let seccionesParaPrompt = ""
let imagenPrincipalSEO = ""
let imagenSecundariaSEO = ""
let imagenDiscoverSEO = ""
let imagenDiscover = ""
let descripcionSEO = ""
let pasosSEO = ""
const profesional = 'limpieza'
const currentDate = new Date();
const youtubeApiKey = process.env.YOUTUBE_API_KEY;

// const client = new TwitterApi({
//   appKey: process.env.TWITTER_API_KEY,
//   appSecret: process.env.TWITTER_API_KEY_SECRET,
//   accessToken: process.env.TWITTER_ACCESS_TOKEN,
//   accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
// });



const translator = new deepl.Translator(process.env.DEEPL_AUTH);

// const twitterClient = client.readWrite;

function promptArticulo() {
  return `Actúa como experto en SEO y ${profesional}. Optimiza el SEO y copywriting del artículo que redactarás, considerando la estructura lógica, relaciones semánticas (LSI) y la calidad del contenido.Escribe un artículo de 1500 palabras en español, en formato Markdown, que resuelva la búsqueda de"${tituloSEO}$". Utiliza párrafos cortos y frases claras para mejorar la experiencia del usuario. Incluye palabras clave secundarias relacionadas con ${tituloSEO}. Asegúrate de una estructura lógica, desarrollo enfocado y cierre sin repeticiones ni thin content. Crea un título SEO con H1 de 60 caracteres para "${tituloSEO}" que sea creativo y atractivo. Evita un H2 con "intro" o "introducción". Agrega entre 4 y 10 encabezados H2, subtítulos H3 y listas en Markdown. Resalta las palabras clave o frases importantes en negrita. Utiliza adecuadamente palabras clave y LSI. Finaliza con un párrafo sin H2 de "conclusión" o "resumen", pero ofrece consejos destacando alguna frase en cursiva. Incluye 3 H3 de preguntas frecuentes (FAQ) sobre ${tituloSEO}. Escribe de forma perpleja y explosiva, sin perder el contexto. Evita tituloSEO stuffing superior al 2% y repeticiones de frases. Mantén el salience score entre 0.80 y 1. Utiliza negritas en Markdown para palabras clave y frases relevantes, sin repetir frases iguales. Utiliza listas con formato Markdown, know-how, y un paso a paso. Evita contenido innecesario o basura.`
}

function promptDescription() {
  return `Actúa como experto en SEO y ${profesional}. Escribe una meta descripción como máximo de 150 caracteres sobre un artículo de ${tituloSEO}.`
}

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
  return `Por favor,  escribe un artículo en español sobre "${tituloSEO}" de unas 2000 palabras, como una persona que sabe el 80% de español, utilizando palabras muy sencillas de entender y dándoles matices, que contenga las siguientes secciones:\n${seccionesParaPrompt}. El resultado redáctalo en Markdown, resaltando algunas partes del texto y utiliza cada sección como h2. No uses palabras normales de Inteligencia Artificial. Manten una densidad alta de la palabra clave. Incluye un título atractivo referente a la palabra clave pero sin ser ClickBait al principio del artículo.`
}

function getPromptPasosMasLinks() {
  return `Dime los pasos de '${tituloSEO}' y haz un lista de los productos que necesito comprar para poderlo hacer. El resultado redáctalo en Markdown, crea la lista en formato Markdown, resaltando algunas partes del texto y que solo aparezcan h2 y h3 como títulos (ningún h1)`
}

function getPromptAnecdotaPersonal() {
  return `Escribe una anecdota personal de '${tituloSEO}'. Escríbela en primera persona del plural en femenino. El resultado redáctalo en Markdown, resaltando algunas partes del texto, sin que contenga h1. No uses palabras normales de Inteligencia Artificial.`
}

async function tweetAricle() {
  const fullUrl = 'https://comolimpiarcomoexpertas.com/'+categoriaSEO+'/'+urlSEO
  const tweet = `${descripcionSEO} ${fullUrl} #limpiar #DIY #trucos #comolimpiar`
  
  // await twitterClient.v2.tweet(tweet);
}

function getMetaData(titulo, url) {
  return `head:
  meta:
    - name: 'keywords'
      content: '${titulo}'
    - name: 'robots'
      content: 'index, follow'
    - name: 'og:title'
      content: '${titulo}'
    - name: 'og:description'
      content: '${descripcionSEO}'
    - name: 'og:type'
      content: 'article'
    - name: 'article:published_time'
      content: '${currentDate.toISOString()}'
    - name: 'article:modified_time'
      content: '${currentDate.toISOString()}'
    - name: 'article:section'
      content: '${categoriaSEO}'
    - name: 'article:author'
      content: 'Mayte y Sonia'
    - name: 'og:image'
      content: '${imagenDiscoverSEO}'
    - name: 'og:url'
      content: '${url}'
    - name: 'twitter:domain'
      content: 'comolimpiarcomoexpertas.com'
    - name: 'twitter:url'
      content: '${url}'
    - name: 'twitter:title'
      content: '${titulo}'
    - name: 'twitter:card'
      content: '${imagenDiscoverSEO}'
    - name: 'twitter:description'
      content: '${descripcionSEO}'
    - name: 'twitter:image'
      content: '${imagenDiscoverSEO}'
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

async function downloadImage(urlYoutube, sufijo) {
  try {
      const url = urlYoutube;
      const extension = sufijo === "3" ? "png" : "jpg"
      const path = `./public/img/content/${urlSEO}_${sufijo}.${extension}` 
      const pathWebp = `./public/img/content/${urlSEO}_${sufijo}.webp`
      const publicPicture = `https://comolimpiarcomoexpertas.com/img/content/${urlSEO}_${sufijo}.webp`

      const response = await axios.get(url, { responseType: 'stream' });
      if(response.status === 200) {
          await fs.writeFile(path, response.data);
          sharp(path)
          .webp()
          .toFile(pathWebp, (err, info) => {
            if (err) {
              console.error('Error occurred while converting image to WebP:', err);
            } else {
              if(sufijo==="1") {
                imagenPrincipalSEO = publicPicture
              }
              if(sufijo==="2") {
                imagenSecundariaSEO = publicPicture
              }
              if(sufijo==="3") {
                imagenDiscoverSEO = publicPicture
              }
              fs.unlink(path, function (err) {
                if (err) throw err;
                console.log('File deleted!');
              });
            }
          });
      } else {
          console.error("Error: ", response.status);
          console.log('Unable to download the image');
      }
      return publicPicture
  } catch (error) {
      console.error("An error occurred while downloading the image: ", error);
  }
}

async function generateImage() {
  console.log('Generando imagen for: '+tituloSEOEnglish)
  const image = await openai.images.generate(
    {
      model: "dall-e-3",
      prompt: `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: a photograph of someone doing '${tituloSEOEnglish}', realistic`,
      n: 1,
      size: "1024x1024", 
    });

  imagenDiscover = image.data[0].url

  await downloadImage(imagenDiscover, "3")
}
async function translateTitle(title) {
  const result = await translator.translateText(title, null, 'en-GB');
  tituloSEOEnglish = result.text; // Bonjour, le monde !
}

async function obtenerCategoria() {
  
  try {
    // Leemos la keyword a generar
    const data = await fs.readFile(filepath, 'utf8');

    const lines = data.split('\n');
    tituloSEO = lines[0];
    await translateTitle(tituloSEO)
    console.log(`Creando la magia para: ${tituloSEO}`);
    categoriaSEO = await chatgptMagic(getPromptCategorias(tituloSEO))
    
    categoriaSEO = asignarCategoria(categoriaSEO)
    urlSEO = slugify(tituloSEO, {separator: '-'})
    await obtenerImagen(tituloSEO);

    if (!categoriaSEO.includes("salud")) {
        articuloPathSEO = `./content/${categoriaSEO}/${urlSEO}.md`
        guiaSEO = await chatgptMagic(promptArticulo(tituloSEO), "gpt-4-1106-preview");
        // guiaSEO = guiaSEO.split(/\r\n|\r|\n/)
        // guiaSEO = guiaSEO.filter((letter) => letter !== "")
        
        // await processContent(guiaSEO)
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

function addPicture(contenido, caption) {
  // Input String
  const searchTerm = "## ";
  // String to be added
  let stringToAdd = `::photo-article
---
title: ${caption}
imageurl: ${imagenPrincipalSEO}
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

function addDiscover(contenido, imagen, posicion) {
  let re = new RegExp("##","ig");
  let spaces = [];
  let matched = "";
  while ((matched = re.exec(contenido))) {
    spaces.push(matched.index);
  }
  let stringToAdd = `
::photo-discover
---
imageurl: ${imagen}
title: ${tituloSEO}
---
::

`;
let indexPosition = spaces[posicion]
const newString = contenido.substring(0, indexPosition)
+ stringToAdd + contenido.substring(indexPosition)
return newString
}

function addAnecdota(contenido, anecdota) {
  contenido += `\n\n## Anecdota personal\n`
  contenido += anecdota
  return contenido
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
  let newTitulo = tituloSEO.replaceAll('*','')
  const str2 = newTitulo.charAt(0).toUpperCase() + newTitulo.slice(1);
  articulo = articulo.replace('Introducción', 'Guia de '+str2)

  return articulo
}

async function createArticle() {
  let date = new Date().toUTCString().slice(5, 16);
  let articulo = await chatgptMagic(getPromptArticulo(), 'gpt-4-1106-preview')
  descripcionSEO = await chatgptMagic(promptDescription(), 'gpt-4-1106-preview')

  // pasosSEO = await chatgptMagic(getPromptPasosMasLinks(), 'gpt-4-1106-preview')
  // console.log('pasos SEO')
  // console.log(pasosSEO)
  // const anecdota = await chatgptMagic(getPromptAnecdotaPersonal(), 'gpt-4-1106-preview')
  let cabeceroMarkdown = `---\ntitle: ${tituloSEO}\ndescription: ${descripcionSEO}\ncategory: ${categoriaSEO}\npublished_time: ${currentDate.toISOString()}\nurl: ${urlSEO}\ncreated: ${date}\nimageUrl: ${imagenDiscoverSEO}\n`
  cabeceroMarkdown += getMetaData(tituloSEO.replace(/[\n\r]+/g, ''), 'https://comolimpiarcomoexpertas.com/'+categoriaSEO+'/'+urlSEO)
  cabeceroMarkdown += '\n---\n'
  articulo = cabeceroMarkdown + articulo
  // articulo = limpiarArticulo(articulo)
  articulo = addPicture(articulo, tituloSEO)
  articulo = addDiscover(articulo, imagenSecundariaSEO, 3)
  articulo = addDiscover(articulo, imagenDiscoverSEO, 6)
  // articulo = addAnecdota(articulo, anecdota)

  try {
    await fs.writeFile(articuloPathSEO, articulo)
    // await tweetAricle() 
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

async function chatgptMagic(contenido, model = 'gpt-4-1106-preview') {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: contenido
            }
        ],
        model: model,
        max_tokens: 3500,
        //     model: 'gpt-4-1106-preview',
      });
  return completion.choices[0].message.content
}

async function obtenerImagen(titulo){
  const baseApiUrl = 'https://www.googleapis.com/youtube/v3';
  const url = `${baseApiUrl}/search?key=${youtubeApiKey}&type=video&part=snippet&q=${titulo}`
  const response = await axios.get(url)
  

  imagenPrincipalSEO = await downloadImage(response.data.items[0].snippet.thumbnails.high.url, "1");
  imagenSecundariaSEO = await downloadImage(response.data.items[1].snippet.thumbnails.high.url, "2");

  console.log(`-- imagenPrincipalSEO: ${imagenPrincipalSEO} --`)
  console.log(`-- imagenSecundariaSEO: ${imagenSecundariaSEO} --`)

  await generateImage();
  console.log(`-- imagenDiscoverSEO: ${imagenDiscoverSEO} --`)

}
// for (let index = 0; index < 50; index++) {
//   console.log('Calculando articulo: '+index)
//   await obtenerCategoria();  
// }

await obtenerCategoria();  

