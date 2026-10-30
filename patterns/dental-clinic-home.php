<?php
/**
 * Pattern: Modern Dental & Orthodontic Clinic - Complete Homepage Template
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gravisain\Blocks\PatternRegistry;

$gravisain_blocks_dental_content = PatternRegistry::get_template_content( 'dental-clinic' );
if ( empty( $gravisain_blocks_dental_content ) ) {
	return array();
}

return array(
	'slug'        => 'gravisain-blocks/dental-clinic-home',
	'title'       => __( 'Dental & Orthodontic Clinic — Full Homepage', 'gravisain-blocks' ),
	'categories'  => array( 'gravisain-templates', 'gravisain-heroes', 'gravisain-sections' ),
	'description' => __( 'A clean, modern medical dental practice and dental implant clinic homepage built 100% with Gravisain blocks.', 'gravisain-blocks' ),
	'content'     => $gravisain_blocks_dental_content,
);
