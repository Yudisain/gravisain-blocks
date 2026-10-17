<?php
/**
 * Hero Block – Server-Side Renderer
 *
 * Renders the full hero section using PHP so that CSS custom properties
 * (--gravisain-hero-*) survive without being stripped by wp_kses.
 *
 * @package Gravisain\Blocks
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML (unused – hero is a leaf block).
 * @var WP_Block $block      Block object.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Sanitize an arbitrary CSS property value to prevent CSS declaration injection.
 */
$sanitize_css_value = function( $val ): ?string {
	if ( $val === null || $val === '' || $val === false ) {
		return null;
	}
	$val = trim( (string) $val );
	$val = preg_replace( '/[;{}<>"\'\\\\]/', '', $val );
	return trim( $val ) !== '' ? trim( $val ) : null;
};

$spacing = function( $val, string $side ) use ( $sanitize_css_value ): ?string {
	if ( $val === null || $val === '' ) return null;
	if ( is_numeric( $val ) ) return $val . 'px';
	if ( is_string( $val ) ) return $sanitize_css_value( $val );
	if ( is_array( $val ) ) {
		$v = $val[ $side ] ?? null;
		if ( $v === null || $v === '' ) return null;
		$res = is_numeric( $v ) ? $v . 'px' : (string) $v;
		return $sanitize_css_value( $res );
	}
	return null;
};

$typo_var = function( $val, bool $px = false ) use ( $sanitize_css_value ): ?string {
	if ( $val === null || $val === '' || $val === false ) return null;
	if ( is_numeric( $val ) ) return $px ? $val . 'px' : (string) $val;
	if ( is_string( $val ) ) {
		if ( $px && is_numeric( $val ) ) return $val . 'px';
		return $sanitize_css_value( $val );
	}
	return null;
};

$format_font_family = function( ?string $font ): ?string {
	if ( empty( $font ) || $font === 'inherit' ) {
		return null;
	}
	// Strip characters that could cause CSS injection.
	$font = preg_replace( '/[;{}<>"\'\\\\]/', '', (string) $font );
	$font = trim( $font );
	if ( empty( $font ) ) {
		return null;
	}
	if ( false !== strpos( $font, ',' ) ) {
		$parts = array_map( function( $part ) {
			$part  = trim( $part );
			$lower = strtolower( $part );
			if ( in_array( $lower, [ 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-sans-serif', 'ui-serif', 'ui-monospace' ], true ) || 0 === strpos( $part, '-' ) || 0 === strpos( $lower, 'blink' ) ) {
				return esc_attr( $part );
			}
			return '"' . esc_attr( $part ) . '"';
		}, explode( ',', $font ) );
		return implode( ', ', $parts );
	}
	return '"' . esc_attr( $font ) . '", sans-serif';
};

$typo_vars = function( string $prefix, array $t ) use ( $typo_var, $format_font_family ): array {
	$vars = [];
	$ff = $format_font_family( $t['fontFamily'] ?? null );
	if ( $ff ) $vars[ "--gravisain-hero-{$prefix}-ff" ] = $ff;
	$v = $typo_var( $t['fontSize'] ?? null, true );  if ( $v ) $vars[ "--gravisain-hero-{$prefix}-fs" ] = $v;
	$v = $t['fontWeight'] ?? null;                    if ( $v ) $vars[ "--gravisain-hero-{$prefix}-fw" ] = $v;
	$v = $typo_var( $t['lineHeight'] ?? null );       if ( $v ) $vars[ "--gravisain-hero-{$prefix}-lh" ] = $v;
	$v = $typo_var( $t['letterSpacing'] ?? null, true ); if ( $v ) $vars[ "--gravisain-hero-{$prefix}-ls" ] = $v;
	return $vars;
};

$solid_color = fn( $c ) => ( is_string( $c ) && false !== strpos( $c, 'gradient' ) ) ? null : ( $c ?: null );

// ── Attributes ────────────────────────────────────────────────────────────────

$layout             = $attributes['layout']              ?? '1-column';
$eyebrow            = $attributes['eyebrow']             ?? '';
$title              = $attributes['title']               ?? '';
$description        = $attributes['description']         ?? '';
$primary_btn        = $attributes['primaryButton']       ?? [];
$secondary_btn      = $attributes['secondaryButton']     ?? [];
$media              = $attributes['media']               ?? [];
$background         = $attributes['background']          ?? [];
$overlay            = $attributes['overlay']             ?? [];
$inner_max_w        = $attributes['innerContainerMaxWidth'] ?? '';
$anchor             = $attributes['anchor']              ?? '';
$custom_class       = $attributes['customClassName']     ?? '';

$title_color        = $solid_color( $attributes['titleColor']       ?? '' );
$eyebrow_color      = $solid_color( $attributes['eyebrowColor']     ?? '' );
$desc_color         = $solid_color( $attributes['descriptionColor'] ?? '' );

$padding     = $attributes['padding']      ?? null;
$pad_tab     = $attributes['paddingTablet'] ?? null;
$pad_mob     = $attributes['paddingMobile'] ?? null;
$margin      = $attributes['margin']       ?? null;
$mar_tab     = $attributes['marginTablet']  ?? null;
$mar_mob     = $attributes['marginMobile']  ?? null;

$title_typo     = $attributes['titleTypography']      ?? [];
$title_typo_tab = $attributes['titleTypographyTablet'] ?? [];
$title_typo_mob = $attributes['titleTypographyMobile'] ?? [];
$eyebrow_typo   = $attributes['eyebrowTypography']    ?? [];
$eyebrow_t_tab  = $attributes['eyebrowTypographyTablet'] ?? [];
$eyebrow_t_mob  = $attributes['eyebrowTypographyMobile'] ?? [];
$desc_typo      = $attributes['descriptionTypography']    ?? [];
$desc_typo_tab  = $attributes['descriptionTypographyTablet'] ?? [];
$desc_typo_mob  = $attributes['descriptionTypographyMobile'] ?? [];
$btn1_typo      = $attributes['primaryButtonTypography']         ?? [];
$btn1_typo_tab  = $attributes['primaryButtonTypographyTablet']   ?? [];
$btn1_typo_mob  = $attributes['primaryButtonTypographyMobile']   ?? [];
$btn2_typo      = $attributes['secondaryButtonTypography']       ?? [];
$btn2_typo_tab  = $attributes['secondaryButtonTypographyTablet'] ?? [];
$btn2_typo_mob  = $attributes['secondaryButtonTypographyMobile'] ?? [];

// ── Build CSS vars object ─────────────────────────────────────────────────────

$sides = [ 'top', 'right', 'bottom', 'left' ];
$css_vars = [];

foreach ( $sides as $s ) {
	$v = $spacing( $padding,  $s ); if ( $v ) $css_vars[ "--gravisain-hero-padding-{$s}" ]        = $v;
	$v = $spacing( $pad_tab,  $s ); if ( $v ) $css_vars[ "--gravisain-hero-padding-{$s}-tablet" ] = $v;
	$v = $spacing( $pad_mob,  $s ); if ( $v ) $css_vars[ "--gravisain-hero-padding-{$s}-mobile" ] = $v;
	$v = $spacing( $margin,   $s ); if ( $v ) $css_vars[ "--gravisain-hero-margin-{$s}" ]         = $v;
	$v = $spacing( $mar_tab,  $s ); if ( $v ) $css_vars[ "--gravisain-hero-margin-{$s}-tablet" ]  = $v;
	$v = $spacing( $mar_mob,  $s ); if ( $v ) $css_vars[ "--gravisain-hero-margin-{$s}-mobile" ]  = $v;
}

if ( $title_color )   $css_vars['--gravisain-hero-title-color']   = $title_color;
if ( $eyebrow_color ) $css_vars['--gravisain-hero-eyebrow-color'] = $eyebrow_color;
if ( $desc_color )    $css_vars['--gravisain-hero-desc-color']    = $desc_color;

$css_vars = array_merge( $css_vars,
	$typo_vars( 'title',        $title_typo ),
	$typo_vars( 'title-tablet', $title_typo_tab ),
	$typo_vars( 'title-mobile', $title_typo_mob ),
	$typo_vars( 'eyebrow',        $eyebrow_typo ),
	$typo_vars( 'eyebrow-tablet', $eyebrow_t_tab ),
	$typo_vars( 'eyebrow-mobile', $eyebrow_t_mob ),
	$typo_vars( 'desc',        $desc_typo ),
	$typo_vars( 'desc-tablet', $desc_typo_tab ),
	$typo_vars( 'desc-mobile', $desc_typo_mob ),
	$typo_vars( 'btn1',        $btn1_typo ),
	$typo_vars( 'btn1-tablet', $btn1_typo_tab ),
	$typo_vars( 'btn1-mobile', $btn1_typo_mob ),
	$typo_vars( 'btn2',        $btn2_typo ),
	$typo_vars( 'btn2-tablet', $btn2_typo_tab ),
	$typo_vars( 'btn2-mobile', $btn2_typo_mob )
);

// Button colors, border-radius, and padding from button object
if ( ! empty( $primary_btn['color'] ) )           $css_vars['--gravisain-hero-btn1-color']  = $primary_btn['color'];
if ( ! empty( $primary_btn['backgroundColor'] ) ) $css_vars['--gravisain-hero-btn1-bg']     = $primary_btn['backgroundColor'];
if ( isset( $primary_btn['borderRadius'] ) && $primary_btn['borderRadius'] !== '' && $primary_btn['borderRadius'] !== null ) {
	$css_vars['--gravisain-hero-btn1-radius'] = $primary_btn['borderRadius'] . 'px';
}
foreach ( $sides as $s ) {
	$v = $spacing( $primary_btn['padding'] ?? null, $s );
	if ( $v ) $css_vars[ "--gravisain-hero-btn1-p{$s[0]}" ] = $v;
}

if ( ! empty( $secondary_btn['color'] ) )           $css_vars['--gravisain-hero-btn2-color'] = $secondary_btn['color'];
if ( ! empty( $secondary_btn['backgroundColor'] ) ) $css_vars['--gravisain-hero-btn2-bg']    = $secondary_btn['backgroundColor'];
if ( isset( $secondary_btn['borderRadius'] ) && $secondary_btn['borderRadius'] !== '' && $secondary_btn['borderRadius'] !== null ) {
	$css_vars['--gravisain-hero-btn2-radius'] = $secondary_btn['borderRadius'] . 'px';
}
foreach ( $sides as $s ) {
	$v = $spacing( $secondary_btn['padding'] ?? null, $s );
	if ( $v ) $css_vars[ "--gravisain-hero-btn2-p{$s[0]}" ] = $v;
}

// Build style string
$style_str = implode( ';', array_map(
	fn( $k, $v ) => esc_attr( $k ) . ':' . esc_attr( $v ),
	array_keys( $css_vars ),
	array_values( $css_vars )
) );

// Explicit padding overrides
$p_top    = $css_vars['--gravisain-hero-padding-top'] ?? null;
$p_bottom = $css_vars['--gravisain-hero-padding-bottom'] ?? null;
$p_left   = $css_vars['--gravisain-hero-padding-left'] ?? null;
$p_right  = $css_vars['--gravisain-hero-padding-right'] ?? null;

if ( $p_top !== null && $p_top !== '' ) {
	$style_str .= ';padding-top:' . esc_attr( $p_top ) . ' !important';
}
if ( $p_bottom !== null && $p_bottom !== '' ) {
	$style_str .= ';padding-bottom:' . esc_attr( $p_bottom ) . ' !important';
}
if ( $p_left !== null && $p_left !== '' ) {
	$style_str .= ';padding-left:' . esc_attr( $p_left ) . ' !important';
}
if ( $p_right !== null && $p_right !== '' ) {
	$style_str .= ';padding-right:' . esc_attr( $p_right ) . ' !important';
}

// Explicit margin overrides (ensures negative margins, bottom, left, right take effect reliably)
$m_top    = $css_vars['--gravisain-hero-margin-top'] ?? null;
$m_bottom = $css_vars['--gravisain-hero-margin-bottom'] ?? null;
$m_left   = $css_vars['--gravisain-hero-margin-left'] ?? null;
$m_right  = $css_vars['--gravisain-hero-margin-right'] ?? null;

if ( $m_top !== null && $m_top !== '' ) {
	$style_str .= ';margin-top:' . esc_attr( $m_top ) . ' !important;margin-block-start:' . esc_attr( $m_top ) . ' !important';
}
if ( $m_bottom !== null && $m_bottom !== '' ) {
	$style_str .= ';margin-bottom:' . esc_attr( $m_bottom ) . ' !important;margin-block-end:' . esc_attr( $m_bottom ) . ' !important';
}
$is_align_full = empty( $attributes['align'] ) || $attributes['align'] === 'full';
if ( ! $is_align_full ) {
	if ( $m_left !== null && $m_left !== '' ) {
		$style_str .= ';margin-left:' . esc_attr( $m_left ) . ' !important';
	}
	if ( $m_right !== null && $m_right !== '' ) {
		$style_str .= ';margin-right:' . esc_attr( $m_right ) . ' !important';
	}
}

// Background inline styles
$bg_parts = [];
if ( ! empty( $background['color'] ) ) {
	if ( false !== strpos( $background['color'], 'gradient' ) ) {
		$bg_parts[] = 'background-image:' . esc_attr( $background['color'] );
	} else {
		$bg_parts[] = 'background-color:' . esc_attr( $background['color'] );
	}
}
if ( ! empty( $background['image'] ) ) {
	$bg_parts[] = 'background-image:url(' . esc_url( $background['image'] ) . ')';
	$bg_parts[] = 'background-size:cover';
	if ( ! empty( $background['focalPoint'] ) && is_array( $background['focalPoint'] ) ) {
		$fx = round( floatval( $background['focalPoint']['x'] ?? 0.5 ) * 100 );
		$fy = round( floatval( $background['focalPoint']['y'] ?? 0.5 ) * 100 );
		$bg_parts[] = "background-position:{$fx}% {$fy}%";
	} else {
		$bg_parts[] = 'background-position:center center';
	}
}
if ( ! empty( $background['gradient'] ) ) $bg_parts[] = 'background-image:' . esc_attr( $background['gradient'] );
if ( $bg_parts ) $style_str .= ';' . implode( ';', $bg_parts );

// ── Classes ───────────────────────────────────────────────────────────────────

$align_class = ! empty( $attributes['align'] ) ? 'align' . $attributes['align'] : 'alignfull';

$classes = array_filter( [
	'gravisain-hero',
	'hero-layout-' . esc_attr( $layout ),
	$align_class,
	$custom_class ? esc_attr( $custom_class ) : '',
] );
$class_str = implode( ' ', $classes );

$id_attr = $anchor ? 'id="' . esc_attr( $anchor ) . '"' : '';

// ── Overlay ───────────────────────────────────────────────────────────────────

$overlay_html = '';
if ( ! empty( $overlay['color'] ) ) {
	$ov_opacity = isset( $overlay['opacity'] ) ? (float) $overlay['opacity'] : 0.5;
	$ov_prop    = false !== strpos( $overlay['color'], 'gradient' ) ? 'background-image:' : 'background-color:';
	$overlay_html = '<div class="gravisain-section-overlay" style="' . $ov_prop
		. esc_attr( $overlay['color'] ) . ';opacity:' . $ov_opacity . ';position:absolute;inset:0"></div>';
}

// ── Buttons ───────────────────────────────────────────────────────────────────

$render_btn = function( array $btn, string $extra_class ) {
	if ( empty( $btn['text'] ) ) return '';
	$style_cls = esc_attr( $btn['style'] ?? 'primary' );
	$url       = esc_url( $btn['url'] ?? '#' );
	$text      = wp_kses_post( $btn['text'] );
	return "<a href=\"{$url}\" class=\"gravisain-button gravisain-button--{$style_cls} {$extra_class}\">{$text}</a>";
};

// ── Media ─────────────────────────────────────────────────────────────────────

$media_html = '';
if ( $layout !== '1-column' && ! empty( $media['url'] ) ) {
	$src = esc_url( $media['url'] );
	$alt = esc_attr( $media['alt'] ?? 'Hero media' );
	$img_style = '';
	if ( ! empty( $media['focalPoint'] ) && is_array( $media['focalPoint'] ) ) {
		$fx = round( floatval( $media['focalPoint']['x'] ?? 0.5 ) * 100 );
		$fy = round( floatval( $media['focalPoint']['y'] ?? 0.5 ) * 100 );
		$img_style = " style=\"object-position:{$fx}% {$fy}%;object-fit:cover;\"";
	}
	$media_html = '<div class="hero-media-wrapper"><img src="' . $src . '" alt="' . $alt . '" loading="lazy"' . $img_style . ' /></div>';
}

// Container max-width
$container_style = $inner_max_w ? 'style="max-width:' . esc_attr( $inner_max_w ) . '"' : '';

$text_align      = $attributes['textAlign'] ?? '';
$text_align_tab  = $attributes['textAlignTablet'] ?? '';
$text_align_mob  = $attributes['textAlignMobile'] ?? '';
$effective_align = $text_align ?: ( $layout === '1-column' ? 'center' : 'left' );

$content_classes = [
	'hero-content',
	'has-text-align-' . esc_attr( $effective_align ),
];
if ( $text_align_tab ) $content_classes[] = 'has-tablet-text-align-' . esc_attr( $text_align_tab );
if ( $text_align_mob ) $content_classes[] = 'has-mobile-text-align-' . esc_attr( $text_align_mob );
$content_class_str = implode( ' ', $content_classes );

$btn_group_classes = [
	'hero-button-group',
	esc_attr( $effective_align ),
	'has-btn-align-' . esc_attr( $effective_align ),
];
if ( $text_align_tab ) $btn_group_classes[] = 'has-tablet-btn-align-' . esc_attr( $text_align_tab );
if ( $text_align_mob ) $btn_group_classes[] = 'has-mobile-btn-align-' . esc_attr( $text_align_mob );
$btn_group_class = implode( ' ', $btn_group_classes );
?>
<section class="<?php echo esc_attr( $class_str ); ?>" style="<?php echo esc_attr( $style_str ); ?>" <?php echo $anchor ? 'id="' . esc_attr( $anchor ) . '"' : ''; ?>>
	<div class="gravisain-section-overlay"><?php echo wp_kses_post( $overlay_html ); ?></div>
	<div class="gravisain-section-content">
		<div class="hero-container" <?php echo $inner_max_w ? 'style="max-width:' . esc_attr( $inner_max_w ) . '"' : ''; ?>>
			<div class="hero-layout hero-layout-<?php echo esc_attr( $layout ); ?>">
				<div class="<?php echo esc_attr( $content_class_str ); ?>">
					<?php if ( $eyebrow ) : ?>
						<span class="hero-eyebrow"><?php echo wp_kses_post( $eyebrow ); ?></span>
					<?php endif; ?>

					<h1 class="hero-title"><?php echo wp_kses_post( $title ); ?></h1>

					<?php if ( $description ) : ?>
						<p class="hero-description"><?php echo wp_kses_post( $description ); ?></p>
					<?php endif; ?>

					<div class="<?php echo esc_attr( $btn_group_class ); ?>">
						<?php echo wp_kses_post( $render_btn( $primary_btn, 'primary-btn' ) ); ?>
						<?php echo wp_kses_post( $render_btn( $secondary_btn, 'secondary-btn' ) ); ?>
					</div>
				</div>

				<?php echo wp_kses_post( $media_html ); ?>
			</div>
		</div>
	</div>
</section>
