<?php
/**
 * Render callback for the Gravisain Advertisement / Ad Space block.
 *
 * This is a server-side rendered (dynamic) block so that raw ad network code
 * (e.g. Google AdSense <script> and <ins> tags) is preserved and not stripped
 * by WordPress content sanitization.
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound

$ad_type          = $attributes['adType'] ?? 'code';
$ad_code          = $attributes['adCode'] ?? '';
$banner_url       = $attributes['bannerUrl'] ?? '';
$banner_alt       = $attributes['bannerAlt'] ?? '';
$banner_link      = $attributes['bannerLink'] ?? '';
$banner_target    = $attributes['bannerLinkTarget'] ?? '_self';
$show_label       = $attributes['showLabel'] ?? true;
$ad_label         = $attributes['adLabel'] ?? 'Advertisement';
$alignment        = $attributes['alignment'] ?? 'center';
$alignment_tablet = $attributes['alignmentTablet'] ?? '';
$alignment_mobile = $attributes['alignmentMobile'] ?? '';
$max_width        = $attributes['maxWidth'] ?? 0;
$min_height       = $attributes['minHeight'] ?? 90;
$border_radius    = $attributes['borderRadius'] ?? 0;
$margin           = $attributes['margin'] ?? [];
$custom_class     = $attributes['customClassName'] ?? '';
$custom_css       = $attributes['customCSS'] ?? '';

// Nothing to output if the chosen ad type has no content.
$is_empty = ( 'banner' === $ad_type ) ? ( '' === $banner_url ) : ( '' === $ad_code );
if ( $is_empty ) {
	return;
}

$classes = [ 'gravisain-ad' ];
if ( $alignment ) {
	$classes[] = 'align-' . $alignment;
}
if ( $alignment_tablet ) {
	$classes[] = 'align-tablet-' . $alignment_tablet;
}
if ( $alignment_mobile ) {
	$classes[] = 'align-mobile-' . $alignment_mobile;
}
if ( $custom_class ) {
	$classes[] = $custom_class;
}

$style_vars = [];
if ( $max_width > 0 ) {
	$style_vars[] = '--gravisain-ad-max-width:' . intval( $max_width ) . 'px';
}
if ( $min_height > 0 ) {
	$style_vars[] = '--gravisain-ad-min-height:' . intval( $min_height ) . 'px';
}
if ( $border_radius > 0 ) {
	$style_vars[] = '--gravisain-ad-radius:' . intval( $border_radius ) . 'px';
}
foreach ( [ 'top', 'right', 'bottom', 'left' ] as $side ) {
	if ( ! empty( $margin[ $side ] ) ) {
		$style_vars[] = '--gravisain-ad-margin-' . $side . ':' . esc_attr( $margin[ $side ] );
	}
}
if ( $custom_css ) {
	$style_vars[] = $custom_css;
}

// The anchor id (if set) and the wp-block-* / align classes are added
// automatically by get_block_wrapper_attributes().
$wrapper_attributes = get_block_wrapper_attributes( [
	'class' => implode( ' ', $classes ),
	'style' => implode( ';', $style_vars ),
] );
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( $show_label && $ad_label ) : ?>
		<div class="gravisain-ad-label"><?php echo esc_html( $ad_label ); ?></div>
	<?php endif; ?>

	<div class="gravisain-ad-container<?php echo 'banner' === $ad_type ? ' gravisain-ad-container--banner' : ''; ?>">
		<?php if ( 'banner' === $ad_type ) : ?>
			<?php
			$banner_img = '<img src="' . esc_url( $banner_url ) . '" alt="' . esc_attr( $banner_alt ) . '" class="gravisain-ad-banner-image" loading="lazy" decoding="async" />';

			if ( $banner_link ) {
				$rel = ( '_blank' === $banner_target ) ? 'noopener noreferrer' : '';
				printf(
					'<a class="gravisain-ad-banner-link" href="%1$s" target="%2$s" rel="%3$s">%4$s</a>',
					esc_url( $banner_link ),
					esc_attr( $banner_target ),
					esc_attr( $rel ),
					$banner_img // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped above.
				);
			} else {
				echo $banner_img; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped above.
			}
			?>
		<?php else : ?>
			<div class="gravisain-ad-code">
				<?php
				// Raw ad code is intentionally output unescaped so that ad network
				// <script> and <ins> tags render correctly. Only capability-gated
				// editors can set this content.
				echo $ad_code; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				?>
			</div>
		<?php endif; ?>
	</div>
</div>
