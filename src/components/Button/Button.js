import "./Button.css";

const Button = ({onClick, text}) => (
    <button className="Button" onClick={onClick}>{text}</button>
)

export default Button;