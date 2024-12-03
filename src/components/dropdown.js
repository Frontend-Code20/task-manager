
function Dropdown({ btnText, items, id }) {

    const dropdownItems = items.map((value, idx) => {
        return (
            <option className="dropdown-item" key={btnText + idx}>{value}</option>
        )
    })

    return (
        <>
            <label htmlFor={id} >{btnText}</label>
            <select className="form-select" id={id}>
                <option>{btnText}</option>
                {dropdownItems}
            </select>
        </>
    )
}

export default Dropdown;