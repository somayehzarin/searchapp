import React, {FC} from "react";

type HistoryBoxProps = {
    onClear: () => void,
    onItemClear: Function,
    listItems: Item[]
}

export type Item = {
    id: number,
    name: string,
    lastSearchTime?: string
}

const HistoryBox: FC<HistoryBoxProps> = ({onItemClear, onClear, listItems}) => {
    return (
        <div className="search--history">
            <div className="search--history__header">
                <h3 className="history--title">Search History</h3>
                <button className="history--cleaner" onClick={onClear}>Clear Search History</button>
            </div>
            <ul className={"search--history__items"}>
                {listItems.map((item) => (
                    <li key={item.id} className="history--items">
                        <span>{item.name}</span>
                        <div>
                            <time dateTime="2021-05-06"
                                  className="history--items-date">{item.lastSearchTime}</time>
                            <button className="history--items-clear" onClick={() => onItemClear(item)}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HistoryBox;