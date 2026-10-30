<?php
/**
 * Server-side rendering for the `gravisain/site-identity` block.
 *
 * @package Gravisain\Blocks
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound

$show_logo          = $attributes['showLogo'] ?? true;
$logo_width         = isset( $attributes['logoWidth'] ) ? (int) $attributes['logoWidth'] : 140;
$logo_width_tablet  = isset( $attributes['logoWidthTablet'] ) ? (int) $attributes['logoWidthTablet'] : null;
$logo_width_mobile  = isset( $attributes['logoWidthMobile'] ) ? (int) $attributes['logoWidthMobile'] : null;
$logo_shape         = $attributes['logoShape'] ?? 'circle';
$logo_border_radius = isset( $attributes['logoBorderRadius'] ) ? (int) $attributes['logoBorderRadius'] : 50;
$show_title         = $attributes['showTitle'] ?? true;
$show_tagline       = $attributes['showTagline'] ?? false;
$layout             = $attributes['layout'] ?? 'logo-left';
$vertical_alignment = $attributes['verticalAlignment'] ?? 'center';
$item_gap           = isset( $attributes['itemGap'] ) ? (int) $attributes['itemGap'] : 16;
$link_to_home       = $attributes['linkToHome'] ?? true;
$link_url           = ! empty( $attributes['linkUrl'] ) ? esc_url( $attributes['linkUrl'] ) : esc_url( home_url( '/' ) );
$title_tag          = ! empty( $attributes['titleTag'] ) ? sanitize_key( $attributes['titleTag'] ) : 'span';
$allowed_tags       = array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div' );
if ( ! in_array( $title_tag, $allowed_tags, true ) ) {
	$title_tag = 'span';
}

$title_color        = $attributes['titleColor'] ?? '';
$title_hover_color  = $attributes['titleHoverColor'] ?? '';
$title_typography   = $attributes['titleTypography'] ?? array();
$tagline_color      = $attributes['taglineColor'] ?? '#64748b';
$tagline_typography = $attributes['taglineTypography'] ?? array();
$padding            = $attributes['padding'] ?? array();
$margin             = $attributes['margin'] ?? array();

// Dynamic values from WordPress settings or block attributes
$custom_title     = isset( $attributes['customTitle'] ) && '' !== trim( (string) $attributes['customTitle'] ) ? $attributes['customTitle'] : '';
$custom_tagline   = isset( $attributes['customTagline'] ) && '' !== trim( (string) $attributes['customTagline'] ) ? $attributes['customTagline'] : '';
$site_name        = ! empty( $custom_title ) ? $custom_title : get_bloginfo( 'name', 'display' );
$site_description = ! empty( $custom_tagline ) ? $custom_tagline : get_bloginfo( 'description', 'display' );
$custom_logo_url  = ! empty( $attributes['customLogoUrl'] ) ? esc_url( $attributes['customLogoUrl'] ) : '';
$custom_logo_id   = ! empty( $attributes['customLogoId'] ) ? (int) $attributes['customLogoId'] : (int) get_theme_mod( 'custom_logo' );

// Build inline CSS styles
$styles   = array();
$styles[] = '--gravisain-si-gap:' . $item_gap . 'px';
$styles[] = '--gravisain-si-logo-width:' . $logo_width . 'px';
$styles[] = '--gravisain-si-logo-radius:' . $logo_border_radius . 'px';
if ( $logo_width_tablet ) {
	$styles[] = '--gravisain-si-logo-width-tablet:' . $logo_width_tablet . 'px';
}
if ( $logo_width_mobile ) {
	$styles[] = '--gravisain-si-logo-width-mobile:' . $logo_width_mobile . 'px';
}
if ( ! empty( $title_color ) ) {
	$styles[] = '--gravisain-si-title-color:' . esc_attr( $title_color );
}
if ( ! empty( $title_hover_color ) ) {
	$styles[] = '--gravisain-si-title-hover:' . esc_attr( $title_hover_color );
}
if ( ! empty( $tagline_color ) ) {
	$styles[] = '--gravisain-si-tagline-color:' . esc_attr( $tagline_color );
}

// Spacing styles
foreach ( array( 'top', 'right', 'bottom', 'left' ) as $side ) {
	if ( ! empty( $padding[ $side ] ) ) {
		$styles[] = 'padding-' . $side . ':' . esc_attr( $padding[ $side ] );
	}
	if ( ! empty( $margin[ $side ] ) ) {
		$styles[] = 'margin-' . $side . ':' . esc_attr( $margin[ $side ] );
	}
}

// Title typography styles
$title_styles = array();
if ( ! empty( $title_typography['fontFamily'] ) ) {
	$title_styles[] = 'font-family:' . esc_attr( $title_typography['fontFamily'] );
}
if ( ! empty( $title_typography['fontSize'] ) ) {
	$title_styles[] = 'font-size:' . (int) $title_typography['fontSize'] . 'px';
}
if ( ! empty( $title_typography['fontWeight'] ) ) {
	$title_styles[] = 'font-weight:' . esc_attr( (string) $title_typography['fontWeight'] );
}
if ( ! empty( $title_typography['lineHeight'] ) ) {
	$title_styles[] = 'line-height:' . esc_attr( (string) $title_typography['lineHeight'] );
}
if ( isset( $title_typography['letterSpacing'] ) && '' !== (string) $title_typography['letterSpacing'] ) {
	$title_styles[] = 'letter-spacing:' . esc_attr( (string) $title_typography['letterSpacing'] ) . 'px';
}

// Tagline typography styles
$tagline_styles = array();
if ( ! empty( $tagline_typography['fontFamily'] ) ) {
	$tagline_styles[] = 'font-family:' . esc_attr( $tagline_typography['fontFamily'] );
}
if ( ! empty( $tagline_typography['fontSize'] ) ) {
	$tagline_styles[] = 'font-size:' . (int) $tagline_typography['fontSize'] . 'px';
}
if ( ! empty( $tagline_typography['fontWeight'] ) ) {
	$tagline_styles[] = 'font-weight:' . esc_attr( (string) $tagline_typography['fontWeight'] );
}
if ( ! empty( $tagline_typography['lineHeight'] ) ) {
	$tagline_styles[] = 'line-height:' . esc_attr( (string) $tagline_typography['lineHeight'] );
}

$wrapper_classes = array(
	'gravisain-site-identity-wrapper',
	'layout-' . sanitize_html_class( $layout ),
	'align-' . sanitize_html_class( $vertical_alignment ),
);

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => implode( ' ', $wrapper_classes ),
		'style' => implode( ';', $styles ),
	)
);

$target_url = $link_to_home ? esc_url( home_url( '/' ) ) : $link_url;
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( $target_url ) : ?>
		<a href="<?php echo esc_url( $target_url ); ?>" class="gravisain-site-identity-link" rel="home">
	<?php endif; ?>

		<div class="gravisain-site-identity-inner">
			<?php if ( $show_logo && ( $custom_logo_url || $custom_logo_id ) ) : ?>
				<div class="gravisain-site-logo-wrap is-shape-<?php echo esc_attr( $logo_shape ); ?>">
					<?php
					if ( $custom_logo_url ) {
						echo '<img src="' . esc_url( $custom_logo_url ) . '" class="gravisain-site-logo-img" alt="' . esc_attr( $site_name ) . '" />';
					} elseif ( $custom_logo_id ) {
						echo wp_get_attachment_image(
							(int) $custom_logo_id,
							'full',
							false,
							array(
								'class' => 'gravisain-site-logo-img',
								'alt'   => esc_attr( $site_name ),
							)
						);
					}
					?>
				</div>
			<?php endif; ?>

			<?php if ( $show_title || $show_tagline ) : ?>
				<div class="gravisain-site-text-wrap">
					<?php if ( $show_title && ! empty( $site_name ) ) : ?>
						<<?php echo tag_escape( $title_tag ); ?> 
							class="gravisain-site-title" 
							<?php echo ! empty( $title_styles ) ? 'style="' . esc_attr( implode( ';', $title_styles ) ) . '"' : ''; ?>
						>
							<?php echo esc_html( $site_name ); ?>
						</<?php echo tag_escape( $title_tag ); ?>>
					<?php endif; ?>

					<?php if ( $show_tagline && ! empty( $site_description ) ) : ?>
						<p 
							class="gravisain-site-tagline" 
							<?php echo ! empty( $tagline_styles ) ? 'style="' . esc_attr( implode( ';', $tagline_styles ) ) . '"' : ''; ?>
						>
							<?php echo esc_html( $site_description ); ?>
						</p>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>

	<?php if ( $target_url ) : ?>
		</a>
	<?php endif; ?>
</div>
