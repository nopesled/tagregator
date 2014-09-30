<?php $post = get_post(); ?>

<div id="<?php echo esc_attr( Tagregator::CSS_PREFIX . get_the_ID() ); ?>" <?php self::item_class( Tagregator::CSS_PREFIX.'msnry-2' ); ?>>
	<blockquote class="twitter-tweet" lang="en">
		<?php the_content(); ?>

		&mdash; <?php echo esc_html( $author_name ); ?>

		(<a href="http://twitter.com/<?php echo esc_attr( $author_username ); ?>" class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>author-profile">@<?php echo esc_html( $author_username ); ?></a>)

		<a href="https://twitter.com/<?php echo esc_attr( $author_username ); ?>/status/<?php echo esc_attr( $tweet_id ); ?>">
			<?php echo human_time_diff( get_the_time( 'U' ), current_time( 'timestamp' ) ) . ' ago'; ?>
		</a>
	</blockquote>
</div>
