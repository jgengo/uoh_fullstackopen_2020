import React from 'react'
import ReactDOM, { render } from 'react-dom'


const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => <p>{props.name} {props.exercises}</p>

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => <p>Number of exercises {props.parts.length}</p>

const App = () => {
  // const-definitions
  const course = 'Half Stack application development'
  
  const parts = [
    {name: 'Fundamentals of React', exercises: 10},
    {name: 'Using props to pass data', exercises: 7},
    {name: 'State of a component', exercises: 14},
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))