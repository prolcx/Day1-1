//Load required Libraries
const express = require('express') //express is the folder in node_modules folder
const handlebars = require('express-handlebars')

//configure the environment
//from cli, from env variable, default
const PORT=parseInt(process.argv[2]) || parseInt(process.env.PORT) ||3000 

//const PORT=parseInt(process.argv[2] || process.env.PORT) ||3000 this will drop to 3000 if it detect a NAN

//Create an instance of the express application
const app = express()

//Configure handlebars
app.engine('hbs',
handlebars({defaultLayout:'dafault.hbs'})
)
app.set('view engine','hbs')

//logging
let timeCounter=0

app.use(
    (req,resp,next) => {
        console.info(`${new Date()}:${req.method} ${req.originalUrl}`)
        next()
    }
)

//prefix match i.e. match base on partially
app.use('/time',
    (__,_,next)=>{
        timeCounter++
        next()
    }

)

//cart condition

const cart =[
    {name: 'apple', quantity:10},
    {name: 'orange', quantity:4}
]

app.get('/cart',
(req,resp)=> {
    count =0
    resp.status(200)
    resp.type('text/html')
    resp.render('cart',
    {empty: count <=0,
    count: count
    }           )
})




//GET/time/used
//literal match i.e. have to match exactly
app.get('/time/used',
(req,resp)=> {
    // set the status
    resp.status(200)
    // set the header
    // set the content type
    resp.type('text/html')
    // set the payload
    resp.send(`<h1>time has been used ${timeCounter}</h1>`)
}
)

console.info('>>', __dirname)

app.get('/time/used',
(req,resp)=> {
    resp.status(200)
    resp.type('text/html')
    resp.render('time)',
    {
        currentTime: new Date()
    }
                )
}
)


app.get('/time/hbs',
(req,resp)=> {
    resp.status(200)
    resp.type('text/html')
    resp.render('time'),
    {
        currentTime: new Date()
    }
                
}
)



// GET / time
app.get('/time',
(req,resp)=> {
    console.info(`The request is ${req.originalUrl}`)
    // set the status
    resp.status(200)
    // set the header
    // set the content type
    resp.type('text/html')
    // set the payload
    resp.send(`<h1>The current time is ${new Date()}</h1>`) //can send the response only once i.e. single line
}
)
// configure express
// Serve HTMLs from the public directory

app.use(
    express.static(__dirname+'/public')
   
)
app.use(express.static(__dirname + '/views'))
//if not found the request

app.use(
    (req, resp)=>{
        resp.redirect('/error.html')
    }
)

// start express
app.listen(
    PORT,       //port number   
    function() { //callback, execute after express has started
        console.info(`Application started on port ${PORT} at ${new Date()}`)
            })