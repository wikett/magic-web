import OpenAI from 'openai'
import 'dotenv/config'
import fs from 'fs/promises'
import slugify from '@sindresorhus/slugify';

let guiaSEO = ""
let tituloSEO = ""
let categoriaSEO = ""

function getPromptGuia(titulo) {
  return `Create an outline for an article that will be 2,000 words on the keyword "${titulo}" based on the top 10 results from Google in Spanish.Include every relevant heading possible. Keep the keyword density of the headings high.For each section of the outline, include the word count.Include FAQs section in the outline too, based on people also ask section from Google for the keyword.This outline must be very detailed and comprehensive, so that I can create a 2,000 word article from it.Generate a long list of LSI and NLP keywords related to my keyword. Also include any other words related to the keyword.Give me a list of 3 relevant external links to include and the recommended anchor text. Make sure they're not competing articles.`
}

function getPromptTitulo(titulo, palabras) {
  return `Write an article around ${palabras} words about '${titulo}', like a guy who knows 80% English, use very easy-to-understand English words, and give them nuance. Write this article in Spanish. Do not use normal AI words. Could you use markdown and emphasize some parts of the text?`
}

function getPromptCategorias(titulo) {
  return `Podrías clasificar esta frase "${titulo}" en alguna de estas categorías: hogar, electrodomesticos, ropa, tecnologia, salud u otros. En la respuesta indica solo la categoría, por favor.`
}

const filepath = 'keywords.txt';

function asignarCategoria(categoria) {
  if (categoria.includes('hogar'))
    return 'hogar'
  if (categoria.includes('electrodomesticos'))
    return 'electrodomesticos'
  if (categoria.includes('ropa'))
    return 'ropa'
  if (categoria.includes('tecnologia'))
    return 'tecnologia'
  return 'otros'
}

async function obtenerCategoria() {
  try {
    // Read the contents of the file
    const data = await fs.readFile(filepath, 'utf8');

    // Split the contents into an array of lines
    const lines = data.split('\n');
    tituloSEO = lines[0];
    categoriaSEO = await chatgptMagic(getPromptCategorias(tituloSEO))
    
    categoriaSEO = asignarCategoria(categoriaSEO)
    console.log('Categoria', categoriaSEO)

    if (!categoriaSEO.includes("salud")) {
      // Creamos articulo SEO
      try {
        const filepathArticulo = `./content/${categoriaSEO}/${slugify(tituloSEO, {separator: '-'})}`
        const contenidoArticulo = `---\ntitle: ${tituloSEO}\n---\n`
        await fs.writeFile(filepathArticulo, contenidoArticulo, 'utf8');
        console.log('File written successfully!');
      } catch (err) {
        console.error(err);
      }

      console.log('Preparando guia SEO...')
      // guiaSEO = await chatgptMagic(getPromptGuia(tituloSEO), "gpt-4");
      // console.log(guiaSEO);
    }

    // Remove the first line
    lines.shift();

    // Join the remaining lines back into a single string
    const modifiedContent = lines.join('\n');

    // Write the modified string back to the file
    await fs.writeFile(filepath, modifiedContent, 'utf8');

    console.log('First line removed successfully!');
  } catch (err) {
    console.error(err);
  }
}


console.log('inicio')
obtenerCategoria();

// example();


console.log('--------------------------------')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_GPT_API
})

function letrasaquitar(titulo) {
    for (let index = 0; index < titulo.length; index++) {
        const element = titulo[index];
        if(element === ' ' && index>1) {
            return index;
        }        
    }
}

function letrasaquitarFinal(titulo) {
    for (let index = titulo.length; index > 1; index--) {
        const element = titulo[index];
        if(element === '(') {
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

function limpiarGuiones(titulo) {
  let nuevoTitulo = titulo.replace(' -', '-')
  nuevoTitulo = nuevoTitulo.replace(' I', 'I')
  nuevoTitulo = nuevoTitulo.replace(' V', 'V')
  nuevoTitulo = nuevoTitulo.replace(' X', 'X')
  return nuevoTitulo;
}
function limpiarTitulo(titulo) {
  // const tituloLimpiado = limpiarGuiones(titulo);
  const letrasAQuitar = letrasaquitar(titulo);
  console.log('letrasAQuitar: '+letrasAQuitar)
  const letrasAQuitarAtras = letrasaquitarFinal(titulo);
  let tituloFinal = titulo.substring(letrasAQuitar, letrasAQuitarAtras)
  tituloFinal = tituloFinal.trim()
  return tituloFinal;
}


async function processContent(contenido) {
  // console.log(contenido);
  let headings = []
  let titulosLimpios = []
  for (let i = 0; i < contenido.length; i++) {
    const element = contenido[i];
    console.log(element)
    if (element.includes('I.') || element.includes('V.') || element.includes('X.')) {
      headings.push(i);      
      titulosLimpios.push(limpiarTitulo(element))
    }    
  }
  for (let i = 0; i < contenido.length; i++) {
    const element = contenido[i];
    if (headings.includes(i)) {
      // Creamos H2
    }
    else {
      // Creamos contenido correspondiente utilizando chatGPT 
      console.log()
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
        //     model: 'gpt-4',
      });
  return completion.choices[0].message.content
}

// const gtpPrueba = await chatgptMagic('2');
// console.log('Resultado')
// console.log(gtpPrueba[0].message.content)

let prueba = `I. Introduction (200 words)
- II. ¿Qué es la plata y por qué se ensucia? (200 words)
III. La importancia de la limpieza de la plata (200 words)
- ¿Por qué es importante limpiar la plata?
- ¿Cómo afecta la suciedad a la plata?

IV. Métodos de limpieza de plata domésticos (400 words)
- Uso de bicarbonato de sodio y papel de aluminio
- El vinagre y sal como solución de limpieza
- Cómo limpiar plata con pasta de dientes
- El uso de jugo de limón y agua
- El uso de maíz y agua

V. Ideas equivocadas sobre la limpieza de plata (200 words)
- El uso de Coca-Cola para limpiar la plata
- Limpieza de silver con  jugo de naranja
- Usar peróxido de hidrógeno para limpiar plata

VI. Productos profesionales para limpiar plata (200 words)
- Líquidos y polvos de limpieza de plata
- Cremas y toallitas para limpiar plata
- Limpiador ultrasónico

 VII. Consejos y advertencias para la limpieza de plata (300 words)
- Cuándo buscar ayuda profesional para la limpieza de plata
- Cómo almacenar la plata para reducir la necesidad de limpieza
- Pasos de precaución al limpiar plata antigua o valiosa

VIII. Preguntas frecuentes sobre la limpieza de plata (300 words)
- ¿Por qué la plata se oscurece y cómo se puede prevenir?
- ¿Se puede limpiar plata con productos de limpieza comunes del hogar?
- ¿Qué efectos pueden tener productos químicos duraderos en la plata?
- ¿Cómo limpiar la plata que está gravemente empañada?

IX. Conclusion (100 words)

LSI and NLP keywords:
Limpieza, quitar oscurecimiento, joyería, plata esterlina, solución de limpieza, bicarbonato de sodio, vinagre, sal, pasta de dientes, jugo de limón, maíz, agua, Coca-Cola, jugo de naranja, peróxido de hidrógeno, líquidos de limpieza, polvos de limpieza, cremas, toallitas, limpiador ultrasónico, protección de la plata, almacenamiento de plata, antigüedades, piezas de plata valiosas.

External Links:
1. Instituto Gemológico Español guide on caring for silver (Anchor text: "Guía del Instituto Gemológico Español sobre el cuidado de la plata")
2. Chemical explanation of why silver tarnishes from RSC.org (Anchor text: "Explicación química del por qué se empaña la plata")
3. Selection of professional silver cleaning products from El Corte Ingles (Anchor text: "Selección de productos profesionales para limpiar plata de El Corte Ingles").`
// const seoArticle = await chatgptMagic(promptArticle)
prueba = prueba.split(/\r\n|\r|\n/)
prueba = prueba.filter((letter) => letter !== "")
// console.log(prueba)
// await processContent(prueba)

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