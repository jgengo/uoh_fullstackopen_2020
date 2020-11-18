import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => <h2>Give feedback</h2>

const Button = ({ onClickEvent, content }) => <button onClick={onClickEvent}>{content}</button>

const Statistic = ({title, value}) => <tr><td>{title}</td><td>{value}</td></tr>

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const avg = (props.good - props.bad) / all
  const pct = props.good * 100 / all

  const ok = (
    <div>
      <table>
        <tbody>
          <Statistic title="good" value={props.good} />
          <Statistic title="neutral" value={props.neutral} />
          <Statistic title="bad" value={props.bad} />
          <Statistic title="all" value={all} />
          <Statistic title="avg" value={avg || 0} />
          <Statistic title="positive" value={pct || 0} />
        </tbody>
      </table>
    </div>
  )
  const ko = (
    <div>
      <p>no feedback given</p>
    </div>
  )

  return all === 0 ? ko : ok
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return (
    <div>
      <Header />
      <div>
        <Button onClickEvent={increaseGood} content="good" />
        <Button onClickEvent={increaseNeutral} content="neutral" />
        <Button onClickEvent={increaseBad} content="bad" />
      </div>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)