import React from 'react';

// Internal dependencies
import ContentMixin from '../../utils/content-mixin';

require( './style.scss' );

export default React.createClass({
	displayName: 'Flickr',
	mixins: [ ContentMixin ],

	render: function() {
		let item = this.props.item;
		if ( ! item ) {
			return null;
		}
		let author = item.flickrAuthor;
		let content = item.showExcerpt ? item.excerpt : item.content;
		let size = ( this.props.layout === 'one-column' ) ? 'large_url' : 'small_url';

		let media = item.media.map( function( image, i ) {
			let img;
			if ( 'image' === image.type && image[size] ) {
				img = ( <img key={ i } src={ `${ image[size] }` } alt="" /> );
			}
			return img;
		} );

		return (
			<div className={ item.cssClasses }>
				<a className="tggr-author-profile clearfix" href={ author.profile }>
					{ author.image && <img src={ author.image } alt="" className="tggr-author-avatar" /> }
					<span className="tggr-author-username">@{ author.username }</span>
				</a>

				<div className="tggr-item-content">
					<div dangerouslySetInnerHTML={ this.getContent( content ) } />
					{ item.showExcerpt && <p><a href={ item.mediaPermalink }>See the rest of this description on Flickr</a></p> }

					{ media }
				</div>

				<a href={ item.mediaPermalink } className="tggr-timestamp">
					{ this.getTimeDiff( item.date_gmt ) }
				</a>

				<img className="tggr-source-logo" src={ tggrData.logos.flickr } alt="Flickr" />
			</div>
		);
	}
});
