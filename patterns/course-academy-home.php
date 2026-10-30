<?php
/**
 * Pattern: Online Course & Coaching Academy - Complete Homepage Template
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gravisain\Blocks\PatternRegistry;

$gravisain_blocks_course_content = PatternRegistry::get_template_content( 'course-academy' );
if ( empty( $gravisain_blocks_course_content ) ) {
	return array();
}

return array(
	'slug'        => 'gravisain-blocks/course-academy-home',
	'title'       => __( 'Online Course & Coaching Academy — Full Homepage', 'gravisain-blocks' ),
	'categories'  => array( 'gravisain-templates', 'gravisain-heroes', 'gravisain-sections' ),
	'description' => __( 'A high-converting online course, cohort program, and masterclass homepage built 100% with Gravisain blocks.', 'gravisain-blocks' ),
	'content'     => $gravisain_blocks_course_content,
);
