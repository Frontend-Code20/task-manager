
function InputField({field, id, type, placeholder}) {
    return (
        <div className="form-group mb-2">
            <label htmlFor={id} className="" aria-label={id} >{field}</label>
            <input type={type} id={id} className="form-control" placeholder={placeholder} />
        </div>
    )
}

export default InputField;