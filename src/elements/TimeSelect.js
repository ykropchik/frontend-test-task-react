export default function TimeSelect(props) {   
    if (props.allValues === null) {
        return(
            <select id="time"
                value=''
                style={{color: '#8b8b8b'}}
                disabled={true}>
                    <option value='' key='' disabled>Время</option>
            </select>
        )
    }

    return(
        <select id="time" className={props.error ? 'invalid' : null}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            style={props.empty ? {color: '#8b8b8b'} : {color: '#000'}}>
                <option value='' key='' disabled>Время</option>
                {props.allValues.map((time) => {
                    return (
                    <option
                        key={time.date}
                        value={time.date}>
                            {`${time.begin}-${time.end}`}
                    </option>
                    );
                })}
        </select>
    )
}