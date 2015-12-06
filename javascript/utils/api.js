/* global jQuery */
import first from 'lodash/array/first';

/**
 * Internal dependencies
 */
import MediaActions from '../actions/media-actions';

var _get = function( url, data ) {
	return jQuery.ajax( {
		url: url,
		data: data,
		dataType: 'json'
	} );
};

export default {
	// Get a list of tweets according to args criteria
	// args: might have pagination, or a filter (category/tag/etc)
	getItems: function( args ) {
		let url = `${tggrData.ApiUrl}/posts/`;
		console.log( url );
		args = args || {};

		args.type = 'tggr-tweets'; // Can we pass all types through?

		args.filter = args.filter || {};
		args.filter.posts_per_page = 100;
		args.filter.hashtag = 'wcus';

		jQuery.when(
			_get( url, args )
		).done( function( data, status, request ) {
			MediaActions.fetch( data );
		} );
	},
};
