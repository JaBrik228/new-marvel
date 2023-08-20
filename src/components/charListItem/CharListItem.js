const CharListItem = ({name, img, onClickChar, selectedCharId, id, styles}) => {
    return (
        <li style={styles} onKeyDown={(e) => e.key === 'Enter' ? onClickChar() : null} className={selectedCharId === id ? "char__item char__item_selected" : "char__item"} tabIndex={0} onClick={onClickChar}>
            <img src={img} style={img.search(/image_not_available/igm) >= 0 ? {objectFit: 'contain'} : null} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    );
}

export default CharListItem;