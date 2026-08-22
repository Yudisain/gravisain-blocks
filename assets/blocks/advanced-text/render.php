<?php
/**
 * Advanced Text Block – Server-Side Renderer
 *
 * Using render.php bypasses wp_kses filtering on the style attribute,
 * which would otherwise strip out CSS custom properties (--gravisain-*).
 *
 * @package Gravisain\Blocks
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML (unused for this leaf block).
 * @var WP_Block $block      Block object.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// ── Helper functions ────────────────────────────────────────────────────────

$get_spacing = function( $spacing, string $side ): ?string {
	if ( $spacing === null || $spacing === '' || $spacing === false ) return null;
	if ( is_string( $spacing ) || is_numeric( $spacing ) ) {
		return is_numeric( $spacing ) ? $spacing . 'px' : $spacing;
	}
	if ( is_array( $spacing ) ) {
		$val = $spacing[ $side ] ?? null;
		if ( is_numeric( $val ) ) return $val . 'px';
		return $val ?: null;
	}
	return null;
};

$get_typo_var = function( $val, bool $is_size = false ): ?string {
	if ( $val === null || $val === '' || $val === false ) return null;
	if ( is_numeric( $val ) ) return $is_size ? $val . 'px' : (string) $val;
	if ( is_string( $val ) ) {
		if ( $is_size && is_numeric( $val ) ) return $val . 'px';
		return $val;
	}
	return null;
};

// ── Attributes ───────────────────────────────────────────────────────────────

$html_tag       = $attributes['htmlTag']              ?? 'p';
$content        = $attributes['content']              ?? '';
$text_align     = $attributes['textAlign']            ?? 'left';
$text_align_tab = $attributes['textAlignTablet']      ?? '';
$text_align_mob = $attributes['textAlignMobile']      ?? '';
$font_family    = $attributes['fontFamily']           ?? '';
$font_size      = $attributes['fontSize']             ?? 16;
$font_size_tab  = $attributes['fontSizeTablet']       ?? null;
$font_size_mob  = $attributes['fontSizeMobile']       ?? null;
$font_weight    = $attributes['fontWeight']           ?? '400';
$line_height    = $attributes['lineHeight']           ?? '1.5';
$line_ht_tab    = $attributes['lineHeightTablet']     ?? null;
$line_ht_mob    = $attributes['lineHeightMobile']     ?? null;
$letter_sp      = $attributes['letterSpacing']        ?? '0px';
$letter_sp_tab  = $attributes['letterSpacingTablet']  ?? null;
$letter_sp_mob  = $attributes['letterSpacingMobile']  ?? null;
$text_transform = $attributes['textTransform']        ?? 'none';
$text_color     = $attributes['textColor']            ?? '#334155';
$highlight_clr  = $attributes['highlightColor']       ?? '#2563eb';
$enable_grad    = $attributes['enableTextGradient']   ?? false;
$text_gradient  = $attributes['textGradient']         ?? '';
$padding        = $attributes['padding']              ?? null;
$padding_tab    = $attributes['paddingTablet']        ?? null;
$padding_mob    = $attributes['paddingMobile']        ?? null;
$margin         = $attributes['margin']               ?? null;
$margin_tab     = $attributes['marginTablet']         ?? null;
$margin_mob     = $attributes['marginMobile']         ?? null;
$anchor         = $attributes['anchor']               ?? '';
$custom_class   = $attributes['customClassName']      ?? '';

// Sanitize gradient used as solid color.
$is_gradient_str = fn( $c ) => ( is_string( $c ) && str_contains( $c, 'gradient' ) );
if ( $is_gradient_str( $text_color ) )   $text_color  = '#334155';
if ( $is_gradient_str( $highlight_clr ) ) $highlight_clr = '#2563eb';

// ── Build outer CSS custom properties ────────────────────────────────────────

$css_vars = [];
$sides = [ 'top', 'right', 'bottom', 'left' ];
foreach ( $sides as $side ) {
	$v = $get_spacing( $padding, $side );     if ( $v ) $css_vars[ "--gravisain-padding-{$side}" ]        = $v;
	$v = $get_spacing( $padding_tab, $side ); if ( $v ) $css_vars[ "--gravisain-padding-{$side}-tablet" ] = $v;
	$v = $get_spacing( $padding_mob, $side ); if ( $v ) $css_vars[ "--gravisain-padding-{$side}-mobile" ] = $v;
	$v = $get_spacing( $margin, $side );      if ( $v ) $css_vars[ "--gravisain-margin-{$side}" ]         = $v;
	$v = $get_spacing( $margin_tab, $side );  if ( $v ) $css_vars[ "--gravisain-margin-{$side}-tablet" ]  = $v;
	$v = $get_spacing( $margin_mob, $side );  if ( $v ) $css_vars[ "--gravisain-margin-{$side}-mobile" ]  = $v;
}

if ( $font_family ) $css_vars['--gravisain-ff'] = "'{$font_family}'";

$v = $get_typo_var( $font_size, true );  if ( $v ) $css_vars['--gravisain-fs']       = $v;
$v = $get_typo_var( $font_size_tab, true ); if ( $v ) $css_vars['--gravisain-fs-tablet'] = $v;
$v = $get_typo_var( $font_size_mob, true ); if ( $v ) $css_vars['--gravisain-fs-mobile'] = $v;
$v = $get_typo_var( $line_height );     if ( $v ) $css_vars['--gravisain-lh']       = $v;
$v = $get_typo_var( $line_ht_tab );     if ( $v ) $css_vars['--gravisain-lh-tablet'] = $v;
$v = $get_typo_var( $line_ht_mob );     if ( $v ) $css_vars['--gravisain-lh-mobile'] = $v;
$v = $get_typo_var( $letter_sp, true ); if ( $v ) $css_vars['--gravisain-ls']       = $v;
$v = $get_typo_var( $letter_sp_tab, true ); if ( $v ) $css_vars['--gravisain-ls-tablet'] = $v;
$v = $get_typo_var( $letter_sp_mob, true ); if ( $v ) $css_vars['--gravisain-ls-mobile'] = $v;

$outer_style = implode( ';', array_map(
	fn( $k, $v ) => esc_attr( $k ) . ':' . esc_attr( $v ),
	array_keys( $css_vars ),
	array_values( $css_vars )
) );

// ── Inner (text element) style ────────────────────────────────────────────────

$inner_parts = [];
$inner_parts[] = 'text-align:' . esc_attr( $text_align );
$inner_parts[] = 'font-weight:' . esc_attr( $font_weight ?: '400' );
$inner_parts[] = 'text-transform:' . esc_attr( $text_transform ?: 'none' );
$inner_parts[] = '--gravisain-highlight-color:' . esc_attr( $highlight_clr );

if ( $enable_grad && $text_gradient ) {
	$inner_parts[] = 'color:transparent';
	$inner_parts[] = 'background-image:' . esc_attr( $text_gradient );
	$inner_parts[] = '-webkit-background-clip:text';
	$inner_parts[] = 'background-clip:text';
} else {
	$inner_parts[] = 'color:' . esc_attr( $text_color ?: '#334155' );
	$inner_parts[] = 'background-image:none';
}

$inner_style = implode( ';', $inner_parts );

// ── Classes ───────────────────────────────────────────────────────────────────

$classes = [ 'gravisain-advanced-text', 'has-text-align-' . $text_align ];
if ( $text_align_tab ) $classes[] = 'has-tablet-text-align-' . $text_align_tab;
if ( $text_align_mob ) $classes[] = 'has-mobile-text-align-' . $text_align_mob;
if ( $custom_class )   $classes[] = $custom_class;
$class_string = implode( ' ', array_map( 'esc_attr', $classes ) );

$allowed_tags = [ 'p','h1','h2','h3','h4','h5','h6','div','span' ];
$tag = in_array( $html_tag, $allowed_tags, true ) ? $html_tag : 'p';

$id_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';
?>
<div class="<?php echo $class_string; ?>" style="<?php echo $outer_style; ?>"<?php echo $id_attr; ?>>
	<<?php echo esc_attr( $tag ); ?> class="gravisain-text-content" style="<?php echo $inner_style; ?>"><?php echo wp_kses_post( $content ); ?></<?php echo esc_attr( $tag ); ?>>
</div>
