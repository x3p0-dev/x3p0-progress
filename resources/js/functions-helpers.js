import {
	getColorObjectByAttributeValues,
	getColorObjectByColorValue,
	getGradientSlugByValue,
	getGradientValueBySlug
} from '@wordpress/block-editor';

export function formatColorValue( value, colors )
{
	const colorObject = getColorObjectByColorValue( colors, value );

	return undefined == colorObject ? value : `var:preset|color|${ colorObject.slug }`;
};

export function getColorSlug( color )
{
	return color && color.startsWith( 'var:preset|color|' )
	       ? color.replace( 'var:preset|color|', '' )
	       : null;
};

export function getColorSettingValue( color, colors )
{
	const slug = getColorSlug( color );

	return slug ? getColorObjectByAttributeValues( colors, slug, color ).color : color;
};

export function getColorStyle( color )
{
	const slug = getColorSlug( color );

	return slug ? `var(--wp--preset--color--${ slug })`: color;
};

export function formatGradientValue( value, gradients )
{
	const slug = getGradientSlugByValue( gradients, value );

	return slug ? `var:preset|gradient|${ slug }` : value;
};

export function getGradientSlug( gradient )
{
	return gradient && gradient.startsWith( 'var:preset|gradient|' )
	       ? gradient.replace( 'var:preset|gradient|', '' )
	       : null;
};

export function getGradientSettingValue( gradient, gradients )
{
	const slug = getGradientSlug( gradient );

	if ( slug ) {
		const value = getGradientValueBySlug( gradients, slug );

		return undefined === value ? gradient : value;
	}

	return gradient;
};

export function getGradientStyle( gradient )
{
	const slug = getGradientSlug( gradient );

	return slug ? `var(--wp--preset--gradient--${ slug })` : gradient;
};
