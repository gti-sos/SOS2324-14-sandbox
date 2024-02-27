let cool = require("cool-ascii-faces");
let express = require("express");
let bodyParser = require("body-parser");
let contactAPI = require("./api-contacts");

let app = express();
// Para que esto funcione debemos ejecutar el comando export PORT=11111 en WSL
// Seguido de set | grep PORT
const PORT = (process.env.PORT || 10000);

app.use(bodyParser.json());

app.use("/",express.static("./public"));

app.get("/cool", (req,res)=>{
    res.send(`<html><body><h1>${cool()}</h1></body></html>`);
});

contactAPI(app);



app.get("/samples/EGO", (req, res) => {
    res.send("<html><body><h1>Resultado de los datos de Enrique</h1></body></html>")
    res.send(`<script src="/Enrique/index-EGO.js" type=module></script>`)
})

app.get("/samples/NRM", (req, res) => {
    res.send("<html><body><h1>Resultado de los datos de Nico</h1></body></html>")
    res.send(`<script src="/Nico/index-NRM.js" type=module></script>`)
})
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}.`);
});

console.log(`Server initializing...`);