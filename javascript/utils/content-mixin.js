export default {
	getTitle: function( data ) {
		return { __html: data.title };
	},

	getExcerpt: function( data ) {
		return { __html: data.excerpt };
	},

	getContent: function( data ) {
		return { __html: data.content };
	},
};