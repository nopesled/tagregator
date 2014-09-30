/**
 * @package Tagregator
 */


/**
 * Wrapper function to safely use $
 */
function tggrWrapper( $ ) {
	var tggr = {

		msnry: false,

		/**
		 * Initialization
		 */
		init : function() {
			if ( typeof tggrData === 'undefined' ) {
				return;
			}

			tggr.prefix             = 'tggr_';
			tggr.cssPrefix          = 'tggr-';
			tggr.mediaItemContainer = '#' + tggr.cssPrefix + 'media-item-container';
			tggr.mediaItem          = '.' + tggr.cssPrefix + 'media-item';
			tggr.existingItemIDs    = tggr.getExistingItemIDs();

			$( tggr.mediaItemContainer ).removeClass('no-js');

			// Attach callback to post-render events.
			$( tggr.mediaItemContainer ).on( 'tggr-rendered', tggr.afterRender );
			twttr.events.bind( 'loaded', tggr.afterRender );

			tggr.retrieveNewItems();
			setInterval( tggr.retrieveNewItems, tggrData.refreshInterval * 1000 );	// convert to milliseconds
		},

		/**
		 * Builds an array of which item IDs are already present in the DOM
		 *
		 * @return array
		 */
		getExistingItemIDs : function() {
			var itemIDs = [];

			$( tggr.mediaItemContainer ).children( tggr.mediaItem ).each( function() {
				itemIDs.push( parseInt( $( this ).attr( 'id' ).replace( tggr.cssPrefix, '' ) ) );
			} );

			return itemIDs;
		},

		/**
		 * Makes an AJAX call to the server to get any new items that have been imported since the last check
		 */
		retrieveNewItems : function() {
			$.post(
				tggrData.ajaxPostURL, {
					'action'          : tggr.prefix + 'render_latest_media_items',
					'hashtag'         : tggrData.hashtag,
					'existingItemIDs' :	tggr.existingItemIDs
				},

				function( response ) {
					if ( '-1' != response && '0' != response ) {  // WordPress successfully processed request and found new items
						tggr.refreshContent( $.parseJSON( response ) );
					}
				}
			);
		},

		/**
		 * Updates the DOM with new items that were retrieved during the last check
		 */
		refreshContent : function( new_items_markup ) {
			$( tggr.mediaItemContainer ).prepend( new_items_markup );
			$( '#' + tggr.cssPrefix + 'no-posts-available' ).hide();
			tggr.existingItemIDs = tggr.getExistingItemIDs();

			if ( typeof twttr !== 'undefined' ) {
				twttr.widgets.load( $( tggr.mediaItemContainer ).get(0) );
			}

			// Trigger our rendered event.
			$( tggr.mediaItemContainer ).trigger( 'tggr-rendered' );
		},

		/**
		 * Reset Masonry after we render new items.
		 */
		afterRender: function(){
			if ( tggr.msnry ) {
				tggr.msnry.destroy();
			}
			tggr.msnry = new Masonry( tggr.mediaItemContainer, {
				itemSelector: tggr.mediaItem
			});
		}
	}; // end tggr

	$( document ).ready( tggr.init );

	// Initial call to afterRender, in case there are no new things to trigger the callback event.
	$( window ).load( tggr.afterRender );

} // end tggr_wrapper()

tggrWrapper( jQuery );