import constants from '../constants/app-constants.js'
import dispatcher from '../dispatcher/dispatcher.js'
import {EventEmitter} from 'events'

let _count = 0

function getCount() {
	return _count
}

function incrementCount() {
	_count = _count + 1
	console.log('newcount')
	console.log(_count)
}

export let TodoStore = Object.assign({}, EventEmitter.prototype, {
	getCount: getCount,
        emitChange: function()  {
		console.log('emitChange')
		this.emit('CHANGE_EVENT')
	},
       
        addChangeListener: function(callback) {
		console.log('addchangelistener')
		this.on('CHANGE_EVENT', callback)
	},	
        removeChangeListener: function(callback)  {
		console.log('removechangelistener')
		this.removeListener('CHANGE_EVENT', callback)
	}	

})

dispatcher.register(action => {
	console.log(action);
	switch(action.actionType) {
		case constants.INCREMENT:
			incrementCount()
			TodoStore.emitChange()
			break;
	}
})
