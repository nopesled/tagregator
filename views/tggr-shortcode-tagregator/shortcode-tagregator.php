<div id="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>media-item-container" class="<?php echo esc_attr( $attributes['layout'] ); ?>" data-hashtag="<?php echo esc_attr( $attributes['hashtag'] ); ?>">
	<img src="<?php echo esc_url( admin_url( 'images/spinner.gif' ) ); ?>" alt="Spinner" />
	Loading new posts...
</div> <!-- end media-item-container -->

<?php
$media_cpts = array();
foreach ( Tagregator::get_instance()->media_sources as $source ) {
	$media_cpts[] = esc_js( $source::POST_TYPE_SLUG );
};
$logos = array(
	'twitter' => plugins_url( 'images/source-logos/twitter.png', dirname( __DIR__ ) ),
	'instagram' => plugins_url( 'images/source-logos/instagram.png', dirname( __DIR__ ) ),
	'flickr' => plugins_url( 'images/source-logos/flickr.png', dirname( __DIR__ ) ),
	'google' => plugins_url( 'images/source-logos/google.png', dirname( __DIR__ ) ),
);
?>

<script type="text/javascript">
	var tggrData = {
		ApiUrl:          '<?php echo get_json_url(); ?>',
		mediaTypes:      <?php echo wp_json_encode( $media_cpts ); ?>,
		logos:           <?php echo wp_json_encode( $logos ); ?>,
		hashtag:         '<?php echo esc_js( $attributes['hashtag'] ); ?>',
		refreshInterval: <?php echo esc_js( $this->refresh_interval ); ?>
	};
</script>
