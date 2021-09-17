import React, {ChangeEvent, FC} from "react";

type SearchBoxProps = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    keyword: string,
    loading: boolean,
    data: string[],
    onClick: Function
}

const SearchBox: FC<SearchBoxProps> = ({onChange, keyword, loading, data, onClick}) => {
    return (
        <div className="search-field--wrapper">
            <input onChange={onChange}
                   results={3}
                   placeholder="Search..."
                   className="search-field__element"
                   type="search"
            />
            {
                keyword ?
                    <div className={`search--field__autocomplete`}>
                        <ul>
                            {loading ? <div className="lds-dual-ring"/> : data.map((item: any) => (
                                <li key={item.id} onClick={() => onClick(item)}>
                                    <span>{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default SearchBox;