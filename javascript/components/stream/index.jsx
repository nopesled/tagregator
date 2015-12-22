import React from 'react';

// Internal
import API from '../../utils/api';
import MediaStore from '../../stores/media-store';

// Components
import Tweet from '../tweet';
import Instagram from '../instagram';
import Flickr from '../flickr';

require( './style.scss' );

/**
 * Method to retrieve state from Stores
 */
function getState() {
	return {
		data: MediaStore.getItems(),
	};
}

var _interval;

export default React.createClass({
	displayName: 'Stream',

	getInitialState: function() {
		return getState();
	},

	componentDidMount: function() {
		MediaStore.addChangeListener( this._onChange );
		API.getItems();
		_interval = setInterval( API.getItems, 30000 );
	},

	componentDidUpdate: function( prevProps, prevState ) {
		if ( prevProps !== this.props ) {
			API.getItems();
		}
	},

	componentWillUnmount: function() {
		MediaStore.removeChangeListener( this._onChange );
		clearInterval( _interval );
	},

	_onChange: function() {
		this.setState( getState() );
	},

	render: function() {
		let items = this.state.data.map( function( item, i ) {
			let rendered;

			switch ( item.type ) {
				case 'tggr-tweets':
					rendered = ( <Tweet key={ i } item={ item } /> );
					break;
				case 'tggr-instagram':
					rendered = ( <Instagram key={ i } item={ item } /> );
					break;
				case 'tggr-flickr':
					rendered = ( <Flickr key={ i } item={ item } /> );
					break;
				default:
					rendered = ( <div key={ i }>No handler for this media type: { item.type }</div> );
					break;
			}

			return rendered;
		} );

		return (
			<div className="tggr-stream">
				{ items }
			</div>
		);
	}
});
