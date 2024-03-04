import logo from '../assets/wordle-icon.svg';
import './Landing.css';
import { useNavigate } from 'react-router-dom';

enum LandingButtonStyle {
    LIGHT,
    DARK
};

interface LandingButtonProps {
    text: string;
    buttonStyle?: LandingButtonStyle;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const LandingButton: React.FunctionComponent<LandingButtonProps> = (props: LandingButtonProps) => {
    let buttonStyle: LandingButtonStyle = props.buttonStyle === undefined ? LandingButtonStyle.LIGHT : props.buttonStyle;

    return (
        <button className='eb-garamond' onClick={props.onClick} style={{
            background: buttonStyle == LandingButtonStyle.LIGHT ? 'inherit' : '#000',
            color: buttonStyle == LandingButtonStyle.LIGHT ? '#000' : '#fff',
            width: '192px',
            border: '1px solid',
            borderRadius: '40px',
            fontSize: '18px',
            padding: '10px 48px',
            margin: '0px 12px',
            cursor: 'pointer'
        }}>{props.text}</button>
    );
}

export const Landing: React.FunctionComponent = () => {
    let navigate = useNavigate();

    return (
        <div style={{
            backgroundColor: '#dfdfdf',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <img src={logo} width={80} />
            <h1 className='eb-garamond-header' style={{
                fontSize: '48px',
                margin: '0px 0px'
            }}>Wordle</h1>
            <h2 className='eb-garamond' style={{
                fontSize: '36px',
                fontWeight: '400',
                margin: '0px, 0px',
                textAlign: 'center'
            }}>Get 6 chances to guess<br/>a 5-letter word.</h2>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <LandingButton text="How to play" />
                <LandingButton text="Log in" />
                <LandingButton text="Play" buttonStyle={LandingButtonStyle.DARK} onClick={() => { navigate('play'); }} />
            </div>
        </div>
    );
}