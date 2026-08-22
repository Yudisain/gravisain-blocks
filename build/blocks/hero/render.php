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

// ── Helpers ───────────────────────────────────────────────────────────────────

$spacing = function( $val, string $side ): ?string {
	if ( $val === null || $val === '' ) return null;
	if ( is_numeric( $val ) ) return $val . 'px';
	if ( is_string( $val ) ) return $val;
	if ( is_array( $val ) ) {
		$v = $val[ $side ] ?? null;
		if ( $v === null || $v === '' ) return null;
		return is_numeric( $v ) ? $v . 'px' : $v;
	}
	return null;
};

$typo_var = function( $val, bool $px = false ): ?string {
	if ( $val === null || $val === '' || $val === false ) return null;
	if ( is_numeric( $val ) ) return $px ? $val . 'px' : (string) $val;
	if ( is_string( $val ) ) {
		if ( $px && is_numeric( $val ) ) return $val . 'px';
		return $val;
	}
	return null;
};

$typo_vars = function( string $prefix, array $t ) use ( $typo_var ): array {
	$vars = [];
	if ( ! empty( $t['fontFamily'] ) ) $vars[ "--gravisain-hero-{$prefix}-ff" ] = "'{$t['fontFamily']}'";
	$v = $typo_var( $t['fontSize'] ?? null, true );  if ( $v ) $vars[ "--gravisain-hero-{$prefix}-fs" ] = $v;
	$v = $t['fontWeight'] ?? null;                    if ( $v ) $vars[ "--gravisain-hero-{$prefix}-fw" ] = $v;
	$v = $typo_var( $t['lineHeight'] ?? null );       if ( $v ) $vars[ "--gravisain-hero-{$prefix}-lh" ] = $v;
	$v = $typo_var( $t['letterSpacing'] ?? null, true ); if ( $v ) $vars[ "--gravisain-hero-{$prefix}-ls" ] = $v;
	return $vars;
};

$solid_color = fn( $c ) => ( is_string( $c ) && str_contains( $c, 'gradient' ) ) ? null : ( $c ?: null );

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
$btn1_typo      = $attributes['primaryButtonTypography']   ?? [];
$btn2_typo      = $attributes['secondaryButtonTypography'] ?? [];

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
	$typo_vars( 'btn1', $btn1_typo ),
	$typo_vars( 'btn2', $btn2_typo )
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
	fn( $k, $v ) => $k . ':' . $v,
	array_keys( $css_vars ),
	array_values( $css_vars )
) );

// Background inline styles
$bg_parts = [];
if ( ! empty( $background['color'] ) )    $bg_parts[] = 'background-color:' . esc_attr( $background['color'] );
if ( ! empty( $background['image'] ) )    $bg_parts[] = 'background-image:url(' . esc_url( $background['image'] ) . ')';
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

$id_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';

// ── Overlay ───────────────────────────────────────────────────────────────────

$overlay_html = '';
if ( ! empty( $overlay['color'] ) ) {
	$ov_opacity = isset( $overlay['opacity'] ) ? (float) $overlay['opacity'] : 0.5;
	$overlay_html = '<div class="gravisain-section-overlay" style="background-color:'
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
	$media_html = '<div class="hero-media-wrapper"><img src="' . $src . '" alt="' . $alt . '" loading="lazy" /></div>';
}

// Container max-width
$container_style = $inner_max_w ? ' style="max-width:' . esc_attr( $inner_max_w ) . '"' : '';

$btn_group_class = $layout === '1-column' ? 'hero-button-group center' : 'hero-button-group';
?>
<section class="<?php echo $class_str; ?>" style="<?php echo $style_str; ?>"<?php echo $id_attr; ?>>
	<div class="gravisain-section-overlay"><?php echo $overlay_html; ?></div>
	<div class="gravisain-section-content">
		<div class="hero-container"<?php echo $container_style; ?>>
			<div class="hero-layout hero-layout-<?php echo esc_attr( $layout ); ?>">
				<div class="hero-content">
					<?php if ( $eyebrow ) : ?>
						<span class="hero-eyebrow"><?php echo wp_kses_post( $eyebrow ); ?></span>
					<?php endif; ?>

					<h1 class="hero-title"><?php echo wp_kses_post( $title ); ?></h1>

					<?php if ( $description ) : ?>
						<p class="hero-description"><?php echo wp_kses_post( $description ); ?></p>
					<?php endif; ?>

					<div class="<?php echo esc_attr( $btn_group_class ); ?>">
						<?php echo $render_btn( $primary_btn, 'primary-btn' ); ?>
						<?php echo $render_btn( $secondary_btn, 'secondary-btn' ); ?>
					</div>
				</div>

				<?php echo $media_html; ?>
			</div>
		</div>
	</div>
</section>
