import { useState } from 'react';
import './styles.css';

type Props = {
    text: string;
    onClickEvent: Function;
}

export default function ButtonNextPage({ text, onClickEvent }: Props) {


    const [page, setPage] = useState<number>(0);

    function handleClick(event: any) {

        event.preventDefault();
      
        const nextPage = page + 1;
        setPage(nextPage);

        if (onClickEvent) {
            onClickEvent(nextPage)
        }
    }

    return (
        <input className="kdc-btn-next-page"
            onClick={handleClick}
            type="button"
            value={text}
            name={text}
        />
    )
}