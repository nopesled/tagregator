import React from 'react';

// Internal dependencies
import ContentMixin from '../../utils/content-mixin';

require( './style.scss' );

export default React.createClass({
	displayName: 'Instagram',
	mixins: [ ContentMixin ],

	render: function() {
		return (
			<div className="tggr-media-item">
				<div dangerouslySetInnerHTML={ this.getContent( this.props.item ) } />
				<p>Instagram</p>
			</div>
		);
	}
});
