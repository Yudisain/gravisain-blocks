<?php
/**
 * Render Search Block
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound

$placeholder = $attributes['placeholder'] ?? 'Search...';
$show_button = $attributes['showButton'] ?? true;
$button_text = $attributes['buttonText'] ?? 'Search';
$button_position = $attributes['buttonPosition'] ?? 'outside';
$input_bg = $attributes['inputBackgroundColor'] ?? '#f1f5f9';
$input_color = $attributes['inputTextColor'] ?? '#334155';
$btn_bg = $attributes['buttonBackgroundColor'] ?? '#2563eb';
$btn_color = $attributes['buttonTextColor'] ?? '#ffffff';
$radius = $attributes['borderRadius'] ?? 4;

$wrapper_classes = wp_generate_block_wrapper_classes( $attributes, "gravisain-search-wrapper pos-{$button_position}" );

$styles = sprintf(
	'--gravisain-search-input-bg: %s; --gravisain-search-input-color: %s; --gravisain-search-btn-bg: %s; --gravisain-search-btn-color: %s; --gravisain-search-radius: %spx;',
	esc_attr( $input_bg ),
	esc_attr( $input_color ),
	esc_attr( $btn_bg ),
	esc_attr( $btn_color ),
	esc_attr( (string) $radius )
);

$icon_svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>';
?>
<div <?php echo $wrapper_classes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> style="<?php echo esc_attr( $styles ); ?>">
	<form role="search" method="get" class="gravisain-search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
		<label class="screen-reader-text"><?php echo esc_html__( 'Search for:', 'gravisain-blocks' ); ?></label>
		<input type="search" class="gravisain-search-input" placeholder="<?php echo esc_attr( $placeholder ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
		<?php if ( $show_button ) : ?>
			<button type="submit" class="gravisain-search-submit">
				<?php echo ( 'inside' === $button_position ) ? $icon_svg : esc_html( $button_text ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</button>
		<?php endif; ?>
	</form>
</div>
