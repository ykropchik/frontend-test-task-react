export default function DateSelect(props) {

    if(props.allValues === null) {
        return(
            <select id={props.id}
                style={props.empty ? {color: '#8b8b8b'} : {color: '#000'}}>
                <option value='' key='' disabled>Дата</option>
                </select>
        )
    }

    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    
    return(
        <select id={props.id} className={props.error ? 'invalid' : null}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            style={props.empty ? {color: '#8b8b8b'} : {color: '#000'}}>
                <option value='' key='' disabled>Дата</option>
                {
                    Object.keys(props.allValues).map((dateStr) => {
                        let date = new Date(dateStr.split('-'));
                        return (
                        <option
                            key={dateStr}
                            value={dateStr}>
                                {`${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`}
                        </option>
                        );
                    })
                }
        </select>
    )
}