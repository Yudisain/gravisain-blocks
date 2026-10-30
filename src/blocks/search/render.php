<?php
/**
 * Render Search Block
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound

$placeholder     = $attributes['placeholder'] ?? 'Search...';
$show_button     = $attributes['showButton'] ?? true;
$button_text     = $attributes['buttonText'] ?? 'Search';
$button_position = $attributes['buttonPosition'] ?? 'outside';
$input_bg        = $attributes['inputBackgroundColor'] ?? '#f1f5f9';
$input_color     = $attributes['inputTextColor'] ?? '#334155';
$btn_bg          = $attributes['buttonBackgroundColor'] ?? '#2563eb';
$btn_color       = $attributes['buttonTextColor'] ?? '#ffffff';
$radius          = $attributes['borderRadius'] ?? 4;

$clean_position = in_array( $button_position, array( 'inside', 'outside' ), true ) ? $button_position : 'outside';

$styles = sprintf(
	'--gravisain-search-input-bg: %s; --gravisain-search-input-color: %s; --gravisain-search-btn-bg: %s; --gravisain-search-btn-color: %s; --gravisain-search-radius: %dpx;',
	esc_attr( $input_bg ),
	esc_attr( $input_color ),
	esc_attr( $btn_bg ),
	esc_attr( $btn_color ),
	absint( $radius )
);

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'gravisain-search-wrapper pos-' . esc_attr( $clean_position ),
		'style' => $styles,
	)
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<form role="search" method="get" class="gravisain-search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
		<label class="screen-reader-text"><?php echo esc_html__( 'Search for:', 'gravisain-blocks' ); ?></label>
		<input type="search" class="gravisain-search-input" placeholder="<?php echo esc_attr( $placeholder ); ?>" value="<?php echo esc_attr( get_search_query() ); ?>" name="s" />
		<?php if ( $show_button ) : ?>
			<button type="submit" class="gravisain-search-submit">
				<?php if ( 'inside' === $clean_position ) : ?>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
				<?php else : ?>
					<?php echo esc_html( $button_text ); ?>
				<?php endif; ?>
			</button>
		<?php endif; ?>
	</form>
</div>
