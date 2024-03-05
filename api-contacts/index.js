
const API_BASE="/api/v1"

var initialContacts = [
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



module.exports = (app, db) => {

    app.get(API_BASE + "/loadInitialContacts", (req, res) => {
        db.insert(initialContacts);
        res.sendStatus(200, "OK");
    });

    app.get(API_BASE + "/contacts", (req, res) => {
        db.find({},(err,contacts)=>{
            if(err){
                res.sendStatus(500, "Internal Error");
            }else{
                res.send(JSON.stringify(contacts.map((c)=>{
                    delete(c._id);
                    return c;
                }),null,2))
            }
        });
    });
    
    app.post(API_BASE + "/contacts", (req, res) => {
        let contact = req.body;
        db.insert(contact);
        //res.json(contacts); // Devolver el array de contactos actualizado como respuesta
        res.sendStatus(201, "created");
    });

    app.delete(API_BASE + "/contacts/:name", (req, res) => {
        let name = req.params.name;
        db.remove({"name": name},{},(err, numRemoved)=>{
            if(err){
                res.sendStatus(500, "Internal Error");
            }else{
                if(numRemoved>=1){
                    res.sendStatus(200, "OK");
                }else{
                    res.sendStatus(404, "Not Found");
                }
            }
        });
        //res.json(contacts); // Devolver el array de contactos actualizado como respuesta
        
    });
}