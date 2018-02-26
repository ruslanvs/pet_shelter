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

let constraints = {
    minlength: 3,
    maxlength: 50,

    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        unique: true,
    },

    type: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        unique: false,
        
    },

    desc: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        unique: false,
    },

    like: {
        type: Number,
    },

    skills: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: false
    },

}

let PetSchema = new mongoose.Schema( {
    name: constraints.name,
    type: constraints.type,
    desc: constraints.desc,
    like: constraints.like,
    skill1: constraints.skills,
    skill2: constraints.skills,
    skill3: constraints.skills,
}, { timestamps: true } );

PetSchema.index( {//ensures uniqueness
    name: 1,
    // email: 1
}, { unique: true } );

let Pet = mongoose.model( "Pet", PetSchema );

app.get( "/constraints", function( req, res ){
    res.json( constraints );
})

app.get( "/pets", function( req, res ){
    Pet.find( {}, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
    .sort( "type" );
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
        skill1: req.body.skill1,
        skill2: req.body.skill2,
        skill3: req.body.skill3
    }, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
})

app.get( "/pets/:id/like", function( req, res ){
    Pet.findOneAndUpdate( { _id: req.params.id }, {$inc: { like: 1 }}, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
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