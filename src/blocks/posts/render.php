<?php
/**
 * Render callback for the Gravisain Posts block.
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound

$posts_post_type = $attributes['postType'] ?? 'post';
$posts_to_show   = $attributes['postsToShow'] ?? 3;
$posts_order     = $attributes['order'] ?? 'DESC';
$order_by        = $attributes['orderBy'] ?? 'date';
$columns         = $attributes['columns'] ?? array(
	'desktop' => 3,
	'tablet'  => 2,
	'mobile'  => 1,
);
$gap             = $attributes['gap'] ?? array(
	'desktop' => 20,
	'tablet'  => 15,
	'mobile'  => 10,
);

$show_image    = $attributes['showImage'] ?? true;
$show_title    = $attributes['showTitle'] ?? true;
$show_excerpt  = $attributes['showExcerpt'] ?? true;
$show_meta     = $attributes['showMeta'] ?? true;
$show_category = $attributes['showCategory'] ?? true;

$query_args = array(
	'post_type'           => $posts_post_type,
	'posts_per_page'      => $posts_to_show,
	'order'               => $posts_order,
	'orderby'             => $order_by,
	'ignore_sticky_posts' => true,
	'post_status'         => 'publish',
);

$posts_query = new WP_Query( $query_args );

if ( ! $posts_query->have_posts() ) {
	echo '<div class="gravisain-posts-empty">' . esc_html__( 'No posts found.', 'gravisain-blocks' ) . '</div>';
	return;
}

$wrapper_classes = 'gravisain-posts-grid';
$wrapper_style   = sprintf(
	'--posts-cols-desktop: %1$s; --posts-cols-tablet: %2$s; --posts-cols-mobile: %3$s; --posts-gap-desktop: %4$spx; --posts-gap-tablet: %5$spx; --posts-gap-mobile: %6$spx;',
	esc_attr( $columns['desktop'] ),
	esc_attr( $columns['tablet'] ),
	esc_attr( $columns['mobile'] ),
	esc_attr( $gap['desktop'] ),
	esc_attr( $gap['tablet'] ),
	esc_attr( $gap['mobile'] )
);

$block_attributes = get_block_wrapper_attributes(
	array(
		'class' => $wrapper_classes,
		'style' => $wrapper_style,
	)
);

?>
<div <?php echo $block_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="gravisain-posts-wrapper">
		<?php
		while ( $posts_query->have_posts() ) :
			$posts_query->the_post();
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class( 'gravisain-post-card' ); ?>>
				
				<?php if ( $show_image && has_post_thumbnail() ) : ?>
					<div class="gravisain-post-thumbnail">
						<a href="<?php echo esc_url( get_permalink() ); ?>">
							<?php the_post_thumbnail( 'medium_large' ); ?>
						</a>
					</div>
				<?php endif; ?>

				<div class="gravisain-post-content">
					<?php if ( $show_category && 'post' === get_post_type() ) : ?>
						<div class="gravisain-post-categories">
							<?php
							$categories = get_the_category();
							if ( ! empty( $categories ) ) {
								foreach ( $categories as $category ) {
									echo '<a href="' . esc_url( get_category_link( $category->term_id ) ) . '" class="gravisain-post-cat-link">' . esc_html( $category->name ) . '</a> ';
								}
							}
							?>
						</div>
					<?php endif; ?>

					<?php if ( $show_title ) : ?>
						<h3 class="gravisain-post-title">
							<a href="<?php echo esc_url( get_permalink() ); ?>">
								<?php the_title(); ?>
							</a>
						</h3>
					<?php endif; ?>

					<?php if ( $show_meta ) : ?>
						<div class="gravisain-post-meta">
							<span class="gravisain-post-date">
								<?php echo esc_html( get_the_date() ); ?>
							</span>
							<span class="gravisain-post-author">
								<?php esc_html_e( 'by', 'gravisain-blocks' ); ?> <?php the_author_posts_link(); ?>
							</span>
						</div>
					<?php endif; ?>

					<?php if ( $show_excerpt ) : ?>
						<div class="gravisain-post-excerpt">
							<?php the_excerpt(); ?>
						</div>
					<?php endif; ?>
				</div>
			</article>
			<?php
		endwhile;
		wp_reset_postdata();
		?>
	</div>
</div>
