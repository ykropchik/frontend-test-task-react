export default function MainInfo(props) {
    if(props.cityInfo === '') {
        return(
            <div className="info">
                <span id="address"></span>
                <span id="phones"></span>
                <span id="price"></span>
            </div>
        )
    }

    let phones;
    if(props.cityInfo.phones) {
        phones = <span id="phones">
                    {props.cityInfo.phones.map(phone => {
                        let phoneMask = IMask.createMask({
                            mask: '+7(000)000-00-00'
                        });

                        return(
                            <a href={'tel:'+phone} key={phone}>{phoneMask.resolve(phone)} </a>
                        )
                    })}
                </span>
    } else {
        phones = <span id="phones"></span>
    }
    return(
            <div className="info">
                <span id="address">{props.cityInfo.address}</span>
                {phones}
                <span>Стоимость услуги <span id="price">{props.cityInfo.price}</span> ₽</span>
            </div>
    )
    
}