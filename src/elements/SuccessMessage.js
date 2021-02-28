export default function SuccessMessage(props) {
    if (props.show) {
        return(
            <div id="success-wrap">
                <div id="success">
                    <h1>Ваша заявка отправлена, скора наши специалисты свяжутся с вами</h1>
                    <button id="success-btn" onClick={props.onClick}>Понятно</button>
                </div>
            </div>
        )
    }

    return(null);
    
}