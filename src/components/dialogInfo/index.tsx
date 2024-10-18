import './styles.css';
import ButtonPrimary from "../buttons/button-primary";

type Props = {
    message: string;
    onDialogClose: Function
}
export default function DialogInfo({ message, onDialogClose }: Props) {

    return (

        <div className="kdc-dialog" onClick={() => onDialogClose()} >
            //proibe de fechar o modal
            <div className="kdc-dialog-box" onClick={(event) => event?.stopPropagation()} >
                <h2>{message}</h2>
                <div onClick={() => onDialogClose()} className="kdc-dialog-btn-container">
                    <ButtonPrimary text="Ok" />
                </div>
            </div>
        </div>

    );
}