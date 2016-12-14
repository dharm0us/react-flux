import {IndexRoute, Route, Router, browserHistory} from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom'
import constants from './constants/app-constants.js'
import {incrementActions} from './actions/app-actions.js'
import {TodoStore} from './stores/count-store.js'
console.log(constants)


class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {count: TodoStore.getCount()}
		this.increment = this.increment.bind(this)
		this._onChange = this._onChange.bind(this)
	}
	
	increment() {
		incrementActions.incrementCount()
	}

	_onChange() {
		this.setState({count: TodoStore.getCount()})
	}

	componentDidMount() {
		TodoStore.addChangeListener(this._onChange)
	}

	componentWillUnmount() {
		TodoStore.removeListener(this._onChange)
	}


	render() {
		return (
				<div>
				Current count : {this.state.count}
				<button onClick={this.increment}>Increment</button>
				</div>
		       )
	}
}

ReactDOM.render(<App />
		, document.getElementById('app'));

