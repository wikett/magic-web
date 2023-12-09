import OpenAI from 'openai'
import 'dotenv/config'
import fs from 'fs/promises'
import slugify from '@sindresorhus/slugify';
import axios from 'axios'
import sharp from 'sharp';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_GPT_API
})

const dominio = "blog.astroingeo.org"
const categoriaWeb = "Astronomía"
const category = "astronomy"
const autores = "Mario"
const expertos = "experto en astronomía"
const infoQuienesSomos = "explicacion"
const urlFacebook = ""
const urlInstagram = ""
const urlX = ""
const urlLinkedin = ""

const infoJson = {}

function promptTitle() {
  return `Actúa como un experto en Marketing y aficionado a la ${categoriaWeb}. Crea un listado con 6 nombres para una marca que hable sobre ${categoriaWeb}. Dame solo el resultado final.`
}

function promptAuthor() {
  return `Dame un listado de 6 nombres de mujer y 6 de hombre`
}

function promptAuthors() {
  return `Actúa como un experto en Marketing y aficionado a la ${categoriaWeb}. Escribe una frase corta como título atractivo para leer mi blog de ${categoriaWeb}`
}

function promptAuthorsDescription() {
  return `Actúa como un aficionado a la ${categoriaWeb}. Escribe un pequeño texto de unas 100 palabras explicando la nueva aventura de crear este blog de ${categoriaWeb}. Redáctalo en primera persona. El resultado hazlo en una etiqueta "p" de HTML resaltando con negritas las partes más importantes.`
}

function promptAuthorsSmallDescription() {
  return `Actúa como un aficionado a la ${categoriaWeb}. Escribe un pequeño texto de unas 40 palabras de presentación de una persona la que le motiva escribir un blog sobre ${categoriaWeb}`
}

function promptAboutUs() {
  return `Dame un listado de 6 nombres de mujer y 6 de hombre`
}

function promptDescription() {
  return `Actúa como experto en SEO y ${categoriaWeb}. Escribe una meta descripción como máximo de 150 caracteres sobre ${categoriaWeb}.`
}

function promptAmazonDescription() {
  return `Actúa como un aficionado a la ${categoriaWeb}. Escribe un pequeño texto de no más de 40 palabras que quieres recomendar ciertas marcas de ${categoriaWeb} de tu confianza.`
}

function promptCategoryDescription() {
  return `Actúa como un aficionado a la ${categoriaWeb}. Escribe un pequeño texto de unas 50 palabras explicando todas las posibilidades que tiene escribir un blog sobre ${categoriaWeb}.`
}

function promptDatosCuriosos() {
  return `Actúa como un aficionado a la ${categoriaWeb}. Escribe un listado de 3 curiosidades sobre ${categoriaWeb} sobre las 50 palabras cada una de ellas.`
}


function promptImageAutores() {
  // return `Haz una fotografía realista de una persona de España  entre 30 y 45 años interesada en ${categoriaWeb}`
  return `A realistic portrait of a young person around 25 years old.`
  // return `full body studio photograph of a fictional 1980 teen pop star for their album cover`
}

function promptLogo() {
  return `Minimalist Boho graphics logo for a ${category} website`
}

async function downloadAssets(url, nombreFicheroImagen) {
  console.log(url)
  try {
      const path = `./public/img/content/${nombreFicheroImagen}.png` 
      const pathWebp = `./public/img/content/${nombreFicheroImagen}.webp`
      const publicPicture = `https://${dominio}/img/content/${nombreFicheroImagen}.webp`

      const response = await axios.get(url, { responseType: 'stream' });
      if(response.status === 200) {
          await fs.writeFile(path, response.data);
          sharp(path)
          .webp()
          .toFile(pathWebp, (err, info) => {
            if (err) {
              console.error('Error occurred while converting image to WebP:', err);
            } else {
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

async function generateImage(prompt, nombreFicheroImagen) {
  const image = await openai.images.generate(
    {
      size: '1024x1024',
      prompt: `${prompt}'` 
    });

  const imagenChatGPT = image.data[0].url

  await downloadAssets(imagenChatGPT, nombreFicheroImagen)
}

async function createInfo() {

  infoQuienesSomos = await chatgptMagic(promptQuienesSomos(), 'gpt-4-1106-preview')
  descripcionSEO = await chatgptMagic(promptDescription(), 'gpt-4-1106-preview')

  let cabeceroMarkdown = `---\ntitle: ${tituloSEO}\ndescription: ${descripcionSEO}\ncategory: ${categoriaSEO}\npublished_time: ${currentDate.toISOString()}\nurl: ${urlSEO}\ncreated: ${date}\nimageUrl: ${imagenPrincipalSEO}\n`
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

// await generateImage(promptImageAutores, "autor")

// await generateImage(promptLogo, "logo")



async function writeJsonToFile() {
  try {
    infoJson.title = await chatgptMagic(promptTitle())
    infoJson.author = await chatgptMagic(promptAuthor())
    infoJson.authors = await chatgptMagic(promptAuthors())
    infoJson.authorsDescription = await chatgptMagic(promptAuthorsDescription())
    infoJson.authorsSmallDescription = await chatgptMagic(promptAuthorsSmallDescription())
    infoJson.description = await chatgptMagic(promptDescription())
    infoJson.domain = ""
    infoJson.websiteName = ""
    infoJson.emailContacto = ""
    infoJson.navigation = [
      { 
          "name": "Hogar",
          "href": "/hogar"
      },
      { 
          "name": "Ropa",
          "href": "/ropa"
      },
      { 
          "name": "Tecnología",
          "href": "/tecnologia"
      },
      { 
          "name": "Otros",
          "href": "/otros"
      },
      { 
          "name": "Quienes somos",
          "href": "/quienes-somos"
      },
      { 
          "name": "Contacto",
          "href": "/contacto"
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

    const jsonString = JSON.stringify(infoJson, null, 2);

    await fs.writeFile('./content/info.json', jsonString);
    console.log('JSON has been written to the file successfully.');
  } catch (err) {
    console.error('An error occurred while writing the JSON to a file:', err);
  }
}

writeJsonToFile();

