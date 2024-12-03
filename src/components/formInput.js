
function FormInput({text, id, error}) {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label visually-hidden">{text}</label>
            <input className="form-control" id={id} placeholder={text} required/>
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    )
}

export default FormInput;