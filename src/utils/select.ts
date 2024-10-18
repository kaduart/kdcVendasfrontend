export const selectStyles = {
    control: (provided: any) => ({
        ...provided,
        border: "none",
        boxShadow: "none",
        "&:hover": "none",
    }),
    placeholder: (provided: any) => {
        return {
            ...provided,
            color: "var(--kdc-color-font-placeholder)",
            fontSize: 16
        }
    },
    indicatorSeparator: (provided: any) => {
        return {
            ...provided,
            display: "none"
        }
    }
}