const { useState } = React

export function LongTxt({ txt, length = 100} ) {
    const [isExpanded, setIsExpanded] = useState(false)
    
    const isLong = txt.length > length
    let displayTxt= ""

    if(isExpanded || !isLong ){
        displayTxt = txt
    }
    else{
       displayTxt = txt.slice(0, length) +"..."
    }

    function isReadMore() {
        if(isExpanded) return "Read less"
        else return "Read more"
    }


    return(
        <div className="long-txt">
            <p>{displayTxt}</p>
            {isLong && (
                <button onClick={()=> setIsExpanded(!isExpanded)}>{isReadMore()}</button>
            )}
        </div>

    )
} 