import { useState } from 'react';
import './styles.css';

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    onSearchValue?: Function;
}

export default function Search({ onSearchValue }: Props) {

    const [newSearch, setNewSearch] = useState();

    function handleSearch(event: any) {
        const searchValue = event.target.value;
        setNewSearch(searchValue)

        if (onSearchValue)
            onSearchValue(searchValue);

    }

    return (
        <form className="kdc-search-bar">
            <button type="submit">🔎︎</button>
            <input onChange={handleSearch}
                type="text" placeholder="Nome do produto" />
            <button type="reset">🗙</button>
        </form>
    )
}
