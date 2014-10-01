<div id="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>media-item-container" class="no-js <?php echo esc_attr( $attributes['layout'] ); ?>">
	<?php if ( $items ) : ?>
		<?php $this->render_media_items( $items ); ?>
	<?php endif; ?>
</div> <!-- end media-item-container -->

<h3 id="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>media-load-more"><a href="#">Load More</a></h3>

<?php if ( ! $items ) : ?>

	<p id="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>no-posts-available">
		No posts are available for <em><?php echo esc_html( $attributes['hashtag'] ); ?></em> yet. Please check back later.
	</p>

<?php endif; ?>

<script type="text/javascript">
	var tggrData = {
		ajaxPostURL:     '<?php echo admin_url( 'admin-ajax.php' ); ?>',
		hashtag:         '<?php echo esc_js( $attributes['hashtag'] ); ?>',
		refreshInterval: <?php echo esc_js( $this->refresh_interval ); ?>
	};
</script>