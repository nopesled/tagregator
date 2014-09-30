<?php $post = get_post(); ?>

<div id="<?php echo esc_attr( Tagregator::CSS_PREFIX . get_the_ID() ); ?>" <?php self::item_class( Tagregator::CSS_PREFIX.'msnry-2' ); ?>>

	<a href="http://instagram.com/<?php echo esc_attr( $author_username ); ?>" class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>author-profile">
		<?php if ( $author_image_url ) : ?>
			<img src="<?php echo esc_attr( $author_image_url ); ?>" alt="<?php echo esc_attr( $author_name ); ?>" class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>author-avatar">
		<?php endif; ?>
		<span class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>author-name"><?php echo esc_html( $author_name ); ?></span>
		<span class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>author-username">@<?php echo esc_html( $author_username ); ?></span>
	</a>

	<div class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>item-content">
		<?php if ( $media_permalink ) : ?>
			<img src="<?php echo esc_url( $media_permalink . 'media?size=l' ); ?>" alt="" />
		<?php endif; ?>

		<?php the_content(); ?>
	</div>

	<img class="tggr-source-logo" src="<?php echo esc_attr( $logo_url ); ?>" alt="Instagram" />

	<a href="<?php echo esc_attr( $media_permalink ); ?>" class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>timestamp">
		<?php echo human_time_diff( get_the_time( 'U' ), current_time( 'timestamp' ) ) . ' ago'; ?>
	</a>
</div>