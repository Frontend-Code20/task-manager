function SpinnerButton({value, spinnerId, spinner}) {
    return (
        <button type="submit" className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-3 text-white w-100 mt-3">
            <div className={`spinner-border spinner-border-sm text-white ${spinner ? '' : 'd-none'}`} id={spinnerId}>
                <span className="visually-hidden">Loading...</span>
            </div>
            <span>{value}</span>
        </button>
    )
}

export default SpinnerButton;