<?php
/**
 * Render callback for the Gravisain Advertisement / Ad Space block.
 *
 * Renders structured Google AdSense <ins class="adsbygoogle"> units or
 * accessible image banners safely without any raw/arbitrary scripts.
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound

$ad_type          = $attributes['adType'] ?? 'adsense';
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
$margin           = $attributes['margin'] ?? array();
$custom_class     = $attributes['customClassName'] ?? '';

// Structured Google AdSense attributes.
$raw_client    = sanitize_text_field( $attributes['adSenseClient'] ?? '' );
$raw_slot      = sanitize_text_field( $attributes['adSenseSlot'] ?? '' );
$ad_format     = in_array( $attributes['adSenseFormat'] ?? 'auto', array( 'auto', 'rectangle', 'horizontal', 'vertical', 'fluid' ), true ) ? $attributes['adSenseFormat'] : 'auto';
$ad_responsive = ! empty( $attributes['adSenseResponsive'] );

// Validate publisher client (ca-pub-1234567890123456) and numeric slot ID.
$ad_client = preg_match( '/^ca-pub-[0-9]{10,24}$/i', $raw_client ) ? $raw_client : '';
$ad_slot   = preg_match( '/^[0-9]{5,20}$/', $raw_slot ) ? $raw_slot : '';

// Nothing to output if the chosen ad type has no valid configuration.
$is_empty = ( 'banner' === $ad_type ) ? ( '' === $banner_url ) : ( '' === $ad_client || '' === $ad_slot );
if ( $is_empty ) {
	return;
}

$classes = array( 'gravisain-ad' );
if ( $alignment ) {
	$classes[] = 'align-' . sanitize_html_class( $alignment );
}
if ( $alignment_tablet ) {
	$classes[] = 'align-tablet-' . sanitize_html_class( $alignment_tablet );
}
if ( $alignment_mobile ) {
	$classes[] = 'align-mobile-' . sanitize_html_class( $alignment_mobile );
}
if ( $custom_class ) {
	$classes[] = sanitize_html_class( $custom_class );
}

$style_vars = array();
if ( $max_width > 0 ) {
	$style_vars[] = '--gravisain-ad-max-width:' . intval( $max_width ) . 'px';
}
if ( $min_height > 0 ) {
	$style_vars[] = '--gravisain-ad-min-height:' . intval( $min_height ) . 'px';
}
if ( $border_radius > 0 && 'banner' === $ad_type ) {
	$style_vars[] = '--gravisain-ad-radius:' . intval( $border_radius ) . 'px';
}
foreach ( array( 'top', 'right', 'bottom', 'left' ) as $side ) {
	if ( ! empty( $margin[ $side ] ) && preg_match( '/^[0-9]+(px|em|rem|%)?$/', (string) $margin[ $side ] ) ) {
		$style_vars[] = '--gravisain-ad-margin-' . $side . ':' . esc_attr( $margin[ $side ] );
	}
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => implode( ' ', $classes ),
		'style' => implode( ';', $style_vars ),
	)
);
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
			<div class="gravisain-ad-unit">
				<ins class="adsbygoogle"
					style="display:block"
					data-ad-client="<?php echo esc_attr( $ad_client ); ?>"
					data-ad-slot="<?php echo esc_attr( $ad_slot ); ?>"
					data-ad-format="<?php echo esc_attr( $ad_format ); ?>"
					data-full-width-responsive="<?php echo $ad_responsive ? 'true' : 'false'; ?>"></ins>
			</div>
		<?php endif; ?>
	</div>
</div>
