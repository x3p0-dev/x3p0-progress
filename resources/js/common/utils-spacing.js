

export const getGapStyle = ( attributes ) => {
	const gap = attributes?.style?.spacing?.blockGap;

	if ( ! gap || 'string' !== typeof gap ) {
		return undefined;
	}

	return gap.startsWith( 'var:preset|spacing|')
	       ? `var(--wp--preset--spacing--${ gap.replace( 'var:preset|spacing|', '' ) })`
	       : gap;
};
