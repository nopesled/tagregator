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
			tggr.loadMoreID         = '#' + tggr.cssPrefix + 'media-load-more';
			tggr.page               = 1;

			$( tggr.mediaItemContainer ).removeClass('no-js');

			// Attach masonry callback to post-render events, only if we're multiple-columns.
			if ( ! $( tggr.mediaItemContainer ).hasClass('one-column') ) {
				$( tggr.mediaItemContainer ).on( 'tggr-rendered', tggr.afterRender );
				twttr.events.bind( 'loaded', tggr.afterRender );
			}

			// Render Tweets
			$( tggr.mediaItemContainer ).on( 'tggr-rendered', tggr.renderTwitter );

			$( 'body' ).on( 'click', tggr.loadMoreID, tggr.retrieveOldItems );

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
		 * Makes an AJAX call to the server to get the next page of items.
		 */
		retrieveOldItems : function( event ) {
			event.preventDefault();
			// Are we already processing an AJAX request?
			if ( $( 'body' ).hasClass('loading') ){
				return;
			}
			$( 'body' ).addClass('loading');

			$.post(
				tggrData.ajaxPostURL, {
					'action'  : tggr.prefix + 'render_load_more',
					'hashtag' : tggrData.hashtag,
					'page'    : tggr.page + 1
				},

				function( response ) {
					$( 'body' ).removeClass('loading');

					if ( '-1' != response && '0' != response ) {  // WordPress successfully processed request and found items
						tggr.refreshContent( $.parseJSON( response ), 'append' );
						tggr.page++;
					}
				}
			);
		},

		/**
		 * Updates the DOM with new items that were retrieved during the last check
		 */
		refreshContent : function( new_items_markup, method ) {
			method = method || 'prepend';
			var $newItems, count;

			if ( method === 'prepend' ) {
					$newItems = $( new_items_markup ).prependTo( tggr.mediaItemContainer );
			} else {
				$newItems = $( new_items_markup ).appendTo( tggr.mediaItemContainer );
			}

			$( '#' + tggr.cssPrefix + 'no-posts-available' ).hide();
			tggr.existingItemIDs = tggr.getExistingItemIDs();

			// Trigger our rendered event.
			if ( $newItems ) {
				$( tggr.mediaItemContainer ).trigger( 'tggr-rendered', { items: $newItems, method: method } );
			}
		},

		/**
		 * Render twitter embeds as they load in.
		 */
		renderTwitter: function(){
			if ( typeof twttr !== 'undefined' ) {
				twttr.widgets.load( $( tggr.mediaItemContainer ).get(0) );
			}
		},

		/**
		 * Reset Masonry after we render new items.
		 */
		afterRender: function( event, data ){
			if ( $( tggr.mediaItemContainer ).hasClass('one-column') ) {
				// Bail if 1-column.
				return;
			}
			if ( ! tggr.msnry ) {
				tggr.msnry = new Masonry( tggr.mediaItemContainer, {
					itemSelector: tggr.mediaItem
				});
			}

			if ( event.type !== 'tggr-rendered' ) {
				if ( tggr.msnry ) {
					tggr.msnry.layout();
				}
				return;
			}

			if ( 'new' == data.method ){
				// Nothing?
			} else if ( 'append' == data.method ) {
				tggr.msnry.appended( data.items.get() );
			} else {
				tggr.msnry.prepended( data.items.get() )
			}
		}
	}; // end tggr

	$( document ).ready( tggr.init );

	// Initial call in case there are no new things to trigger the callback event.
	$( window ).load( function(){
		$( tggr.mediaItemContainer ).trigger( 'tggr-rendered', { items: $(tggr.mediaItem), method: 'new' } );
	});

} // end tggr_wrapper()

tggrWrapper( jQuery );