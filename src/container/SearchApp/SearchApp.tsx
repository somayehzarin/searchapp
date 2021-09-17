import React, {ChangeEvent, useEffect, useState} from "react";
import '../../assets/css/main.css';
import {useDebounce} from '@react-hook/debounce'
import HistoryBox, {Item} from "../../components/HistoryBox/HistoryBox";
import SearchBox from "../../components/SearchBox/SearchBox";

const SearchApp = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useDebounce("", 700);
    const [history, setHistory] = useState<Item[]>([]);

    // fetch data
    useEffect(() => {
        if (!keyword) {
            setData([]);
            return
        }
        fetch(`/names?name_like=${keyword}`)
            .then(response => response.json())
            .then(result => {
                setData(result)
                setLoading(false)
            }).catch(error => console.log(error))
    }, [keyword])

    // OnChange input search
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        setKeyword(event.target.value)
    }

    // Choose suggestion item
    const handleClick = (item: Item) => {
        const setDate = new Date();
        item.lastSearchTime = setDate.toLocaleString();

        setHistory((prev) => ([...prev, item]));
        setKeyword("");
        setData([]);
    }

    // Clear all history
    const handleClearHistory = () => {
        setHistory([])
    }

    // Clear one item in history
    const handleRemoveItem = (item: Item) => {
        setHistory(history.filter(index => index.id !== item.id))
    }

    return (
        <div className="wrapper">
            <SearchBox onChange={handleChange} keyword={keyword} loading={loading} data={data} onClick={handleClick}/>
            <HistoryBox onClear={handleClearHistory} onItemClear={handleRemoveItem} listItems={history}/>
        </div>
    )
};

export default SearchApp;