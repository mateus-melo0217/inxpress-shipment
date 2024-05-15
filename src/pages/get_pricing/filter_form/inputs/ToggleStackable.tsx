import ToggleButton from 'components/forms/ToggleButton';

type PropTypes = {
    index: number;
	exWrapperCls?: string;
	exContentCls?: string;
	exLabelCls?: string;
};

export default function ToggleStackable({ index, exWrapperCls, exContentCls, exLabelCls }: PropTypes) {
	return (
		<ToggleButton
			id={`${index >= 0 ? `load_item.${index}.is_stackable` : "default_is_stackable"}`}
			label='Stackable'
			className={exWrapperCls}
			exContentCls={exContentCls}
			exLabelCls={exLabelCls}
		/>
	);
}
