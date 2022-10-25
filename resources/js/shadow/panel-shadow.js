/**
 * Shadow block inspector panel.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { setShadow, unsetShadow } from './functions-shadow';

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

	const [ insetItem,   setInsetItem   ] = useState();
	const [ offsetXItem, setOffsetXItem ] = useState();
	const [ offsetYItem, setOffsetYItem ] = useState();
	const [ blurItem,    setBlurItem    ] = useState();
	const [ spreadItem,  setSpreadItem  ] = useState();

	const resetShadowX      = () => setAttributes( { shadow: setShadow( shadow, 'offsetX' ) } );
	const resetShadowY      = () => setAttributes( { shadow: setShadow( shadow, 'offsetY' ) } );
	const resetShadowBlur   = () => setAttributes( { shadow: setShadow( shadow, 'blur'    ) } );
	const resetShadowSpread = () => setAttributes( { shadow: setShadow( shadow, 'spread'  ) } );
	const resetShadowInset  = () => setAttributes( { shadow: setShadow( shadow, 'inset'   ) } );

	const resetShadow = () => {
		setAttributes( { shadow: unsetShadow() } );
		setOffsetXItem( undefined );
		setOffsetYItem( undefined );
		setBlurItem( undefined );
		setSpreadItem( undefined );
		setInsetItem( undefined );
	};

	const shadowOffsetXControl = (
		<ShadowUnitControl
			label={ __( 'Horizontal Offset', 'x3p0-progress' ) }
			value={ shadow?.offsetX }
			onChange={ ( value ) => setAttributes( {
				shadow: { ...setShadow( shadow, 'offsetX', parseInt( value, 10 ) ) }
			} ) }
			onUnitChange={ ( value ) => setAttributes( {
				shadow: { ...setShadow( shadow, 'offsetXUnit', value ) }
			} ) }
		/>
	);

	const shadowOffsetYControl = (
		<ShadowUnitControl
			label={ __( 'Vertical Offset', 'x3p0-progress' ) }
			value={ `${ shadow?.offsetY }` }
			onChange={ ( value ) => setAttributes( {
				shadow: setShadow( shadow, 'offsetY', parseInt( value, 10 ) )
			} ) }
			onUnitChange={ ( value ) => setAttributes( {
				shadow: setShadow( shadow, 'offsetYUnit', value )
			} ) }
		/>
	);

	const shadowBlurControl = (
		<ShadowUnitControl
			label={ __( 'Blur Radius', 'x3p0-progress' ) }
			min="0"
			value={ `${ shadow?.blur }${ shadow?.blurUnit }` }
			onChange={ ( value ) => setAttributes( {
				shadow: setShadow( shadow, 'blur', parseInt( value, 10 ) )
			} ) }
			onUnitChange={ ( value ) => setAttributes( {
				shadow: setShadow( shadow, 'blurUnit', value )
			} ) }
		/>
	);

	const shadowSpreadControl = (
		<ShadowUnitControl
			label={ __( 'Spread Radius', 'x3p0-progress' ) }
			min="-16"
			value={ `${ shadow?.spread }${ shadow?.spreadUnit }` }
			onChange={ ( value ) => setAttributes( {
				shadow: setShadow( shadow, 'spread', parseInt( value, 10 ) )
			} ) }
			onUnitChange={ ( value ) => setAttributes( {
				shadow: setShadow( shadow, 'spreadUnit', value )
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
				hasValue={ () => !! shadow?.offsetX }
				onDeselect={ () => resetShadowX() }
				panelId={ panelId }
				style={ { gridColumn: "span 2" } }
			>
				{ shadowOffsetXControl }
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ __( 'Vertical Offset', 'x3p0-progress' ) }
				hasValue={ () => !! shadow?.offsetY }
				onDeselect={ () => resetShadowY() }
				panelId={ panelId }
				style={ { gridColumn: "span 2" } }
			>
				{ shadowOffsetYControl }
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ __( 'Blur Radius', 'x3p0-progress' ) }
				hasValue={ () => !! shadow?.blur }
				onDeselect={ () => resetShadowBlur() }
				panelId={ panelId }
				style={ { gridColumn: "span 2" } }
			>
				{ shadowBlurControl }
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ __( 'Spread Radius', 'x3p0-progress' ) }
				hasValue={ () => !! shadow?.spread }
				onDeselect={ () => resetShadowSpread() }
				panelId={ panelId }
				style={ { gridColumn: "span 2" } }
			>
				{ shadowSpreadControl }
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ __( 'Position', 'x3p0-progress' ) }
				hasValue={ () => !! shadow?.inset }
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
