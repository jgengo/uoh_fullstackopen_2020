import React from 'react'

const Part = (props) => <li key={props.id}>{props.name} {props.exercises}</li>

const Content = ({parts}) => {
  return (
    <ul>
      {parts.map( part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </ul>
  )
}

const Course = ({course}) => {
  const total = course.parts.reduce( (a, b) => a + (b.exercises || 0), 0)

  return (
    <div key={course.id}>
      <h1>{course.name}</h1>
      <Content parts={course.parts} />
      <strong>total of {total} exercises</strong>
    </div>
  )
}

export default Course