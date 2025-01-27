
// View task card component
function ViewTaskCard({title, text}){
    return (
        <div className="card">
            <div className="card-header">{title}</div>
            <div className="card-body ps-3 pt-2 pb-2"><h5 className="card-title">{text}</h5></div>
        </div>
    )
}

export default ViewTaskCard;