
function FormInput({text, id, error, name, type}) {
    return (
        <div className="mt-3">
            <label htmlFor={id} className="form-label visually-hidden">{text}</label>
            <input type={type} className="form-control" id={id} placeholder={text} name={name} required/>
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    )
}

export default FormInput;