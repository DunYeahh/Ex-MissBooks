const { useState, useEffect } = React

export function LongTxt({ txt, length }) {

    const [isShowFull, setIsShowFull] = useState(false)
    const [txtToShow, setTxtToShow] = useState('')

    useEffect (() => {
        if (!txt) return
        setTxtToShow(isShowFull ? txt : txt.substring(0, length)) 
    },[isShowFull])

    function onToggleShowMore() {
        setIsShowFull(isShowFull => !isShowFull)
    }

    return (
        <article className="description-container">
            {txtToShow}
            {txt && txt.length > length && 
            <button onClick={() => onToggleShowMore()}>
                {isShowFull ? 'Show less..' : 'Show more..'}
            </button>}
        </article>
    )
}