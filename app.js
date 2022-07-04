import express from 'express'
import mysql from 'mysql'

const app = express()
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'list_app_v2'
})

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

/* ROUTES */

// LANDING PAGE
app.get('/', (req, res) => {
    res.render('index')
})

// VIEW ALL LISTS
app.get('/lists', (req, res) => {
    let sql = 'SELECT * FROM list ORDER BY date_created DESC'
    connection.query(
        sql, (error, results) => {
            res.render('lists', {lists: results})
        }
    )
    
})

// VIEW A LIST
app.get('/list/:id', (req, res) => {
    res.render('list')
})

// CREATE A LIST
app.get('/create', (req, res) => {
    res.render('create-list')
})

app.post('/create', (req, res) => {
    let sql = 'INSERT INTO list (title, body) VALUES (?,?)'

    connection.query(
        sql,
        [req.body.title, req.body.body], 
        (error, results) => {
            res.redirect('/lists')
        }
    )
})

// EDIT A LIST
app.get('/edit/:id', (req, res) => {
    res.render('edit-list')
})


// PAGE NOT FOUND
app.get('*', (req, res) => {
    res.render('404')
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('application is live')
})