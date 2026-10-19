// Shared validation rules for all lead / enquiry forms.
// Each validator returns an error message string, or '' when the value is valid.

export const validateName = (value) => {
    const v = value.trim();
    if (!v) return 'Please enter your full name.';
    if (v.length < 2) return 'Name must be at least 2 characters.';
    if (!/^[A-Za-z][A-Za-z\s.'-]*$/.test(v)) return 'Name can only contain letters, spaces, dots and hyphens.';
    return '';
};

// Accepts an optional +91 / 91 / 0 prefix with spaces or hyphens; requires a valid 10-digit Indian mobile number.
export const normalizePhone = (value) =>
    value.trim().replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');

export const validatePhone = (value) => {
    if (!value.trim()) return 'Please enter your mobile number.';
    if (!/^[6-9]\d{9}$/.test(normalizePhone(value))) return 'Please enter a valid 10-digit mobile number.';
    return '';
};

export const validateEmail = (value, { required = true } = {}) => {
    const v = value.trim();
    if (!v) return required ? 'Please enter your email address.' : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Please enter a valid email address.';
    return '';
};

export const validatePincode = (value) => {
    const v = value.trim();
    if (!v) return 'Please enter your pincode.';
    if (!/^[1-9]\d{5}$/.test(v)) return 'Please enter a valid 6-digit pincode.';
    return '';
};

export const validateCity = (value) => {
    const v = value.trim();
    if (!v) return 'Please enter your city.';
    if (v.length < 2 || !/^[A-Za-z][A-Za-z\s.,-]*$/.test(v)) return 'Please enter a valid city name.';
    return '';
};

export const validateRequired = (message) => (value) => (value.trim() ? '' : message);

export const validateMaxLength = (max, label = 'This field') => (value) =>
    value.trim().length > max ? `${label} must be under ${max} characters.` : '';

// Runs every rule in `rules` ({ field: validatorFn }) against `data` and returns { field: message } for failures.
export const validateAll = (data, rules) =>
    Object.keys(rules).reduce((errors, field) => {
        const error = rules[field](data[field] ?? '');
        if (error) errors[field] = error;
        return errors;
    }, {});

export const trimValues = (data) =>
    Object.fromEntries(Object.entries(data).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]));
