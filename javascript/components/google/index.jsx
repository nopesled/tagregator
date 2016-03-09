import React from 'react';

// Internal dependencies
import ContentMixin from '../../utils/content-mixin';

// require( './style.scss' );

export default React.createClass({
	displayName: 'Google',
	mixins: [ ContentMixin ],

	render: function() {
		let url = 'https://plus.google.com/';
		let item = this.props.item;
		if ( ! item ) {
			return null;
		}
		let author = item.googleAuthor;
		let content = item.showExcerpt ? item.excerpt : item.content;

		let media = item.media.map( function( image, i ) {
			let img;
			if ( 'image' === image.type ) {
				img = ( <img key={ i } src={ `${ image.small_url }` } alt="" /> );
			} else {
				console.log( "Non-image media", image );
			}
			return img;
		} );

		return (
			<div className={ item.cssClasses }>
				<a className="tggr-author-profile clearfix" href={ url + author.username }>
					{ author.image && <img src={ author.image } alt="" className="tggr-author-avatar" /> }
					<span className="tggr-author-name">{ author.name }</span>
					<span className="tggr-author-username">@{ author.username }</span>
				</a>

				<div className="tggr-item-content">
					<div dangerouslySetInnerHTML={ this.getContent( content ) } />
					{ item.showExcerpt && <p><a href={ item.mediaPermalink }>Read the rest of this post on Google+</a></p> }

					{ media }
				</div>

				<a href={ item.mediaPermalink } className="tggr-timestamp">
					{ this.getTimeDiff( item.date_gmt ) }
				</a>

				<img className="tggr-source-logo" src={ tggrData.logos.google } alt="Google" />
			</div>
		);
	}
});