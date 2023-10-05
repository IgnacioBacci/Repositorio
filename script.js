let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/CJ0_Oejbt/'; // URL del modelo de Teachable Machine
let img;
let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json'); // Carga el modelo antes de que se cargue la página
}

function setup() {
  createCanvas(400, 400); // Crea un canvas de 400x400 píxeles
  let uploadBtn = createFileInput(handleFile); // Crea un botón para cargar un archivo
  uploadBtn.position(20, 20); // Establece la posición del botón
}

function draw() {
  background(255); // Establece el fondo blanco
  if (img) {
    image(img, 0, 0, width, height); // Muestra la imagen cargada en el canvas
    classifier.classify(img, gotResult); // Clasifica la imagen y llama a la función gotResult cuando se obtienen los resultados
    noLoop(); // Detiene el loop de dibujo
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    img = createImg(file.data, ''); // Crea un elemento de imagen con el archivo cargado
    img.hide(); // Oculta la imagen original
    loop(); // Inicia el loop de dibujo
  } else {
    img = null; // Establece la imagen en null si el archivo no es una imagen
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error); // Muestra el error en la consola
    return;
  }
  label = results[0].label; // Obtiene la etiqueta de clasificación del primer resultado
  let emoji = { // Objeto que asocia las etiquetas de clasificación con emojis
    "Perro": "🐶",
    "Gato": "🐱"
  }[label];
  textSize(100); // Establece el tamaño de la fuente
  text(emoji, width / 2, height / 2); // Muestra el emoji correspondiente a la etiqueta de clasificación en el centro del canvas
}