import moment from 'moment-timezone';

export default {
	getTitle: function( data ) {
		return { __html: data };
	},

	getExcerpt: function( data ) {
		return { __html: data };
	},

	getContent: function( data ) {
		return { __html: data };
	},

	getTimeDiff: function( date ) {
		return moment.tz( date, 'UTC' ).fromNow();
	},
};