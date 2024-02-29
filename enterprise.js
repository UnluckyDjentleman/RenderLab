const resp=require('./contacts.json')||[];
const fs=require('fs');


const getAllContacts=(res)=>{
    try{
        res.render('index', {
            contacts:resp
        });
    }
    catch(e){
        res.status(500).send(e);
    }
}
const addContactMethod=(data)=>{
    var index=parseInt(Math.floor(Math.random()*100))
    while(resp.find(elem=>elem.id===parseInt(index))){
        index=parseInt(Math.floor(Math.random()*100));
    }
    try{
        resp.push({
            id: index,
            name: data.name,
            phone: data.phone
        });
        save();
    }
    catch(e){
        console.log(e.message);
    }
}

const updateContactMethod=(req) =>{
    try{
        const ident=req.params["id"];
        const cont=resp.find(elem=>elem.id===parseInt(ident));
        if(cont){
            cont.name=req.body.name;
            cont.phone=req.body.phone;
        }
        save();
    }
    catch(e){
        console.log(e.message);
    }
}

const getForUpdate=async(req, res)=>{
    try{
        const ident=req.params["id"];
        const cont=resp.find(elem=>elem.id===parseInt(ident));
        res.render('editItem',{
            contacts: resp,
            thisContact: cont
        })
    }
    catch(e){
        console.log(e.message);
    }
}

const deleteContactMethod=(req)=>{
    try{
        const ident=req.params["id"];
        const index=resp.findIndex(elem=>elem.id===parseInt(ident));
        if(index){
            resp.splice(index,1)
        }
        save();
    }
    catch(e){
        console.log(e.message);
    }
}
const getForInsert=(res)=>{
    try{
        res.render('addItem', {
            contacts:resp
        });
    }
    catch(e){
        res.status(500).send(e);
    }
}


save=async()=>{
    try{
        await fs.promises.writeFile('contacts.json', JSON.stringify(resp, null, 4));
    }
    catch(e){
        console.log(e);
    }
}

module.exports={
    addContactMethod,
    getAllContacts,
    getForUpdate,
    updateContactMethod,
    deleteContactMethod,
    getForInsert
}
