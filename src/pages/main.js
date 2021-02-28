import logoStatic from '../assets/logo-static.svg';
import logoAnimated from '../assets/logo-animated.svg';
import React from 'react';
import {IMaskInput} from 'react-imask';
import * as dataGetter from '../dataGetter';
import CitySelect from '../elements/CitySelect';
import DateSelect from '../elements/DateSelect';
import MainInfo from '../elements/MainInfo';
import TimeSelect from '../elements/TimeSelect';
import Footer from '../elements/Footer';
import {writeOrder} from '../localStorage';
import SuccessMessage from '../elements/SuccessMessage';

class Main extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            order: {
                city: '',
                date: '',
                time: '',
                phone: '',
                name: ''
            },

            cities: null,
            freeDates: null,
            errors: {
                emptyDate: false,
                emptyTime: false,
                emptyPhone: false,
                emptyName: false,
            },
            success: false
        }; 

        this.dateError = <label htmlFor='date-time'>Пожалуйста, выберите дату</label>
        this.timeError = <label htmlFor='date-time'>Пожалуйста, выберите время</label>
        this.phoneError = <label htmlFor='phone'>Пожалуйста, введите корректный телефон, иначе наши специалисты не смогут связаться с вами</label>
        this.nameError =  <label htmlFor='name'>Пожалуйста, укажите имя</label>

        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);

        this.dataCheck = this.dataCheck.bind(this);
        this.removeError = this.removeError.bind(this);
    }

    componentDidMount() {
        dataGetter.getCities((result) => {
            this.setState(prevState => ({cities: result, order: {...prevState.order, city: result[0]}}));
            dataGetter.getFreeDates(result[0].id, (result) => {
                this.setState({freeDates: result});
            })
        });
        
    }

    handleChangeCity(e) {
        let options = e.target.options;
        dataGetter.getFreeDates(this.state.cities[options.selectedIndex].id, (result) => {
            this.setState({freeDates: result});
        })
        this.setState(prevState => ({order: {...prevState.order, date: '', time: '', city: this.state.cities[options.selectedIndex]}, freeDates: null}));
        e.target.blur();
    }

    handleChangeDate(e) {
        let options = e.target.options;
        this.setState(prevState => ({order: {...prevState.order, date: options[options.selectedIndex].value}}));
        e.target.blur();
    }

    handleChangeTime(e) {
        let options = e.target.options;
        this.setState(prevState => ({order: {...prevState.order, time: options[options.selectedIndex].value}}));
        e.target.blur();
    }

    handleChangePhone(value) {
        this.setState(prevState => ({order: {...prevState.order, phone: value}}));
    }

    handleChangeName(value) {
        this.setState(prevState => ({order: {...prevState.order, name: value}}));
    }

    dataCheck(e) {
        switch (e.target.id) {
            case 'date':
                if (e.target.value === '') {
                    this.setState(prevState => ({errors: {...prevState.errors, emptyDate: true}}));
                }
                break;
            case 'time':
                if (e.target.value === '') {
                    this.setState(prevState => ({errors: {...prevState.errors, emptyTime: true}}));
                }
                break;
            case 'phone':
                if (e.target.value.replaceAll(/[+()_-\s]/g, '').length < 10) {
                    this.setState(prevState => ({errors: {...prevState.errors, emptyPhone: true}}));
                }
                break;
            case 'name':
                if (e.target.value === '') {
                    this.setState(prevState => ({errors: {...prevState.errors, emptyName: true}}));
                }
                break;
        }
    }

    removeError(e) {
        switch (e.target.id) {
            case 'date':
                this.setState(prevState => ({errors: {...prevState.errors, emptyDate: false}}));
                break;
            case 'time':
                this.setState(prevState => ({errors: {...prevState.errors, emptyTime: false}}));
                break;
            case 'phone':
                this.setState(prevState => ({errors: {...prevState.errors, emptyPhone: false}}));
                break;
            case 'name':
                this.setState(prevState => ({errors: {...prevState.errors, emptyName: false}}));
                break;
        }
    }

    checkBtn() {
        let errors = this.state.errors;
        let order = this.state.order;
        return (
            errors.emptyDate || errors.emptyTime || errors.emptyPhone || errors.emptyName || 
            (order.time === '') || (order.phone.length < 10) || (order.name === '')
        )
    }

    btnOnClick() {
        writeOrder({
            cityName: this.state.order.city.name,
            date: this.state.order.time,
            name: this.state.order.name,
            phone: this.state.order.phone
        });
        this.setState({success: true});
    }

    hideSuccess() {
        this.setState({
            order: {
                city: '',
                date: '',
                time: '',
                phone: '',
                name: ''
            },

            cities: null,
            freeDates: null,
            errors: {
                emptyDate: false,
                emptyTime: false,
                emptyPhone: false,
                emptyName: false,
            },
            success: false
        });

        this.componentDidMount();
    }

    render() {
        let loadScreen;
        if(this.state.freeDates === null) {
            loadScreen = <div id='load-screen'/>;
        } else {
            loadScreen = null;
        }

        return(
            <div>
                <img src={this.state.freeDates === null ? logoAnimated : logoStatic} id="logo" alt="logo"/>
                
                <h1>Онлайн запись</h1>

                <div id='order-form'> 
                    {loadScreen}

                    <CitySelect defaultCity={this.state.order.city} cities={this.state.cities} onChange={this.handleChangeCity}/>   
                            
                    <MainInfo cityInfo={this.state.order.city} />

                    <div id="date-time">
                        <DateSelect id='date' 
                            value={this.state.order.date}
                            allValues={this.state.freeDates}
                            error={this.state.errors.emptyDate} 
                            empty={this.state.order.date === ''}
                            onChange={this.handleChangeDate}
                            onBlur={this.dataCheck}
                            onFocus={this.removeError}/>

                        <TimeSelect id='time' 
                            value={this.state.order.time}
                            allValues={this.state.order.date !== '' ? this.state.freeDates[this.state.order.date] : null}
                            error={this.state.errors.emptyTime} 
                            empty={this.state.order.time === ''}
                            onChange={this.handleChangeTime}
                            onBlur={this.dataCheck}
                            onFocus={this.removeError}/>
                    </div>

                    {this.state.errors.emptyDate ? this.dateError : null}
                    {this.state.errors.emptyTime ? this.timeError : null}

                    <IMaskInput id='phone' className={this.state.errors.emptyPhone ? 'invalid' : null}
                        mask='+7(000) 000-00-00'
                        value={this.state.order.phone}
                        unmask={true} 
                        lazy={false} 
                        onAccept={this.handleChangePhone} 
                        onBlur={this.dataCheck}
                        onFocus={this.removeError}
                        style={this.state.order.phone === '' ? {color: '#8b8b8b'} : {color: '#000'}} 
                        placeholder= '+7(___) ___-__-__'/>

                    {this.state.errors.emptyPhone ? this.phoneError : null}

                    <IMaskInput id='name' className={this.state.errors.emptyName ? 'invalid' : null}
                        mask={/^[А-яA-z ]+$/} 
                        value={this.state.order.name}
                        onAccept={this.handleChangeName} 
                        onBlur={this.dataCheck}
                        onFocus={this.removeError}
                        placeholder= 'Ваше имя'/>

                    {this.state.errors.emptyName ? this.nameError : null}

                    <button id="accept-btn" onClick={() => this.btnOnClick()} disabled={this.checkBtn()}>Записаться</button>
                </div>

                <SuccessMessage show={this.state.success} onClick={() => this.hideSuccess()}/>

                <Footer/>
            </div>
            
        )
    }
}

export default Main;