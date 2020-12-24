import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from '../../template'
import routes from './routes/routes'
import http from 'http'
import socketio from 'socket.io'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import MainRouter from './../MainRouter'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import theme from './../theme'

//comment out before building for production
<<<<<<< HEAD
// import devBundle from './devBundle'
=======
//import devBundle from './devBundle'
>>>>>>> 66a50f0cc10b84f3b44d261049a830ab3b9888a7

const CURRENT_WORKING_DIR = process.cwd()
const app = express()
app.use('/', routes)

//comment out before building for production
<<<<<<< HEAD
// devBundle.compile(app)
=======
//devBundle.compile(app)
>>>>>>> 66a50f0cc10b84f3b44d261049a830ab3b9888a7

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.get('*', (req, res) => {
    const sheets = new ServerStyleSheets()
    const context = {}
    const markup = ReactDOMServer.renderToString(
      sheets.collect(
        <StaticRouter location={req.url} context={context}>
            <ThemeProvider theme={theme}>
              <MainRouter/>
            </ThemeProvider>
        </StaticRouter>
       )
    )
      if (context.url) {
        return res.redirect(303, context.url)
      }
      const css = sheets.toString()
      res.status(200).send(Template({
        markup: markup,
        css: css
      }))
  })
  const server = http.createServer(app)
  const io = socketio(server)
  
  io.on('connection', (socket)=>{
      console.log('connection made')
      socket.on('disconnect', ()=>{
          console.log('User has left')
      })
  })
  // Catch unauthorised errors
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"error" : err.name + ": " + err.message})
    }else if (err) {
      res.status(400).json({"error" : err.name + ": " + err.message})
      console.log(err)
    }
  })
  
  export default app
  
