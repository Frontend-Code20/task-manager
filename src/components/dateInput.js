
function DateInput({label, id}) {
    return (
        <div className="">
            <label htmlFor={id} >{label}</label>
            <input type="date" className="form-control" id={id} />
        </div>
    )
}

export default DateInput;