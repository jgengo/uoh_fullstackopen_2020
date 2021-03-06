import React, { useState } from 'react'
import { Switch, Route, useRouteMatch, useHistory} from "react-router-dom"

import About from './components/About'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import Menu from './components/Menu'

import { useField } from './hooks'

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)


const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const history = useHistory()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
    props.addNotification(`you just added a new anecdote ${content.value}`)
  }

  const handleReset = () => {
    content.onChange({target: { value: ""}})
    author.onChange({target: { value: ""}})
    info.onChange({target: { value: ""}})
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input id='content' {...content} />
        </div>
        <div>
          author
          <input id='author' {...author} />
        </div>
        <div>
          url for more info
          <input id='info' {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='reset' onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const addNotification = (msg) => {
    setNotification(msg)
    setTimeout(() => setNotification(''), 10000)
  }

  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdoteById(match.params.id) : null

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
      <div>
        <div className='notification'>{notification}</div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Switch>

          <Route exact path='/'>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>

          <Route path='/anecdotes/:id'>
            <Anecdote anecdote={anecdote} />
          </Route>

          <Route path='/about'>
            <About />
          </Route>

          <Route path='/new'>
            <CreateNew addNew={addNew} addNotification={addNotification}/>
          </Route>
        </Switch>
        <Footer />
      </div>
  )
}

export default App;
