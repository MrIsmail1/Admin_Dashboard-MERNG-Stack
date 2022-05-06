export default function PropositionFormValidation(values) {
    let errors = {};
    if (!values.body) {
        errors.body="Ce champ est obligatoire"
    }
    return errors;
}
