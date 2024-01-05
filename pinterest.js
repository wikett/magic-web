import axios from 'axios'
import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path';

const token = process.env.PINTEREST_API; // Replace with your API token
const board_id = '<insert_your_sandbox_board_id>'; // Replace with your sandbox board id

const boardConstelaciones = '962785295278581204'
const boardSistemaSolar = '962785295278581205'
const boardTelescopios = '962785295278581206'
const boardCieloProfundo = '962785295278581207'
const boardAstronomiaCuriosa = '962785295278581216'

const directoryPath = './content/sistema-solar';
async function printFilesLineByLine() {
    try {
        const files = await fs.readdir(directoryPath);
        for (let file of files) {
          const filePath = path.join(directoryPath, file);
          const data = await fs.readFile(filePath, 'utf-8');
          const lines = data.split('\n');

          let titlePin = ''
          let description = ''
          let category = '?'
          let imageUrl = ''
          let url = ''
          for (let line of lines) {

            if (line.startsWith('title: ')) {
                titlePin = line.substring(7, line.length)
            }
            if (line.startsWith('description: ')) {
                description = line.substring(13, line.length)
            }
            if (line.startsWith('category: ')) {
                category = line.substring(10, line.length)
            }
            if (line.startsWith('imageUrl: ')) {
                imageUrl = line.substring(10, line.length)
            }
            if (line.includes('blog.astroingeo.org') && line.includes(category)) {
                url = line.substring(16, line.length-1)
            }
          }
          console.log(imageUrl);
          await createPin(titlePin, description, url, imageUrl, boardSistemaSolar)
        }
    } catch (err) {
        console.error(`Error while reading directory: ${err}`);
    }
}



function readFiles() {
// The path to your directory
const directoryPath = './content/cielo-profundo';

fs.readdirSync(directoryPath).forEach(file => {
    const filePath = path.join(directoryPath, file);

    // console.log(`filePath ${filePath}`);

    // Read the file
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

    // Loop through each line
    let titlePin = ''
    let description = ''
    let category = '?'
    let imageUrl = ''
    let url = ''
    lines.forEach(line => {
        // console.log(line);
        if (line.startsWith('title: ')) {
            titlePin = line.substring(7, line.length)
        }
        if (line.startsWith('description: ')) {
            description = line.substring(13, line.length)
        }
        if (line.startsWith('category: ')) {
            category = line.substring(10, line.length)
        }
        if (line.startsWith('imageUrl: ')) {
            imageUrl = line.substring(10, line.length)
        }
        if (line.includes('blog.astroingeo.org') && line.includes(category)) {
            url = line.substring(16, line.length-1)
        }
    });
    console.log(imageUrl);
    createPin(titlePin, description, url, imageUrl, boardCieloProfundo)
});

}


async function createPin(title, description, link, image, boardId) {
    await axios.post('https://api-sandbox.pinterest.com/v5/pins', {
        title: title,
        description: description,
        board_id: boardId,
        link: link,
        media_source: {
            source_type: "image_url",
            url: image
        }
    }, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    })
    .then(function(response) {
    // handle success
    console.log(response.data);
    })
    .catch(function(error) {
    // handle error
    console.log('Error occurred while attempting to upload image to Pinterest.');
    console.log(error);
    });
}

async function createBoard() {

    await axios.post('https://api-sandbox.pinterest.com/v5/boards', {
        "name": "Astronomia Curiosa",
        "description": "A veces queremos hablar sobre temas de astronomía pero no tenemos claro donde ubicarlos, por lo que hemos creado esta categoría para englobar temas distintos que nos gusta hablar. Espero que os guste!",
        "privacy": "PUBLIC"
    }, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    })
    .then(function(response) {
    // handle success
    console.log(response.data);
    })
    .catch(function(error) {
    // handle error
    console.log('Error occurred while attempting to upload image to Pinterest.');
    console.log(error);
    });
}


async function getBoards() {
    console.log(token)
    await axios.get('https://api-sandbox.pinterest.com/v5/boards', {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    })
    .then(function(response) {
    // handle success
    console.log(response.data);
    })
    .catch(function(error) {
    // handle error
    console.log('Error occurred while attempting to upload image to Pinterest.');
    console.log(error);
    });
}
//createBoard()
//getBoards()
//createPin()
printFilesLineByLine()