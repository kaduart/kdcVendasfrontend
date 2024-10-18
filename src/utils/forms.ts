export function update(inputs: any, name: string, newValue: any) {
    return { ...inputs, [name]: { ...inputs[name], value: newValue } }
}

export function toValues(inputs: any) {

    const data: any = {};

    Object.values(inputs).forEach((input: any) => {
        data[input.name] = input.value;
    });

    return data;
}

export function updateAll(inputs: any, newValue: any) {
    const newInputs: any = {};

    for (const name in inputs) {
        newInputs[name] = { ...inputs[name], value: newValue[name] };
    }

    return newInputs;
}

export function validate(inputs: any, name: string) {

    if (!inputs[name]?.validation) {
        return inputs;
    }

    const isInvalid = !inputs[name].validation(inputs[name].value);

    return { ...inputs, [name]: { ...inputs[name], invalid: isInvalid.toString() } };
}

export function toDirty(inputs: any, name: string) {
    return { ...inputs, [name]: { ...inputs[name], dirty: "true" } };

}

export function updateAndValidate(inputs: any, name: string, newValue: any) {
    const dataUpdated = update(inputs, name, newValue);

    return validate(dataUpdated, name);
}

export function toDirtyAndValidate(inputs: any, name: string) {
    const newFormData = toDirty(inputs, name);

    return validate(newFormData, name);
}

export function toDirtyAll(inputs: any) {
    const dirty: any = {};

    for (const name in inputs) {
        dirty[name] = { ...inputs[name], dirty: "true" };
    }

    return dirty;

}

export function validateAll(inputs: any) {
    const dataUpdated: any = {};

    for (const name in inputs) {

        if (inputs[name].validation) {

            const isInvalid = !inputs[name].validation(inputs[name].value);
            dataUpdated[name] = { ...inputs[name], invalid: String(isInvalid) };
        } else {
            dataUpdated[name] = inputs[name];
        }

    }

    return dataUpdated;

}

export function dirtyAndValidateAll(inputs: any) {
    return validateAll(toDirtyAll(inputs));
}
export function hasAnyInvalid(inputs: any) {

    for (const name in inputs) {

        if (inputs[name].invalid === "true" && inputs[name].dirty === "true") {
            return true;
        }

    }

    return false;
}

export function setBackendErrors(inputs: any, errors: any[]) {
    const newInputs: any = { ...inputs };

    for (const error of errors) {
        const fieldName = error.fieldName;

        newInputs[fieldName].message = error.message;
        newInputs[fieldName].invalid = "true";
        newInputs[fieldName].dirty = "true";
    }

    return newInputs;
}