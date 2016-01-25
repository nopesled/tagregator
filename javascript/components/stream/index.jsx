import React from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';

// Internal
import API from '../../utils/api';
import MediaStore from '../../stores/media-store';

// Components
import Tweet from '../tweet';
import Instagram from '../instagram';
import Flickr from '../flickr';
import Google from '../google';

require( './style.scss' );

var _interval;

export default React.createClass({
	displayName: 'Stream',

	getInitialState: function() {
		return {
			fetching: false,
			data: MediaStore.getItems(),
		}
	},

	getItems: function() {
		const intervalSeconds = tggrData.refreshInterval || 10;
		if ( ! this.state.fetching ) {
			this.setState( { fetching: true } );
			API.getItems();
			if ( 'undefined' === typeof _interval ) {
				_interval = setInterval( this.getItems, intervalSeconds * 1000 );
			}
		}
	},

	componentDidMount: function() {
		MediaStore.addChangeListener( this._onChange );
		this.getItems();
	},

	componentDidUpdate: function( prevProps, prevState ) {
		if ( ! isEqual( prevProps, this.props ) ) {
			clearInterval( _interval );
			this.getItems();
		}
	},

	componentWillUnmount: function() {
		MediaStore.removeChangeListener( this._onChange );
		clearInterval( _interval );
	},

	_onChange: function() {
		this.setState( {
			fetching: false,
			data: MediaStore.getItems(),
		} );
	},

	render: function() {
		let loadingClasses;
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
				case 'tggr-google':
					rendered = ( <Google key={ i } item={ item } /> );
					break;
				default:
					rendered = ( <div key={ i }>No handler for this media type: { item.type }</div> );
					break;
			}

			return rendered;
		} );

		loadingClasses = classNames( {
			'tggr-loading': true,
			'is-loading': this.state.fetching,
		} );

		return (
			<div className="tggr-stream">
				<div className={ loadingClasses }><span className='screen-reader-text'>Loading More</span></div>
				<div className="tggr-media-items">
					{ items }
				</div>
			</div>
		);
	}
});
