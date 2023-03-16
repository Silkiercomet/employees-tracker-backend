const express = require("express")
const { ObjectId } = require("mongodb")
const { getDb } = require("../db/conn")

// recordRoutes es una instancia de express.Router, todas las rutas compartiran esta instancia como padre
const recordRoutes = express.Router()

const dbo = require("../db/conn")

const objectId = require("mongodb").ObjectId

// esta ruta devuelve todas las entradas de la coleccion
recordRoutes.route("/record").get(function (req,res) {
    let db_connect = dbo.getDb("employees")
    db_connect
    .collection("records")
    .find({})
    .toArray(function(err,result){

        if(err) throw err
        res.json(result)
    })
})
// esta ruta busca y devuelve una entrada de acuerdo a su id 
recordRoutes.route("/record/:id").get(function(req,res){
    let db_connect = dbo.getDb()
    let myquery = {_id: ObjectId(req.params,id)}

    db_connect
    .collection("records")
    .findOne(myquery, function (err, result) {
        if (err) throw err
        res.json(result)
    })
})
// esta ruta agrega una nueva entrada a la coleccion
recordRoutes.route("/record/add").post(function (req, res){
    let db_connect = dbo.getDb()
    let myObj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level
    };
    db_connect.collection("records")
    .insertOne(myObj, function(err, result){
        if (err) throw err
        res.json(result)
    })
})
// esta ruta actualizara records por su id
recordRoutes.route("/update/:id").post(function(req,res){
    let db_connect = getDb()
    let myquery = {_id: ObjectId(req.params.id)}
    let newValues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level
        }
    };
    db_connect
    .collection("records")
    .updateOne(myquery, newValues, function(err, result){
        if(err) throw err
        console.log("1 document update")
        res.json(result)
    })
})
// this section will help you delete a record
recordRoutes.route("/:id").delete(function (req,res) {
    let db_connect = dbo.getDb()
    let myquery = {_id: ObjectId(req.params.id)}

    db_connect.collection("records").deleteOne(myquery, function(err, obj){
        if(err) throw err
        console.log("1 document deleted")
        response.json(obj)
    } )
})

module.exports = recordRoutes