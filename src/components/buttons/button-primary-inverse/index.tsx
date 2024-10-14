import { Link } from 'react-router-dom';
import './styles.css';

type Props = {
    text: string;
}

export default function ButtonPrimaryInverse({ text }: Props) {
    return (
        <Link to="/">
            <div className="kdc-btn kdc-btn-white">
                {text}
            </div>
        </Link>
    )
}