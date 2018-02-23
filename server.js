let express = require( "express");
let app = express();

let bodyParser = require( "body-parser" );
let path = require( "path" );
let mongoose = require( "mongoose" );

mongoose.Promise = global.Promise;

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

app.use( express.static( __dirname + "/client/dist" ) );

mongoose.connect( "mongodb://localhost/pet_shelter" );

let Schema = mongoose.Schema;

let PetSchema = new mongoose.Schema( {
    name: { type: String, required: true, minlength: 3 },
    type: { type: String, required: true, minlength: 3 },
    desc: { type: String, required: true, minlength: 3 },
    like: { type: Number, required: false },
    skills: [ String, String, String ] //>> try to improve

}, { timestamps: true } );
let Pet = mongoose.model( "Pet", PetSchema );

app.get( "/pets", function( req, res ){
    Pet.find( {}, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    });
})

app.get( "/pets/:id", function( req, res ){
    Pet.find( { _id: req.params.id }, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
})

app.post( "/pets", function( req, res ){
    let pet = new Pet( req.body );
    pet.save( function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
})

app.put( "/pets/:id", function( req, res ){
    Pet.update( { _id: req.params.id },{
        name: req.body.name,
        type: req.body.type,
        desc: req.body.desc,
        like: req.body.like,
        skills: [ req.body.skill1, req.body.skill2, req.body.skill3 ]
    })
})

app.delete( "/pets/:id", function( req, res ){
    Pet.remove( { _id: req.params.id }, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
})

app.all( "*", ( req, res, next ) => {
    res.sendFile( path.resolve( "./client/dist/index.html" ) );
});

app.listen( 8000, function(){
    console.log( "listening on port 8000" );
});