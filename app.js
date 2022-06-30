import express from 'express'

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')

/* ROUTES */

// LANDING PAGE
app.get('/', (req, res) => {
    res.render('index')
})

// VIEW ALL LISTS
app.get('/lists', (req, res) => {
    res.render('lists')
})

// VIEW A LIST
app.get('/list/:id', (req, res) => {
    res.render('list')
})

// CREATE A LIST
app.get('/create', (req, res) => {
    res.render('create-list')
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