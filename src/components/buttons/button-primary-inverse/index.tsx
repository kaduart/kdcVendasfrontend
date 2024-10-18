import './styles.css';

type Props = {
    text: string;
}

export default function ButtonPrimaryInverse({ text }: Props) {
    return (
        <div className="kdc-btn kdc-btn-white">
            {text}
        </div>
    )
}