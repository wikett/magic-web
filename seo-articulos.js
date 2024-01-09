import OpenAI from 'openai'
import 'dotenv/config'
import fs from 'fs/promises'
import fileSystem from 'fs'
import slugify from '@sindresorhus/slugify';
import axios from 'axios'
// import { TwitterApi } from 'twitter-api-v2';
import * as deepl from 'deepl-node';
import sharp from 'sharp';
import path from 'path';

let guiaSEO = ""
let tituloSEO = ""
let tituloSEOEnglish = ""
let urlSEO = ""
let categoriaSEO = ""
let articuloPathSEO = ""
let seccionesParaPrompt = ""
let videoPrincipalSEO = ""
let imagenPrincipalSEO = ""
let imagenSecundariaSEO = ""
let imagenDiscoverSEO = ""
let imagenDiscover = ""
let descripcionSEO = ""
let pasosSEO = ""
const dominio = "caleidoscopioastrale.it"
const profesional = 'astronomy' // siempre en ingles
const autores = 'Elena'
const categorias = ['Constelaciones', 'Cielo profundo', 'Telescopios', 'Sistema Solar']
const currentDate = new Date();
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const nasaApiKey = process.env.NASA;

// const client = new TwitterApi({
//   appKey: process.env.TWITTER_API_KEY,
//   appSecret: process.env.TWITTER_API_KEY_SECRET,
//   accessToken: process.env.TWITTER_ACCESS_TOKEN,
//   accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
// });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_GPT_API
})

const translator = new deepl.Translator(process.env.DEEPL_AUTH);

// const twitterClient = client.readWrite;

function promptArticulo(keyword, language) {
  //return `Actúa como experto en SEO y ${profesional}. Optimiza el SEO y copywriting del artículo que redactarás, considerando la estructura lógica, relaciones semánticas (LSI) y la calidad del contenido.Escribe un artículo de 1500 palabras en español, en formato Markdown, que resuelva la búsqueda de"${tituloSEO}$". Utiliza párrafos cortos y frases claras para mejorar la experiencia del usuario. Incluye palabras clave secundarias relacionadas con ${tituloSEO}. Asegúrate de una estructura lógica, desarrollo enfocado y cierre sin repeticiones ni thin content. Crea un título SEO con H1 de 60 caracteres para "${tituloSEO}" que sea creativo y atractivo. Evita un H2 con "intro" o "introducción". Agrega entre 4 y 10 encabezados H2, subtítulos H3 y listas en Markdown. Resalta las palabras clave o frases importantes en negrita. Utiliza adecuadamente palabras clave y LSI. Finaliza con un párrafo sin H2 de "conclusión" o "resumen", pero ofrece consejos destacando alguna frase en cursiva. Incluye 3 H3 de preguntas frecuentes (FAQ) sobre ${tituloSEO}. Escribe de forma perpleja y explosiva, sin perder el contexto. Evita tituloSEO stuffing superior al 2% y repeticiones de frases. Mantén el salience score entre 0.80 y 1. Utiliza negritas en Markdown para palabras clave y frases relevantes, sin repetir frases iguales. Utiliza listas con formato Markdown, know-how, y un paso a paso. Evita contenido innecesario o basura. Enfacita el texto con negritas, cursiva o listas.`
  return `Act as a SEO expert and ${profesional}. Optimize the SEO and copywriting of the article you will write, considering the logical structure, semantic relationships (LSI) and the quality of the content.Write an article of 1500 words in ${language}, in Markdown format, that solves the search for "${keyword}$". Use short paragraphs and clear sentences to enhance the user experience. Include secondary keywords related to ${keyword}. Ensure a logical structure, focused development and closing without repetition or thin content. Create a 60-character H1 SEO title for "${keyword}" that is creative and engaging. Avoid an H2 with "intro" or "introduction". Add 4-10 H2 headings, H3 subheadings and lists in Markdown. Highlight keywords or important phrases in bold. Use keywords and LSI appropriately. End with a paragraph without a "conclusion" or "summary" H2, but offer advice by highlighting a sentence in italics. Include 3 H3 frequently asked questions (FAQ) about ${keyword}. Write in a perplexing and explosive way, without losing context. Avoid "${keyword}" stuffing higher than 2% and repetition of phrases. Keep the salience score between 0.80 and 1. Use bold Markdown for keywords and relevant phrases, without repeating the same phrases. Use lists with Markdown format, know-how, and a step-by-step (if it is needed). Avoid unnecessary or junk content. Emphasize text with bold, italics or lists.`
}


function promptDescription(keyword, language) {
  return `Act as an SEO expert. Optimize the copywriting of a meta description for a blog article with a maximum of 150 characters about ${keyword} in ${language}.`
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
  return `Clasifica esta frase "${titulo}" en alguna de estas categorías: ${categorias.toString()}. En la respuesta indica solo la categoría, por favor.`
}

// function getPromptArticulo(language) {
//   console.log('generando articulo para: '+tituloSEO)
//   // return `Write an article in ${language} about "${tituloSEO} around 2000 words, `
//   return `Write an article of around 2000 words about '${tituloSEO}', use very easy-to-understand words, and give them nuance. Write this article in ${language}. Do not use normal AI words. Use Markdown and emphasize some parts of the text (you can use bold, italic, lists or tables) and use h2 for the sections. Include an attractive title referring to the keyword but without being ClickBait at the beginning of the article.` 
//   // return `Por favor,  escribe un artículo en español sobre "${tituloSEO}" de unas 2000 palabras, como una persona que sabe el 80% de español, utilizando palabras muy sencillas de entender y dándoles matices, que contenga las siguientes secciones:\n${seccionesParaPrompt}. El resultado redáctalo en Markdown, resaltando algunas partes del texto y utiliza cada sección como h2. No uses palabras normales de Inteligencia Artificial. Manten una densidad alta de la palabra clave. Incluye un título atractivo referente a la palabra clave pero sin ser ClickBait al principio del artículo.`
// }

function getPromptPasosMasLinks() {
  return `Dime los pasos de '${tituloSEO}' y haz un lista de los productos que necesito comprar para poderlo hacer. El resultado redáctalo en Markdown, crea la lista en formato Markdown, resaltando algunas partes del texto y que solo aparezcan h2 y h3 como títulos (ningún h1)`
}

function getPromptAnecdotaPersonal() {
  return `Escribe una anecdota personal de '${tituloSEO}'. Escríbela en primera persona del plural en femenino. El resultado redáctalo en Markdown, resaltando algunas partes del texto, sin que contenga h1. No uses palabras normales de Inteligencia Artificial.`
}

function getPromptAPOD(texto) {
  return `Act as a astronomer. Following this text "${texto}", write a short explanation and add more interested data. Write this article in Spanish. Do not use normal AI words. Use markdown and emphasize some parts of the text. Do not use h1 and h2`
}

async function tweetAricle() {
  const fullUrl = 'https://'+dominio+'/'+categoriaSEO+'/'+urlSEO
  const tweet = `${descripcionSEO} ${fullUrl} #limpiar #DIY #trucos #comolimpiar`
  
  // await twitterClient.v2.tweet(tweet);
}

async function getMetaData(titulo, url, dominio) {
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
      content: '${autores}'
    - name: 'og:image'
      content: '${imagenPrincipalSEO}'
    - name: 'og:url'
      content: '${url}'
    - name: 'twitter:domain'
      content: '${dominio}'
    - name: 'twitter:url'
      content: '${url}'
    - name: 'twitter:title'
      content: '${titulo}'
    - name: 'twitter:card'
      content: '${imagenPrincipalSEO}'
    - name: 'twitter:description'
      content: '${descripcionSEO}'
    - name: 'twitter:image'
      content: '${imagenPrincipalSEO}'
    - name: 'copyright'
      content: '© ${new Date().getFullYear()} ${dominio}'`
}

const filepath = 'keywords.txt';

async function asignarCategoria(categoria) {
  if (categorias.find((element) => slugify(element, {separator: '-'}) === categoria)) {
    return categoria;
  }
  return 'otros';
}

async function downloadImage(source, url, sufijo, imageName) {
  
  try {
    let extension = ""
      if(source === 'DALLE') {
        extension = "png"
      }
      if (source === 'YOUTUBE') {
        extension = "jpg"
      }

      let path = `./public/img/content/${urlSEO}_${sufijo}.${extension}` 
      let pathWebp = `./public/img/content/${urlSEO}_${sufijo}.webp`
      let publicPicture = `https://${dominio}/img/content/${urlSEO}_${sufijo}.webp`


      if (sufijo === "4") {
        path = `./public/img/${imageName}.${extension}`
        pathWebp = `./public/img/nasa/${imageName}.webp`
        publicPicture = `https://${dominio}/img/nasa/${imageName}.webp`
      }
      

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
              if(sufijo==="4") {
                imagenPrincipalSEO = publicPicture
              }
              // fs.unlink(path, function (err) {
              //   if (err) throw err;
              //   console.log('File deleted!');
              // });
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

async function generateImage(subject) {
  // console.log('Generando imagen DALLE 3 for: '+subject)
  const image = await openai.images.generate(
    {
      model: "dall-e-3",
      prompt: `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: a picture of '${subject}', realistic`,
      n: 1,
      size: "1024x1024", 
    });
  
    const imageVariant = await openai.images.generate(
      {
        model: "dall-e-3",
        // prompt: `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: a picture of '${subject}', minimalist, blueprint`,
        prompt: `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: a picture of '${subject}', creative, futuristic, expressive`,
        n: 1,
        size: "1024x1024", 
      });

      // console.log('calculando imageDiscover...')

      // const imageDiscover = await openai.images.generate(
      //   {
      //     model: "dall-e-3",
      //     prompt: `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: a picture of '${subject}', creative, futuristic, expressive`,
      //     n: 1,
      //     size: "1024x1024", 
      //   });

  imagenPrincipalSEO = image.data[0].url
  imagenSecundariaSEO = imageVariant.data[0].url 
  // imagenDiscover = imageDiscover.data[0].url

  await downloadImage("DALLE", imagenPrincipalSEO, "1", "")
  await downloadImage("DALLE", imagenSecundariaSEO, "2", "")
  // await downloadImage("DALLE", imagenDiscover, "3", "")
}


async function generateDalle3Image(texto, filename) {
  const image = await openai.images.generate(
    {
      model: "dall-e-3",
      prompt: `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: a photograph of someone doing '${texto}'`,
      n: 1,
      size: "1024x1024", 
    });

  await downloadImage("DALLE", image.data[0].url, "4", slugify(filename, {separator: '-'}))
}

async function translateTitle(title, language) {
  const result = await translator.translateText(title, null, language);  
  return result.text
}

async function generarArticuloTraducido(keyword, imagenPrincipalUrl, imagenSecundariaUrl, categoria) {
  
  try {
    
    tituloSEO = await translateTitle(keyword,'it')
    console.log(`tituloSEO: ${tituloSEO}`)
    tituloSEO = await cleanTexto(tituloSEO)
    console.log(`tituloSEO after clean: ${tituloSEO}`)

    tituloSEOEnglish = await translateTitle(keyword, 'en-GB')
    console.log(`tituloSEOEnglish: ${tituloSEOEnglish}`)

    categoriaSEO = categoria

    urlSEO = slugify(tituloSEO, {separator: '-'})
    console.log(`urlSEO: ${urlSEO}`)
    imagenPrincipalSEO = imagenPrincipalUrl
    imagenSecundariaSEO = imagenSecundariaUrl
    console.log(`imagenPrincipalSEO: ${imagenPrincipalSEO}`)
    console.log(`imagenSecundariaSEO: ${imagenSecundariaSEO}`)
    

    articuloPathSEO = `./content/${categoriaSEO}/${urlSEO}.md`
    console.log(`articuloPathSEO: ${articuloPathSEO}`)

    if (!fileSystem.existsSync(articuloPathSEO)) {
      await createArticle()
    } else {
        console.log("Saltamos al siguiente articulo ---");
    }
    

  } catch (err) {
    console.error(err);
  }
}

async function obtenerCategoria() {
  
  try {
    // Leemos la keyword a generar
    const data = await fs.readFile(filepath, 'utf8');

    const lines = data.split('\n');
    tituloSEO = lines[0];
    tituloSEO = tituloSEO[0].toUpperCase() + tituloSEO.slice(1);

    tituloSEO = await cleanTexto(tituloSEO)

    tituloSEOEnglish = await translateTitle(tituloSEO, 'en-GB')
    // console.log(`Creando la magia para: ${tituloSEO}`);
    categoriaSEO = await chatgptMagic(getPromptCategorias(tituloSEO))
    // console.log('Categoria SEO: '+categoriaSEO)
    
    categoriaSEO = await asignarCategoria(slugify(categoriaSEO, {separator: '-'}))
    // console.log('Categoria SEO slugify: '+categoriaSEO)
    urlSEO = slugify(tituloSEO, {separator: '-'})
    await obtenerImagen();

    if (!categoriaSEO.includes("salud")) {
        articuloPathSEO = `./content/${categoriaSEO}/${urlSEO}.md`
        guiaSEO = await chatgptMagic(promptArticulo(tituloSEO), "gpt-4-1106-preview");
        // guiaSEO = guiaSEO.split(/\r\n|\r|\n/)
        // guiaSEO = guiaSEO.filter((letter) => letter !== "")
        
        // await processContent(guiaSEO)
        await createArticle()
        // console.log('Articulo creado correctamente')
    }

    // Remove the first line
    lines.shift();

    const modifiedContent = lines.join('\n');
    await fs.writeFile(filepath, modifiedContent, 'utf8');

  } catch (err) {
    console.error(err);
  }
}



async function cleanTexto(texto) {
  let description = texto.replaceAll(':', ';')
  description = description.replaceAll('"','')
  description = description.replaceAll("'","")
  return description
}

async function addDate(contenido) {
  let localDate = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let stringToAdd = `\n\n_Artículo actualizado el ${localDate.toLocaleDateString('es-ES', options)}_`;
  return contenido + stringToAdd
}

async function addVideo(contenido, caption) {
  // Input String
  const searchTerm = "## ";
  // String to be added
  let stringToAdd = `::video-article
---
title: ${caption}
videourl: ${videoPrincipalSEO}
---
::

`;
  // Position to add string
  let indexPosition = contenido.indexOf(searchTerm)
  
  // Using substring method to split string
  if (videoPrincipalSEO !== undefined) {
    const newString = contenido.substring(0, indexPosition)
          + stringToAdd + contenido.substring(indexPosition)
    return newString
  }
  return contenido
  
}

async function addPicture(contenido, caption) {
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
  if (imagenPrincipalSEO !== undefined) {
    const newString = contenido.substring(0, indexPosition)
          + stringToAdd + contenido.substring(indexPosition)
    return newString
  }
  return contenido
  
}

async function addDiscover(contenido, imagen, posicion) {
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

async function createArticle() {
  let date = new Date().toUTCString().slice(5, 16);
  let articulo = await chatgptMagic(promptArticulo(tituloSEOEnglish, 'Italian'), 'gpt-4-1106-preview')
  descripcionSEO = await chatgptMagic(promptDescription(tituloSEOEnglish, 'Italian'), 'gpt-4-1106-preview')
  descripcionSEO = await cleanTexto(descripcionSEO)

  let cabeceroMarkdown = `---\ntitle: ${tituloSEO}\ndescription: ${descripcionSEO}\ncategory: ${categoriaSEO}\npublished_time: ${currentDate.toISOString()}\nurl: ${urlSEO}\ncreated: ${date}\nimageUrl: ${imagenPrincipalSEO}\n`
  cabeceroMarkdown += await getMetaData(tituloSEO.replace(/[\n\r]+/g, ''), 'https://'+dominio+'/'+categoriaSEO+'/'+urlSEO, dominio)
  cabeceroMarkdown += '\n---\n'
  articulo = cabeceroMarkdown + articulo
  articulo = await addDate(articulo)
  // articulo = limpiarArticulo(articulo)
  articulo = await addPicture(articulo, tituloSEO)
  articulo = await addDiscover(articulo, imagenSecundariaSEO, 3)

  try {
    await fs.writeFile(articuloPathSEO, articulo)
    // await tweetAricle() 
  } catch (error) {
    console.error('Error appending content to file:', error);
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

async function obtenerImagen(){
  // const baseApiUrl = 'https://www.googleapis.com/youtube/v3';
  // const url = `${baseApiUrl}/search?key=${youtubeApiKey}&type=video&part=snippet&q=${titulo}`
  // const response = await axios.get(url)
  

  // imagenPrincipalSEO = await downloadImage(response.data.items[0].snippet.thumbnails.high.url, "1");
  // imagenSecundariaSEO = await downloadImage(response.data.items[1].snippet.thumbnails.high.url, "2");
  // console.log('Generando imagenes...')
  await generateImage(tituloSEOEnglish);
}

async function pictureOfTheDay() {
  const baseApiUrl = 'https://api.nasa.gov/planetary';
  const url = `${baseApiUrl}/apod?api_key=${nasaApiKey}`
  const { data } = await axios.get(url)
  console.log(data)

  let date = new Date().toUTCString().slice(5, 16);
  let localDate = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
  console.log(localDate.toLocaleDateString('es-ES', options));

  let articulo = await translateTitle(data.explanation, 'ES')
  console.log('articulo: '+articulo)
  
  let tituloTraducido = await translateTitle(data.title, 'ES')
  tituloTraducido = await cleanTexto(tituloTraducido)
  const tituloTraducidopod = 'Foto astronómica del día por la NASA'
  descripcionSEO = `Imagen astronómica del día ${localDate.toLocaleDateString('es-ES', options)} por la NASA: ${tituloTraducido}`
  descripcionSEO = await cleanTexto(descripcionSEO)
  let descripcionSEOpod = `Foto astronómica del día por la NASA. Cada día la NASA elige una imagen de los aficionados a la astronomía para ser la foto del día.`
  descripcionSEOpod = await cleanTexto(descripcionSEOpod)

  urlSEO = slugify(`${tituloTraducido}-${data.date}`, {separator: '-'})
  const urlSEOpod = 'foto-del-dia-de-la-nasa-hoy'
  
  categoriaSEO = 'nasa'

  if (data.media_type === 'video') {
    videoPrincipalSEO = data.url
    await generateDalle3Image(data.title, tituloTraducido)
  }
  else {
    imagenPrincipalSEO = data.hdurl
    console.log('imagenPrincipalSEO: '+imagenPrincipalSEO)
  }

  const textoAdicional = await chatgptMagic(getPromptAPOD(data.explanation))

  let articuloFinal = `# ${tituloTraducido}\n${localDate.toLocaleDateString('es-ES', options)}\n\n${textoAdicional}`
  let articuloFinalpod = `# Foto del día de la NASA hoy\n${localDate.toLocaleDateString('es-ES', options)}\n\nCada día se presenta una imagen o fotografía diferente de nuestro fascinante universo, junto con una breve explicación escrita por un astrónomo profesional elegida por la NASA.\nEn esta página lo que queremos es acercar la astronomía a los hispanohablantes, ya que estas imagenes y su texto solo se publican en inglés.\n## ${tituloTraducido}\n\n${textoAdicional}`

  let cabeceroMarkdown = `---\ntitle: ${tituloTraducido}\ndescription: ${descripcionSEO}\ncategory: ${categoriaSEO}\npublished_time: ${currentDate.toISOString()}\nurl: ${urlSEO}\ncreated: ${date}\nimageUrl: ${imagenPrincipalSEO}\n`
  let cabeceroMarkdownpod = `---\ntitle: ${tituloTraducidopod}\ndescription: ${descripcionSEOpod}\ncategory: ${categoriaSEO}\npublished_time: ${currentDate.toISOString()}\nurl: ${urlSEOpod}\ncreated: ${date}\nimageUrl: ${imagenPrincipalSEO}\n`
  cabeceroMarkdown += await getMetaData(tituloTraducido.replace(/[\n\r]+/g, ''), 'https://'+dominio+'/'+categoriaSEO+'/'+urlSEO, dominio)
  cabeceroMarkdown += '\n---\n'

  cabeceroMarkdownpod += await getMetaData(tituloTraducidopod.replace(/[\n\r]+/g, ''), 'https://'+dominio+'/'+categoriaSEO+'/'+urlSEOpod, dominio)
  cabeceroMarkdownpod += '\n---\n'

  const autor = data.copyright;

  articulo = cabeceroMarkdown + articuloFinal
  articulo = await addDate(articulo)

  let copyrightAutor = autor ? `, copyright - ${autor} -` : ''
  if (data.media_type === 'video') {
    articulo = await addVideo(articulo, `${tituloTraducido}${copyrightAutor}`)
  }
  else {
    articulo = await addPicture(articulo, `${tituloTraducido}${copyrightAutor}`)
  }
  

  articuloFinalpod = cabeceroMarkdownpod + articuloFinalpod
  articuloFinalpod = await addDate(articuloFinalpod)

  let stringToAdd = `::photo-article
  ---
  title: ${tituloTraducido}, imagen generada por DALLE 3
  imageurl: ${imagenPrincipalSEO}
  ---
  ::

  `;

  if (data.media_type === 'video') {
    articuloFinalpod = await addVideo(articuloFinalpod, `${tituloTraducido}${copyrightAutor}`)
    articuloFinalpod += `\n\n${stringToAdd}`
    articuloFinal += `\n\n${stringToAdd}`
  }
  else {
    articuloFinalpod = await addPicture(articuloFinalpod, `${tituloTraducidopod}${copyrightAutor}`)
  }

  articuloFinal += '\n\n---\n[Ver el quieres ver el listado completo de todo el año de las imagenes del día de la NASA](/nasa)\n---\n\n'

  try {
    articuloPathSEO = `./content/${categoriaSEO}/${urlSEO}.md`
    await fs.writeFile(articuloPathSEO, articulo)

    const articuloPathSEOpod = `./content/${categoriaSEO}/${urlSEOpod}.md`
    await fs.writeFile(articuloPathSEOpod, articuloFinalpod)
    // await tweetAricle() 
  } catch (error) {
    console.error('Error appending content to file:', error);
  }
}

async function traduccionTotal() {
  const language = 'it'

  const category = 'altro'

  const directoryPath = './content/otros';
  const directoryPathDestino = './content/altro'
    try {
        const files = await fs.readdir(directoryPath);
        for (let file of files) {
          const filePath = path.join(directoryPath, file);
          const data = await fs.readFile(filePath, 'utf-8');
          const lines = data.split('\n');

          let titlePin = ''
          let description = ''
          let imageUrl = ''
          let imagenSecundaria = ''
          let url = ''
          for (let line of lines) {
            // console.log(line)
            if (line.startsWith('title: ')) {
              titlePin = line.substring(7, line.length)
            }
            if (line.startsWith('description: ')) {
                description = line.substring(13, line.length)
            }
            if (line.includes('2.webp')) {
              imagenSecundaria = line.substring(10, line.length)
            }
            if (line.startsWith('imageUrl: ')) {
                imageUrl = line.substring(10, line.length)
            }
            if (line.includes('blog.astroingeo.org') && line.includes(category)) {
                url = line.substring(16, line.length-1)
            }
            
          }
          // console.log(titlePin);
          // console.log(description);
          // console.log(imageUrl)
          // console.log(imagenSecundaria);
          // console.log(url);
          await generarArticuloTraducido(titlePin, imageUrl, imagenSecundaria, category )
        }
    } catch (err) {
        console.error(`Error while reading directory: ${err}`);
    }
}

switch (process.argv[2]) {
  case 'nasa':
    console.log('Calculando apod de la NASA')
    await pictureOfTheDay()
    break;

  case 'magic': {
    for (let index = 0; index < 20; index++) {
      console.log('Calculando articulo: '+index)
      await obtenerCategoria();  
    }
    break;
  }

  case 'traduccion': {
    traduccionTotal()
    break;
  }
    
  case 'dalle':
    // Generacion imagenes DALLE 3
    await generateDalle3Image('Astronomy Calendar of Celestial Events', 'colision meteoro')
    break;

  default:
    break;
}

console.log(' -- FIN --')