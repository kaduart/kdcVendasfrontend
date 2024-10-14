import './styles.css';

type Props = {
    text: string;
}

export default function ButtonPrimary({ text }: Props) {
    return (
        <button type='submit' className="kdc-btn kdc-btn-blue">
            {text}
        </button>
    )
}