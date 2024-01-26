import OpenAI from 'openai'
import 'dotenv/config'
import fs from 'fs/promises'
import fileSystem from 'fs'
import slugify from '@sindresorhus/slugify';
import axios from 'axios'
// import { TwitterApi } from 'twitter-api-v2';
import * as deepl from 'deepl-node';
import sharp from 'sharp';
import path, { join } from 'path';

let guiaSEO = ""
let tituloSEO = ""
let tituloSEOEnglish = ""
let urlSEO = ""
let categoriaSEO = ""
let articuloPathSEO = ""
let videoPrincipalSEO = ""
let imagenPrincipalSEO = ""
let imagenSecundariaSEO = ""
let descripcionSEO = ""
const dominio = "blog.astroingeo.org"
const profesional = 'astronomy' // siempre en ingles
const autores = 'Enrique'
const categorias = ['Constelaciones', 'Cielo profundo', 'Telescopios', 'Sistema Solar', 'Otros']
const currentDate = new Date();
const nasaApiKey = process.env.NASA;
const language = 'Spanish'
const country = 'Spain'
const categoriaWeb = "Astronomy"
const expertos = "experto en astronomía"
const infoQuienesSomos = "explicacion"
const urlFacebook = "https://cvnet.cpd.ua.es/curriculum-breve/es/aparicio-arias-enrique-jesus/9322"
const urlInstagram = ""
const urlX = ""
const urlLinkedin = "https://www.linkedin.com/in/enrique-aparicio-arias-861040b1/?originalSubdomain=es"

const infoJson = {}

function promptTitle() {
  // return `Actúa como un experto en Marketing y aficionado a la ${categoriaWeb}. Crea un listado con 6 nombres para una marca que hable sobre ${categoriaWeb}. Dame solo el resultado final.`
  return `Act like a marketing expert and ${categoriaWeb} buff. Create a list of 10 names for a brand that talks about ${categoriaWeb} in ${language} for the ${country} market. Just give me the final result.`
}

function promptAuthor() {
  return `Give me a list of 6 female and 6 male names with surnames typical of ${country}.`
}

function promptMainTitle() {
  return `Act like a marketing expert and ${categoriaWeb} buff. Write a short sentence as a catchy title to read my ${categoriaWeb} blog in ${language}`
}

function promptAuthorsDescription() {
  return `Act like an ${categoriaWeb} enthusiast. Write a short text in ${language} of about 100 words explaining the new adventure of creating this ${categoriaWeb} blog. Write it in first person. The result should be written in an HTML "p" tag, highlighting the most important parts with bold or italics. `
}

function promptAuthorsSmallDescription() {
  return `Act as an ${categoriaWeb} enthusiast. Write a short text in ${language} of about 40 words introducing a person who is motivated to write a blog about ${categoriaWeb}.`
}

function promptDescription() {
  return `Act as an SEO expert. Write a meta description in ${language} of no more than 150 characters about ${tituloSEO}, which is attractive but not Clickbait.`
}

function promptAmazonDescription() {
  return `Act like an online marketing expert. Write a short text of no more than 40 words in ${language} that you want to recommend certain ${categoriaWeb} brands you trust.`
}

function promptCategoryDescription() {
  return `Act like an ${categoriaWeb} enthusiast. Write a short text of about 50 words in ${language} explaining all the possibilities of writing a blog about ${categoriaWeb}.`
}

function promptDatosCuriosos() {
 return `Act like an ${categoriaWeb} buff. Write a list of 3 curiosities about ${categoriaWeb} of about 50 words each in ${language}.`
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_GPT_API
})

const translator = new deepl.Translator(process.env.DEEPL_AUTH);

function promptArticulo(keyword) {
  return `Act as an SEO expert and ${profesional}. Optimize the SEO and copywriting of the article you will write, considering the logical structure, semantic relationships (LSI) and the quality of the content. Write an article of 1500 words in ${language} in Markdown format, that solves the search for "${keyword}". Use short paragraphs and clear sentences to enhance the user experience. Include secondary keywords related to "${keyword}". Ensure a logical structure, focused development and closing without repetition or thin content. Create a 60-character H1 SEO title for "${keyword}" that is creative and engaging. Avoid an H2 with "intro" or "introduction". Add 4-10 H2 headings, H3 subheadings and lists in Markdown. Highlight keywords or important phrases in bold. Use keywords and LSI appropriately. End with a paragraph without a "conclusion" or "summary" H2, but offer advice by highlighting a sentence in italics. Include 3 H3 frequently asked questions (FAQ) about "${keyword}". Write in a perplexing and explosive way, without losing context. Avoid "${keyword}" stuffing higher than 2% and repetition of phrases. Keep the salience score between 0.80 and 1. Use bold Markdown for keywords and relevant phrases, without repeating the same phrases. Use lists with Markdown format, know-how, and a step-by-step (if it is needed). Avoid unnecessary or junk content. Emphasize text with bold, italics or lists.
  Write the word "octopus" before the first h2 (use plain format).
  Write the word "frodo" before the fourth h2 (use plain format).
  Write the word "chichi" before the seventh h2 if exists (use plain format).
  Do not include "h1", "h2", "h3" or "h4" in any title or subtitle.
  Do not include "H1", "H2", "H3" or "H4" in any title or subtitle.
  Write the article in ${language}.`
}

function getPromptCategorias(titulo) {
  return `Classify this phrase "${titulo}" in one of these categories: ${categorias.toString()}. In the response, please indicate only the category. The phrase and the categories are in ${language}`
}

function getPromptAPOD(texto) {
  return `Act as a astronomer. Following this text "${texto}", write a short explanation and add more interested data. Write this article in ${language}. Do not use normal AI words. Use markdown and emphasize some parts of the text. Do not use h1 and h2. Write the word "octopus" before the text (use plain format).`
}

async function writeJsonToFile() {
  try {
    infoJson.title = await chatgptMagic(promptTitle())
    infoJson.author = await chatgptMagic(promptAuthor())
    infoJson.mainTitle = await chatgptMagic(promptMainTitle())
    infoJson.authorsDescription = await chatgptMagic(promptAuthorsDescription())
    infoJson.authorsSmallDescription = await chatgptMagic(promptAuthorsSmallDescription())
    infoJson.description = await chatgptMagic(promptDescription())
    // TODO: actualizar nuxt.conifg con el nuevo dominio
    infoJson.domain = ""    
    infoJson.websiteName = ""
    infoJson.emailContacto = ""
    infoJson.footer = ""
    infoJson.footerLink = ""
    //TODO: crear las carpetas de las nuevas categorias seo url friendly
    infoJson.navigation = [
      { 
          "name": "Cielo Profundo",
          "href": "/cielo-profundo",
          "description": "",
          "keywordImage": "nebula",
          "image": ""
      },
      { 
          "name": "Constelaciones",
          "href": "/constelaciones",
          "description": "",
          "keywordImage": "Orion constellation",
          "image": ""
      },
      { 
          "name": "Sistema Solar",
          "href": "/sistema-solar",
          "keywordImage": "Solar system",
          "description": "",
          "image": ""
      },
      { 
          "name": "Otros",
          "href": "/otros",
          "description": "",
          "keywordImage": "Astronomy",
          "image": ""
      }
  ]
    infoJson.company = [
      { "name": "Quienes somos", "href": "/quienes-somos" },
      { "name": "Contacto", "href": "/contacto" }
    ]
    infoJson.legal = [
      { "name": "Aviso legal", "href": "/aviso-legal" },
      { "name": "Política de cookies", "href": "/politica-de-cookies" },
      { "name": "Política de privacidad", "href": "/politica-de-privacidad" }
  ]
    infoJson.facebookUrl = ""
    infoJson.instagramUrl = ""
    infoJson.xUrl = ""
    infoJson.amazonDescription = await chatgptMagic(promptAmazonDescription())
    infoJson.amazon = [
      {
          "image": "/img/amazon-basics.webp",
          "url": "https://amzn.to/40Ggm4S",
          "title": "Amazon basics"
      },
      {
          "image": "/img/vanish.webp",
          "url": "https://amzn.to/3MI7uWC",
          "title": "Vanish"
      },
      {
          "image": "/img/fairy.webp",
          "url": "https://amzn.to/3syLiHw",
          "title": "Fairy"
      },
      {
          "image": "/img/frosch.webp",
          "url": "https://amzn.to/47f4oS3",
          "title": "Frosch"
      },
      {
          "image": "/img/sanytol.webp",
          "url": "https://amzn.to/3SHw79z",
          "title": "Sanytol"
      }
  ],
    infoJson.category = categoriaWeb
    infoJson.categoryDescription = await chatgptMagic(promptCategoryDescription())
    infoJson.categoryImages = [
      {
          "image": "/img/productos-de-limpieza.png",
          "title": "productos de limpieza para casa"
      },
      {
          "image": "/img/como-limpiar-la-lavadora.png",
          "title": "productos de limpieza"
      },
      {
          "image": "/img/como-limpiar-la-plata.png",
          "title": "como limpiar plata"
      },
      {
          "image": "/img/como-limpiar-zapatillas-blancas.png",
          "title": "como limpiar zapatillas blancas"
      }
      
  ]
    infoJson.tiendaAmiga = [
      {
          "description": "Siempre nos gusta colaborar con aquella tienda de cercanía, que tiene buen trato y unos productos excelentes. La Droguería de percon es nuestra opción.",
          "link": "https://www.awin1.com/cread.php?awinmid=63006&awinaffid=848509&ued=https%3A%2F%2Fladrogueria.com%2F",
          "alt": "La droguería de percon",
          "image": "/img/la-drogueria-de-percon.webp"
      }
  ]
    infoJson.datosCuriososParaBorrar = await chatgptMagic(promptDatosCuriosos())
    infoJson.datosCuriosos = [
      {
          "title": "📺",
          "description": "Los mandos a distancia son uno de los objetos más sucios de una casa. No suelen limpiarse a menudo, por no hablar de que todo el mundo los toca, ¡y a veces incluso con las manos sucias!",
          "color": "bg-orange-900"
      },
      {
          "title": "250 calorías",
          "description": "La limpieza no solamente ayuda a mejorar el aspecto de nuestro hogar, ¡también quema calorías! ¿Sabías que puedes quemar hasta 100 calorías por hora con una limpieza ligera y hasta 250 con una limpieza más intensiva?",
          "color": "bg-orange-900"
      },
      {
          "title": "200,000",
          "description": "Las bayetas de cocina pueden contener unas 200,000 bacterias. Eso es unas 200 veces más que una taza de baño. Por eso es importante lavarlas con regularidad.",
          "color": "bg-orange-900"
      }
  ]
  infoJson.traducciones = [
    {
      "texto": "Artículos relacionados"
    },
    {
      "texto": "Nuestra tienda de confianza"
    },
    {
      "texto": "Aquí algunas curiosidades sobre:"
    },
    {
      "texto": "Aquí hay algunos datos divertidos para comenzar"
    },
    {
      "texto": "Otros artículos"
    },
    {
      "texto": "Nosotros"
    },
    {
      "texto": "Legal"
    },
    {
      "texto": "Todos los derechos reservados"
    },
    {
      "texto": "Ver los productos"
    }
  ]


    const jsonString = JSON.stringify(infoJson, null, 2);

    await fs.writeFile('./content/info.json', jsonString);
    console.log('JSON has been written to the file successfully.');
  } catch (err) {
    console.error('An error occurred while writing the JSON to a file:', err);
  }
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

      
      if (sufijo === "5") {
        path = `./public/img/${imageName}.${extension}`
        pathWebp = `./public/img/${imageName}.webp`
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

async function resizeImagen() {

  const imagenPath = './public/img/content'

  const directoryPath = './public/img/content';
  const directoryPathDestino = './public/img/content/latostadora'
    try {
        const files = await fs.readdir(directoryPath);
        for (let file of files) {
          if (file.endsWith('.png')) {
            
            const nombreFichero = file.split('.')[0]
            console.log(nombreFichero);
            await sharp(`${imagenPath}/${nombreFichero}.png`)
            .resize(5000, 5000)
            .sharpen() // this sharpens the image after resize
            .toFormat('png', { quality: 100 })
            .toFile(`${directoryPathDestino}/${nombreFichero}_print.png`);
          }
        }
    } catch (err) {
        console.error(`Error while reading directory: ${err}`);
    }
}

async function generateDalle3Image(texto, filename) {
  const image = await openai.images.generate(
    {
      model: "dall-e-3",
      prompt: `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: a photograph of someone doing '${texto}'`,
      n: 1,
      size: "1024x1024", 
    });

  await downloadImage("DALLE", image.data[0].url, "5", slugify(filename, {separator: '-'}))
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
    console.log('Generando articulo para : '+tituloSEO)

    tituloSEOEnglish = await translateTitle(tituloSEO, 'en-GB')
    // console.log(`Creando la magia para: ${tituloSEO}`);
    // categoriaSEO = await chatgptMagic(getPromptCategorias(tituloSEO))
    // console.log('Categoria SEO: '+categoriaSEO)
    
    //categoriaSEO = slugify(categoriaSEO, {separator: '-'})
    categoriaSEO = 'constelaciones'
    console.log('Categoria SEO slugify: '+categoriaSEO)
    urlSEO = slugify(tituloSEO, {separator: '-'})
    await generateImage(tituloSEOEnglish);

    articuloPathSEO = `./content/${categoriaSEO}/${urlSEO}.md`
    // guiaSEO = await chatgptMagic(promptArticulo(tituloSEO), "gpt-4-1106-preview");
    // guiaSEO = guiaSEO.split(/\r\n|\r|\n/)
    // guiaSEO = guiaSEO.filter((letter) => letter !== "")
    
    // await processContent(guiaSEO)
    await createArticle()

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
  description = description.replaceAll("\n","")
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
 
  // String to be added
  let stringToAdd = `
::photo-article
---
title: ${caption}
imageurl: ${imagenPrincipalSEO}
---
::

`;
let newContenido = contenido.replace('Octopus', stringToAdd)
newContenido = newContenido.replace('octopus', stringToAdd)
return newContenido


  // Input String
  // const searchTerm = "## ";
  // // Position to add string
  // let indexPosition = contenido.indexOf(searchTerm)
  
  // // Using substring method to split string
  // if (imagenPrincipalSEO !== undefined) {
  //   const newString = contenido.substring(0, indexPosition)
  //         + stringToAdd + contenido.substring(indexPosition)
  //   return newString
  // }
  // return contenido
  
}

async function addDiscover(contenido, imagen) {
  
  let stringToAdd = `
::photo-discover
---
imageurl: ${imagen}
title: ${tituloSEO}
---
::

`;

let newContenido = contenido.replace('Frodo', stringToAdd)
newContenido = newContenido.replace('frodo', stringToAdd)
return newContenido

// let re = new RegExp("##","ig");
//   let spaces = [];
//   let matched = "";
//   while ((matched = re.exec(contenido))) {
//     spaces.push(matched.index);
//   }
// let indexPosition = spaces[posicion]
// const newString = contenido.substring(0, indexPosition)
// + stringToAdd + contenido.substring(indexPosition)
// return newString
}

async function addPublicidad(contenido) {
  let stringToAdd = `
  ::publi-block
  ---
  ---
  ::
  
  `;
  
  let newContenido = contenido.replace('Chichi', stringToAdd)
  newContenido = newContenido.replace('chichi', stringToAdd)
  return newContenido
}

async function createArticle() {
  let date = new Date().toUTCString().slice(5, 16);
  let articulo = await chatgptMagic(promptArticulo(tituloSEO), 'gpt-4-1106-preview')
  descripcionSEO = await chatgptMagic(promptDescription(), 'gpt-4-1106-preview')
  descripcionSEO = await cleanTexto(descripcionSEO)

  let fullUrlArticle = 'https://'+dominio+'/'+categoriaSEO+'/'+urlSEO

  let cabeceroMarkdown = `---\ntitle: ${tituloSEO}\ndescription: ${descripcionSEO}\ncategory: ${categoriaSEO}\npublished_time: ${currentDate.toISOString()}\nurl: ${fullUrlArticle}\ncreated: ${date}\nimageUrl: ${imagenPrincipalSEO}\n`
  cabeceroMarkdown += await getMetaData(tituloSEO.replace(/[\n\r]+/g, ''), fullUrlArticle , dominio)
  cabeceroMarkdown += '\n---\n'
  articulo = cabeceroMarkdown + articulo
  articulo = await addDate(articulo)
  console.log(articulo)
  articulo = await addPicture(articulo, tituloSEO)
  articulo = await addDiscover(articulo, imagenSecundariaSEO)
  articulo = await addPublicidad(articulo)

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

async function pictureOfTheDay() {
  const baseApiUrl = 'https://api.nasa.gov/planetary';
  console.log(nasaApiKey)
  const url = `${baseApiUrl}/apod?api_key=${nasaApiKey}`
  const { data } = await axios.get(url)
  console.log(data)

  let date = new Date().toUTCString().slice(5, 16);
  let localDate = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


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

  const autor = data.copyright ? await cleanTexto(data.copyright) : '';

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
  const traducidosFile = 'traducidos.json'

  const category = 'messier'

  const directoryPath = './content/catalogo-messier';
  const directoryPathDestino = './content/messier'
    try {
      const traducidos = await fs.readFile(traducidosFile, 'utf-8');
      console.log('TRADUCIDOS')
      const articulosTraducidos = JSON.parse(traducidos);
      console.log(articulosTraducidos)

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
          let keyword = ''
          for (let line of lines) {
            
            if (line.startsWith('title: ')) {
              titlePin = line.substring(7, line.length)
            }
            if (line.startsWith('url: ')) {
              keyword = line.substring(5, line.length)
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
          console.log('-----------------------------------------------------')
          console.log(titlePin);
          console.log(description);
          console.log(imageUrl)
          console.log(imagenSecundaria);
          console.log(url);
          console.log(keyword);
          console.log('-----------------------------------------------------')
          const found = articulosTraducidos.find((element) => element.keyword === keyword)
          if (found === undefined) {
           
            // await generarArticuloTraducido(titlePin, imageUrl, imagenSecundaria, category )
            // add articulo traducido
            let object = {
              keyword: keyword,
              category: category
            }
            articulosTraducidos.push(object)
            console.log(object)
            let jsonString = JSON.stringify(articulosTraducidos, null, 2);
            console.log(jsonString)
            await fs.writeFile(traducidosFile, jsonString)
          }
          
        }
    } catch (err) {
        console.error(`Error while reading directory: ${err}`);
    }
}

switch (process.argv[2]) {
  case 'init':
    await writeJsonToFile()
    break;

  case 'nasa':
    console.log('Calculando apod de la NASA')
    await pictureOfTheDay()
    break;

  case 'magic': {
    for (let index = 0; index < 101; index++) {
      console.log('Calculando articulo: '+index)
      await obtenerCategoria();  
    }
    break;
  }

  case 'uno': {
    await obtenerCategoria();
    break;
  }

  case 'traduccion': {
    traduccionTotal()
    break;
  }
    
  case 'dalle':
    // Generacion imagenes DALLE 3
    await generateDalle3Image('Messier catalogue', 'Messier catalogue')
    break;

  case 'resize':
    await resizeImagen()
    break;
  case 'prueba':
    console.log('Probando: '+Date.now())
    break;

  default:
    break;
}

console.log(' -- FIN --')