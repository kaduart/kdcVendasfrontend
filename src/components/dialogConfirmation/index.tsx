import './styles.css';
import ButtonPrimary from "../buttons/button-primary";
import ButtonPrimaryInverse from '../buttons/button-primary-inverse';

type Props = {
    id: number;
    message: string;
    onDialogAnswer: Function;
}
export default function DialogConfirmation({ id, message, onDialogAnswer }: Props) {

    return (

        <div className="kdc-dialog" onClick={() => onDialogAnswer(false, id)} >
            //proibe de fechar o modal
            <div className="kdc-dialog-box" onClick={(event) => event?.stopPropagation()} >
                <h2>{message}</h2>
                <div onClick={() => onDialogAnswer(false, id)} className="kdc-dialog-btn-container">
                    <div onClick={() => onDialogAnswer(false, id)}>
                        <ButtonPrimaryInverse text="Nao" />
                    </div>
                    <div onClick={() => onDialogAnswer(true, id)}>
                        <ButtonPrimary text="Sim" />
                    </div>
                </div>
            </div>
        </div>

    );
}