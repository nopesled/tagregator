import React from 'react';

// Internal dependencies
import ContentMixin from '../../utils/content-mixin';

require( './style.scss' );

export default React.createClass({
	displayName: 'Tweet',
	mixins: [ ContentMixin ],

	render: function() {
		let url = 'https://twitter.com/';
		let item = this.props.item;
		if ( ! item ) {
			return null;
		}
		let author = item.tweetAuthor;
		let content = item.showExcerpt ? item.excerpt : item.content;

		let media = item.media.map( function( image, i ) {
			let img;
			if ( 'image' === image.type ) {
				img = ( <img key={ i } src={ `${ image.url }:small` } alt="" /> );
			}
			return img;
		} );

		return (
			<div className="tggr-media-item">
				<a className="tggr-author-profile clearfix" href={ url + author.username }>
					{ author.image && <img src={ author.image } alt="" className="tggr-author-avatar" /> }
					<span className="tggr-author-name">{ author.name }</span>
					<span className="tggr-author-username">@{ author.username }</span>
				</a>

				<div className="tggr-item-content">
					<div dangerouslySetInnerHTML={ this.getContent( content ) } />
					{ item.showExcerpt && <p><a href={ item.mediaPermalink }>Read the rest of this tweet on Twitter</a></p> }

					{ media }
				</div>

				<ul className="tggr-actions">
					<li><a href={ `${ url }intent/tweet?in_reply_to=${ item.tweetId }` }><i className="icon-reply"></i> <span>Reply</span></a></li>
					<li><a href={ `${ url }intent/retweet?tweet_id=${ item.tweetId }` }><i className="icon-retweet"></i> <span>Retweet</span></a></li>
					<li><a href={ `${ url }intent/favorite?tweet_id=${ item.tweetId }` }><i className="icon-star"></i> <span>Favorite</span></a></li>
				</ul>

				<a href={ item.mediaPermalink } className="tggr-timestamp">
					{ 'time placeholder' }
				</a>

				<img className="tggr-source-logo" src={ tggrData.logos.twitter } alt="Twitter" />
			</div>
		);
	}
});
