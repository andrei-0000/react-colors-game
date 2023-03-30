function ColorButton({item, id, handleClick}){
    const activeStatus = item.status ? "active" : "";
    return (
        <div className={"colorbutton" + activeStatus} style={{backgroundColor: item.color}} onClick={() => handleClick(id)}>
        </div>
    )
}

export default ColorButton;