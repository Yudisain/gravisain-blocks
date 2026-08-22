/**
 * SVG Shape Definitions for Gravisain Blocks
 */

export const SHAPES = {
	none: { label: 'None', svg: null },
	
	// Waves
	wave1: { label: 'Wave 1', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M1000 100V0C922 0 859.5 28.5 750 28.5C620 28.5 531.5 0 452.5 0C364.5 0 263.5 28.5 142.5 28.5C53 28.5 0 0 0 0V100H1000Z"/></svg>' },
	wave2: { label: 'Wave 2', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0,0 C300,100 700,100 1000,0 V100 H0 V0 Z"/></svg>' },
	wave3: { label: 'Wave 3', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 V100 H0 V50 Z"/></svg>' },
	wave4: { label: 'Wave 4', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0,20 C300,120 700,-80 1000,80 V100 H0 V20 Z"/></svg>' },
	wave_brush: { label: 'Wave Brush', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 0C110 57 266 94 403 91C553 87 690 41 810 16C911 -4 981 1 1000 7V100H0V0Z"/></svg>' },

	// Curves
	curve1: { label: 'Curve Center', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 100V0C233 80 767 80 1000 0V100H0Z"/></svg>' },
	curve2: { label: 'Curve Asymmetric', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 100V0C100 0 300 90 1000 20V100H0Z"/></svg>' },
	curve3: { label: 'Curve Inverted', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0,100 C300,0 700,0 1000,100 Z"/></svg>' },

	// Angles / Tilts
	tilt1: { label: 'Tilt Left', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 100V0L1000 100H0Z"/></svg>' },
	tilt2: { label: 'Tilt Right', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M1000 100V0L0 100H1000Z"/></svg>' },
	triangle: { label: 'Triangle Center', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M500 0L0 100H1000L500 0Z"/></svg>' },
	triangle_asym: { label: 'Triangle Asymmetric', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M250 0L0 100H1000L250 0Z"/></svg>' },
	arrow: { label: 'Arrow', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M500 100L0 0V100H1000V0L500 100Z"/></svg>' },

	// Geometric & Modern
	split: { label: 'Split', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 100V50L500 100L1000 50V100H0Z"/></svg>' },
	book: { label: 'Book', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 100V0C250 50 500 50 500 100C500 50 750 50 1000 0V100H0Z"/></svg>' },
	zigzag: { label: 'Zigzag', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0,50 L100,0 L200,50 L300,0 L400,50 L500,0 L600,50 L700,0 L800,50 L900,0 L1000,50 V100 H0 Z"/></svg>' },
	steps: { label: 'Steps', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 100V80H200V60H400V40H600V20H800V0H1000V100H0Z"/></svg>' },

	// Organic
	drops: { label: 'Drops', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 0V100H1000V0C1000 0 850 100 750 100C650 100 600 0 500 0C400 0 350 100 250 100C150 100 0 0 0 0Z"/></svg>' },
	clouds: { label: 'Clouds', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 100V60C50 60 50 10 120 10C170 10 190 30 250 30C320 30 350 -10 450 10C530 30 550 50 600 40C680 20 720 50 780 40C850 30 890 80 950 60C990 40 1000 70 1000 100H0Z"/></svg>' },
	mountains: { label: 'Mountains', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 100V80L150 20L300 90L450 10L650 100L800 40L1000 80V100H0Z"/></svg>' },

	// Layered (Shadow) Shapes
	triangle_layered: { label: 'Triangle Layered', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" opacity="0.3" d="M500 0L0 70H1000L500 0Z"/><path fill="currentColor" d="M500 30L0 100H1000L500 30Z"/></svg>' },
	tilt_left_layered: { label: 'Tilt Left Layered', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" opacity="0.3" d="M0 70V0L1000 70H0Z"/><path fill="currentColor" d="M0 100V30L1000 100H0Z"/></svg>' },
	tilt_right_layered: { label: 'Tilt Right Layered', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" opacity="0.3" d="M1000 70V0L0 70H1000Z"/><path fill="currentColor" d="M1000 100V30L0 100H1000Z"/></svg>' },
	curve_layered: { label: 'Curve Layered', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" opacity="0.3" d="M0 70V0C233 50 767 50 1000 0V70H0Z"/><path fill="currentColor" d="M0 100V30C233 80 767 80 1000 30V100H0Z"/></svg>' },
	wave_layered: { label: 'Wave Layered', svg: '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" opacity="0.3" d="M1000 70V0C922 0 859.5 28.5 750 28.5C620 28.5 531.5 0 452.5 0C364.5 0 263.5 28.5 142.5 28.5C53 28.5 0 0 0 0V70H1000Z"/><path fill="currentColor" d="M1000 100V30C922 30 859.5 58.5 750 58.5C620 58.5 531.5 30 452.5 30C364.5 30 263.5 58.5 142.5 58.5C53 58.5 0 30 0 30V100H1000Z"/></svg>' }
};
