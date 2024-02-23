
const API_BASE="/api/v1"

var contacts = [
    {
        name: 'pepe',
        phone:'12345'
    },{
        name:'luis',
        phone:'54321'
    }
];
// app.get(API_BASE+"/contacts", (req,res)=>{
//     res.send(contacts); //Mala practica
// });



module.exports = (app) => {

    app.get(API_BASE + "/contacts", (req, res) => {
        res.json(contacts);
    });
    
    app.post(API_BASE + "/contacts", (req, res) => {
        let contact = req.body;
        contacts.push(contact);
        res.json(contacts); // Devolver el array de contactos actualizado como respuesta
        res.sendStatus(201, "created");
    });
}