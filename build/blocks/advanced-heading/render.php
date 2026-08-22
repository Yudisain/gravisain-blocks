<?php
/**
 * Advanced Heading Block – Server-Side Renderer
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

/**
 * Extract a spacing value (supports object with sides or a flat scalar).
 */
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

/**
 * Convert a typography value to a CSS string.
 *
 * @param mixed $val       Raw value.
 * @param bool  $is_size   True ⇒ append "px" for bare numbers.
 */
$get_typo_var = function( $val, bool $is_size = false ) use ( &$get_typo_var ): ?string {
	if ( $val === null || $val === '' || $val === false ) return null;
	if ( is_numeric( $val ) ) return $is_size ? $val . 'px' : (string) $val;
	if ( is_string( $val ) ) {
		if ( $is_size && is_numeric( $val ) ) return $val . 'px';
		return $val;
	}
	return null;
};

// ── Attribute extraction ─────────────────────────────────────────────────────

$heading_tag     = $attributes['headingTag']          ?? 'h2';
$text_align      = $attributes['textAlign']           ?? 'left';
$text_align_tab  = $attributes['textAlignTablet']     ?? '';
$text_align_mob  = $attributes['textAlignMobile']     ?? '';
$eyebrow         = $attributes['eyebrow']             ?? '';
$eyebrow_pos     = $attributes['eyebrowPosition']     ?? 'above';
$content         = $attributes['content']             ?? '';
$font_family     = $attributes['fontFamily']          ?? '';
$font_size       = $attributes['fontSize']            ?? 32;
$font_size_tab   = $attributes['fontSizeTablet']      ?? null;
$font_size_mob   = $attributes['fontSizeMobile']      ?? null;
$font_weight     = $attributes['fontWeight']          ?? '800';
$line_height     = $attributes['lineHeight']          ?? '1.25';
$line_height_tab = $attributes['lineHeightTablet']    ?? null;
$line_height_mob = $attributes['lineHeightMobile']    ?? null;
$letter_spacing  = $attributes['letterSpacing']       ?? '0px';
$letter_sp_tab   = $attributes['letterSpacingTablet'] ?? null;
$letter_sp_mob   = $attributes['letterSpacingMobile'] ?? null;
$text_transform  = $attributes['textTransform']       ?? 'none';
$text_color      = $attributes['textColor']           ?? '#0f172a';
$highlight_color = $attributes['highlightColor']      ?? '#2563eb';
$enable_gradient = $attributes['enableTextGradient']  ?? false;
$text_gradient   = $attributes['textGradient']        ?? '';
$show_divider    = $attributes['showDivider']         ?? true;
$divider_width   = $attributes['dividerWidth']        ?? 48;
$divider_height  = $attributes['dividerHeight']       ?? 4;
$divider_color   = $attributes['dividerColor']        ?? '#2563eb';
$padding         = $attributes['padding']             ?? null;
$padding_tab     = $attributes['paddingTablet']       ?? null;
$padding_mob     = $attributes['paddingMobile']       ?? null;
$margin          = $attributes['margin']              ?? null;
$margin_tab      = $attributes['marginTablet']        ?? null;
$margin_mob      = $attributes['marginMobile']        ?? null;
$max_width       = $attributes['maxWidth']            ?? '100%';
$breakout        = $attributes['breakoutPadding']     ?? false;
$anchor          = $attributes['anchor']              ?? '';
$custom_class    = $attributes['customClassName']     ?? '';
$custom_css_raw  = $attributes['customCSS']           ?? '';

// Sanitize: never set a gradient as a solid text color.
$is_gradient_str = fn( $c ) => ( is_string( $c ) && str_contains( $c, 'gradient' ) );
if ( $is_gradient_str( $text_color ) )      $text_color      = '#0f172a';
if ( $is_gradient_str( $highlight_color ) ) $highlight_color = '#2563eb';

// ── Build CSS custom properties ──────────────────────────────────────────────

$css_vars = [];

// Spacing
$sides = [ 'top', 'right', 'bottom', 'left' ];
foreach ( $sides as $side ) {
	$v = $get_spacing( $padding, $side );     if ( $v ) $css_vars[ "--gravisain-padding-{$side}" ]         = $v;
	$v = $get_spacing( $padding_tab, $side ); if ( $v ) $css_vars[ "--gravisain-padding-{$side}-tablet" ]  = $v;
	$v = $get_spacing( $padding_mob, $side ); if ( $v ) $css_vars[ "--gravisain-padding-{$side}-mobile" ]  = $v;
	$v = $get_spacing( $margin, $side );      if ( $v ) $css_vars[ "--gravisain-margin-{$side}" ]          = $v;
	$v = $get_spacing( $margin_tab, $side );  if ( $v ) $css_vars[ "--gravisain-margin-{$side}-tablet" ]   = $v;
	$v = $get_spacing( $margin_mob, $side );  if ( $v ) $css_vars[ "--gravisain-margin-{$side}-mobile" ]   = $v;
}

// Typography
if ( $font_family ) $css_vars['--gravisain-ff'] = "'{$font_family}'";

$v = $get_typo_var( $font_size, true );     if ( $v ) $css_vars['--gravisain-fs']          = $v;
$v = $get_typo_var( $font_size_tab, true ); if ( $v ) $css_vars['--gravisain-fs-tablet']    = $v;
$v = $get_typo_var( $font_size_mob, true ); if ( $v ) $css_vars['--gravisain-fs-mobile']    = $v;
$v = $get_typo_var( $line_height );         if ( $v ) $css_vars['--gravisain-lh']           = $v;
$v = $get_typo_var( $line_height_tab );     if ( $v ) $css_vars['--gravisain-lh-tablet']    = $v;
$v = $get_typo_var( $line_height_mob );     if ( $v ) $css_vars['--gravisain-lh-mobile']    = $v;
$v = $get_typo_var( $letter_spacing, true );if ( $v ) $css_vars['--gravisain-ls']           = $v;
$v = $get_typo_var( $letter_sp_tab, true ); if ( $v ) $css_vars['--gravisain-ls-tablet']    = $v;
$v = $get_typo_var( $letter_sp_mob, true ); if ( $v ) $css_vars['--gravisain-ls-mobile']    = $v;

if ( $max_width && $max_width !== '100%' ) {
	$css_vars['max-width'] = esc_attr( $max_width );
}
$css_vars['margin-left']  = 'auto';
$css_vars['margin-right'] = 'auto';

// Build style string
$style_parts = array_map(
	fn( $k, $v ) => esc_attr( $k ) . ':' . esc_attr( $v ),
	array_keys( $css_vars ),
	array_values( $css_vars )
);
$style_string = implode( ';', $style_parts );

// ── CSS classes ───────────────────────────────────────────────────────────────

$classes = [
	'gravisain-advanced-heading',
	'has-text-align-' . $text_align,
];
if ( $text_align_tab ) $classes[] = 'has-tablet-text-align-' . $text_align_tab;
if ( $text_align_mob ) $classes[] = 'has-mobile-text-align-' . $text_align_mob;
if ( $breakout )       $classes[] = 'has-breakout-padding';
if ( $custom_class )   $classes[] = $custom_class;

$class_string = implode( ' ', array_map( 'esc_attr', $classes ) );

// ── Heading inner style ───────────────────────────────────────────────────────

$heading_style_parts = [];
$heading_style_parts[] = 'text-align:' . esc_attr( $text_align );
$heading_style_parts[] = 'font-weight:' . esc_attr( $font_weight ?: '800' );
$heading_style_parts[] = 'text-transform:' . esc_attr( $text_transform ?: 'none' );

if ( $enable_gradient && $text_gradient ) {
	$heading_style_parts[] = 'color:transparent';
	$heading_style_parts[] = 'background-image:' . esc_attr( $text_gradient );
	$heading_style_parts[] = '-webkit-background-clip:text';
	$heading_style_parts[] = 'background-clip:text';
} else {
	$heading_style_parts[] = 'color:' . esc_attr( $text_color ?: '#0f172a' );
	$heading_style_parts[] = 'background-image:none';
}

$heading_style_parts[] = '--gravisain-highlight-color:' . esc_attr( $highlight_color ?: '#2563eb' );
$heading_style_string = implode( ';', $heading_style_parts );

$tag_name = in_array( $heading_tag, [ 'h1','h2','h3','h4','h5','h6' ], true ) ? $heading_tag : 'h2';

// ── ID attribute ──────────────────────────────────────────────────────────────

$id_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';

?>
<div class="<?php echo $class_string; ?>" style="<?php echo $style_string; ?>"<?php echo $id_attr; ?>>

	<?php if ( $eyebrow && $eyebrow_pos === 'above' ) : ?>
		<span class="gravisain-heading-eyebrow"><?php echo wp_kses_post( $eyebrow ); ?></span>
	<?php endif; ?>

	<<?php echo esc_attr( $tag_name ); ?>
		class="gravisain-heading-title"
		style="<?php echo $heading_style_string; ?>"
	><?php echo wp_kses_post( $content ); ?></<?php echo esc_attr( $tag_name ); ?>>

	<?php if ( $eyebrow && $eyebrow_pos === 'below' ) : ?>
		<span class="gravisain-heading-eyebrow below"><?php echo wp_kses_post( $eyebrow ); ?></span>
	<?php endif; ?>

	<?php if ( $show_divider ) : ?>
		<div
			class="gravisain-heading-divider"
			style="
				width: <?php echo absint( $divider_width ); ?>px;
				height: <?php echo absint( $divider_height ); ?>px;
				background-color: <?php echo esc_attr( $divider_color ); ?>;
				margin-left: <?php echo in_array( $text_align, [ 'center', 'right' ], true ) ? 'auto' : '0'; ?>;
				margin-right: <?php echo $text_align === 'center' ? 'auto' : '0'; ?>;
			"
		></div>
	<?php endif; ?>

</div>
