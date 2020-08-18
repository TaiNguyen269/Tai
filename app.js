const express = require('express');
const engines = require('consolidate');
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var publicDir = require('path').join(__dirname, '/public');
app.use(express.static(publicDir));

//npm i handlebars consolidate --save
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/addcake', (req, res) => {
    res.render('addcake');
})
app.get('/login', (req, res) => {
    res.render('login');
})
app.get('/update', (req, res) => {
    res.render('update');
})
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://taintgch18571:Tai123123@cluster0.rduyl.mongodb.net/test";

app.post('/add', async (req, res) => {
    let inputName = req.body.txtName;
    let inputPrice = req.body.txtPrice;
    // let img = req.body.img;
    let newCake = { name: inputName, price: inputPrice };

    let client = await MongoClient.connect(url);
    let dbo = client.db("Store");
    await dbo.collection("Cake").insertOne(newCake);
    res.redirect('/'); //
})

//localhost:3000
app.get('/', async function (req, res) {
    let client = await MongoClient.connect(url);
    let dbo = client.db("Store");
    let result = await dbo.collection("Cake").find({}).toArray();
    res.render('index', { model: result });
})

app.get('/remove', async (req, res) => {
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;
    let client = await MongoClient.connect(url);
    let dbo = client.db("Store");
    await dbo.collection("Cake").deleteOne({ _id: ObjectID(id) });
    res.redirect('/');

})
app.get('/update', async (req, res) => {
    let id = req.query.id;
    let inputName = req.body.txtName;
    let inputPrice = req.body.txtPrice;
    // let update = { name: inputName, price: inputPrice };
    var ObjectID = require('mongodb').ObjectID;
    let client = await MongoClient.connect(url);
    let dbo = client.db("Store");
    await dbo.collection("Cake").updateOne({ _id: ObjectID(id) }, {
        $set:
            { name: inputName, price: inputPrice },


    });
    res.redirect('/');

})
// app.get('/update', async (req, res) => {
//     var ObjectID = require('mongodb').ObjectID;
//     let client = await MongoClient.connect(url);
//     let dbo = client.db("Store");
//     await dbo.collection("Cake").find({}).toArray(function (err, result) {
//     });
//     res.redirect('/');
// })

// app.get('update') = async (req,res)=>{
//     let id=req.query.id;
//     var ObjectID = require('mongodb').ObjectID;
//     let client = await MongoClient.connect(url);
//     let dbo = client.db('Store');
//     let user =await dbo.collection("Cake").find({_id:ObjectID(id.toString())}).toArray();
//     console.log(user);
//    res.render('update',{model:user});
// };
// app.get('/update', async (req, res) => {
//     let id = req.body.id;
//     let inputName = req.body.txtName;
//     let inputPrice = req.body.txtPrice;
//     var ObjectID = require('mongodb').ObjectID;
//     let client = await MongoClient.connect(url);
//     let dbo = client.db('Store');
//     let user = await dbo.collection("Cake").
//         find({ _id: ObjectID(id.toString()) }).toArray();
//     let t = await dbo.collection("Cake").
//         updateOne({ _id: ObjectID(id.toString()) },
//             {
//                 $set: {
//                     name: inputName.toString(),
//                     price: inputPrice.toString(),
//                 }
//             })
//     console.log(t);
//     res.redirect('/');
// });
// app.get('/update', async(req, res) => {
//         let id = "5f3a343aca42c41c580766c7";
//         var ObjectID = require('mongodb').ObjectID;
//         let client = await MongoClient.connect(url);
//         let dbo = client.db("Store");
//         await dbo.collection("Cake").updateOne({
//             _id: ObjectID(id),
//             $set: {
//                 name: "nam",
//             }
//         });
//         res.redirect('/');
//     })
//
// app.update = async(req, res) => {
//     let id = req.query.id;
//     var ObjectID = require('mongoDB').ObjectID;
//     let client = await MongoClient.connect(url);
//     let dbo = client.db('Store');
//     let user = await dbo.collection("Cake").find({ _id: ObjectID(id.toString()) }).toArray();
//     console.log(user);
//     res.render('update', { model: user });
// };
// app.update = async(req, res) => {
//     let id = req.body.txtid;
//     let inputName = req.body.txtName;
//     let inputPrice = req.body.txtPrice;



//     var ObjectID = require('mongoDB').ObjectID;
//     let client = await MongoClient.connect(url);
//     let dbo = client.db('Store');
//     let user = await dbo.collection("Cake").
//         // find({ _id: ObjectID(id.toString()) }).toArray();
//     let t = await dbo.collection("Cake").
//     updateOne({ "_id": ObjectID(id.toString()) }, {
//         $set: {
//             name: inputName.toString(),
//             price: inputPrice.toString(),

//         }
//     })
//     console.log(t);

//     res.redirect('/');
// };

const PORT = process.env.PORT || 3000;
app.listen(PORT);