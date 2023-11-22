import OpenAI from 'openai'
import 'dotenv/config'
import fs from 'fs/promises'
import slugify from '@sindresorhus/slugify';
import axios from 'axios'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_GPT_API
})

const dominio = "comolimpiarcomoexpertas.com"
const categoriaWeb = "limpieza"
const autores = "Mayte y Diana"
const expertos = "expertas en limpieza"
const infoQuienesSomos = "explicacion"
const urlFacebook = ""
const urlInstagram = ""
const urlX = ""
const urlLinkedin = ""

function promptQuienesSomos() {
  return `Actúa como un especialista en ${categoriaWeb}. Escribe un pequeño texto de unas 100 palabras explicando la nueva aventura de crear este blog de ${categoriaWeb}.`
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
      size: '1024x1024',
      prompt: `a photograph of someone doing '${tituloSEOEnglish}', realistic` 
    });

  imagenDiscover = image.data[0].url

  await downloadImage(imagenDiscover, "3")
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


// await obtenerCategoria();  

