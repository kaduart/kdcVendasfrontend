export default function FormTextArea(props: any) {

    const {
        validation,
        invalid = 'false',
        dirty = 'false',
        onTurnDirty,
        ...textAreaProps } = props;

    function handleBlur() {
        onTurnDirty(props.name)
    }

    return (
        <input
            {...textAreaProps}
            onBlur={handleBlur}
            data-invalid={invalid}
            data-dirty={dirty}
        />
    );

}