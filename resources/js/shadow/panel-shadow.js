/**
 * Shadow block inspector panel.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { updateShadow } from './functions-shadow';

import ShadowColorControl from './control-color';
import ShadowInsetControl from './control-inset';
import ShadowUnitControl  from './control-unit';

import { useInstanceId } from '@wordpress/compose';
import { useState }      from '@wordpress/element';
import { __ }            from '@wordpress/i18n';

import {
	__experimentalToolsPanel     as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';

const ShadowPanel = ( { shadow, setAttributes } ) => {

	const panelId = useInstanceId( ShadowPanel );

	const [ shadowInset,  setShadowInset  ] = useState();
	const [ shadowX,      setShadowX      ] = useState();
	const [ shadowY,      setShadowY      ] = useState();
	const [ shadowBlur,   setShadowBlur   ] = useState();
	const [ shadowSpread, setShadowSpread ] = useState();

	const resetShadowColor  = () => setAttributes( { shadow: { ...updateShadow( shadow, 'color'   ) } } );
	const resetShadowX      = () => setAttributes( { shadow: { ...updateShadow( shadow, 'offsetX' ) } } );
	const resetShadowY      = () => setAttributes( { shadow: { ...updateShadow( shadow, 'offsetY' ) } } );
	const resetShadowBlur   = () => setAttributes( { shadow: { ...updateShadow( shadow, 'blur'    ) } } );
	const resetShadowSpread = () => setAttributes( { shadow: { ...updateShadow( shadow, 'spread'  ) } } );
	const resetShadowInset  = () => setAttributes( { shadow: { ...updateShadow( shadow, 'inset'   ) } } );

	const resetShadow = () => {
		resetShadowColor();
		resetShadowX();
		resetShadowY();
		resetShadowBlur();
		resetShadowSpread();
		resetShadowInset();

		setShadowX( undefined );
		setShadowY( undefined );
		setShadowBlur( undefined );
		setShadowSpread( undefined );
		setShadowInset( undefined );
	};

	const shadowOffsetXControl = (
		<ShadowUnitControl
			label={ __( 'Horizontal Offset', 'x3p0-progress' ) }
			value={ `${ shadow?.offsetX }${ shadow?.offsetXUnit }` }
			onChange={ ( value ) => setAttributes( {
				shadow: { ...updateShadow( shadow, 'offsetX', parseInt( value, 10 ) ) }
			} ) }
			onUnitChange={ ( value ) => setAttributes( {
				shadow: { ...updateShadow( shadow, 'offsetXUnit', value ) }
			} ) }
		/>
	);

	const shadowOffsetYControl = (
		<ShadowUnitControl
			label={ __( 'Vertical Offset', 'x3p0-progress' ) }
			value={ `${ shadow?.offsetY }${ shadow?.offsetYUnit }` }
			onChange={ ( value ) => setAttributes( {
				shadow: { ...updateShadow( shadow, 'offsetY', parseInt( value, 10 ) ) }
			} ) }
			onUnitChange={ ( value ) => setAttributes( {
				shadow: { ...updateShadow( shadow, 'offsetYUnit', value ) }
			} ) }
		/>
	);

	const shadowBlurControl = (
		<ShadowUnitControl
			label={ __( 'Blur Radius', 'x3p0-progress' ) }
			value={ `${ shadow?.blur }${ shadow?.blurUnit }` }
			onChange={ ( value ) => setAttributes( {
				shadow: { ...updateShadow( shadow, 'blur', parseInt( value, 10 ) ) }
			} ) }
			onUnitChange={ ( value ) => setAttributes( {
				shadow: { ...updateShadow( shadow, 'blurUnit', value ) }
			} ) }
		/>
	);

	const shadowSpreadControl = (
		<ShadowUnitControl
			label={ __( 'Spread Radius', 'x3p0-progress' ) }
			value={ `${ shadow?.spread }${ shadow?.spreadUnit }` }
			onChange={ ( value ) => setAttributes( {
				shadow: { ...updateShadow( shadow, 'spread', parseInt( value, 10 ) ) }
			} ) }
			onUnitChange={ ( value ) => setAttributes( {
				shadow: { ...updateShadow( shadow, 'spreadUnit', value ) }
			} ) }
		/>
	);

	return (
		<ToolsPanel
			label={ __( 'Shadow', 'x3p0-progress' ) }
			resetAll={ resetShadow }
			panelId={ panelId }
			className="wp-block-x3p0-progress-panel__shadow"
		>
			<ShadowColorControl
				panelId={ panelId }
				shadow={ shadow }
				setAttributes={ setAttributes }
				style={ { gridColum: "span 2" } }
			/>
			<ToolsPanelItem
				label={ __( 'Horizontal Offset', 'x3p0-progress' ) }
				hasValue={ () => !! shadowX || !! shadow?.offsetX }
				onDeselect={ () => resetShadowX() }
				panelId={ panelId }
				style={ { gridColumn: "span 1" } }
			>
				{ shadowOffsetXControl }
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ __( 'Vertical Offset', 'x3p0-progress' ) }
				hasValue={ () => !! shadowY || !! shadow?.offsetY }
				onDeselect={ () => resetShadowY() }
				panelId={ panelId }
				style={ { gridColumn: "span 1" } }
			>
				{ shadowOffsetYControl }
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ __( 'Blur Radius', 'x3p0-progress' ) }
				hasValue={ () => !! shadowBlur || !! shadow?.blur }
				onDeselect={ () => resetShadowBlur() }
				panelId={ panelId }
				style={ { gridColumn: "span 1" } }
			>
				{ shadowBlurControl }
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ __( 'Spread Radius', 'x3p0-progress' ) }
				hasValue={ () => !! shadowSpread || !! shadow?.spread }
				onDeselect={ () => resetShadowSpread() }
				panelId={ panelId }
				style={ { gridColumn: "span 1" } }
			>
				{ shadowSpreadControl }
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ __( 'Position', 'x3p0-progress' ) }
				hasValue={ () => !! shadowInset || !! shadow?.inset }
				onDeselect={ () => resetShadowInset() }
				panelId={ panelId }
				style={ { gridColumn: "span 2" } }
			>
				<ShadowInsetControl
					shadow={ shadow }
					setAttributes={ setAttributes }
				/>
			</ToolsPanelItem>
		</ToolsPanel>
	);
};

export default ShadowPanel;
