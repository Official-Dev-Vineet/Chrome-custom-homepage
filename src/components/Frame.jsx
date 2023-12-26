import { useContext, useRef } from "react"
import { userContext } from "../Context/Context"
import "./frame.css"

const Frame = () => {
    const { frameLink, setFrameLink, setHistory } = useContext(userContext)
    const searchUrl = useRef();


    const addHistory = (data) => {
        const lastHistory = localStorage.getItem("history")
        if (lastHistory) {
            const arr = JSON.parse(lastHistory)
            arr.push(data)
            localStorage.setItem("history", JSON.stringify(arr))
            setHistory(arr)
        } else {
            localStorage.setItem("history", JSON.stringify([data]))
            setHistory([data])
        }
    }

    const searchHandler = (e) => {
        e.preventDefault()
        const url = searchUrl.current.value.trim()
        const urlCurrenTimeObject = {
            url: url,
            time: new Date().toUTCString(),
        }
        url !== frameLink ? setFrameLink(url) : null;
        url !== frameLink ? localStorage.setItem("frameLink", url) : null
        addHistory(urlCurrenTimeObject)
    }
    return (
        <div className="frame-Area relative">
            <h2 className="ff-1 margin-lg tac t-primary t-p-shadow">
                IN App Browser
            </h2>
            <form onSubmit={searchHandler}>
                <input type="url" placeholder="Enter URL" pattern="https://.*" ref={searchUrl} required className="url mt mb" />
            </form>
            <div className="mt mb">
                <h3 className="ml  flex align-center justify-center">
                    You are seeing result for: <a href={frameLink} title="open link in new tab" rel="noreferrer" className="t-primary search-url pointer ml" target="_blank">{
                        localStorage.getItem("frameLink")
                    }</a>
                </h3>
            </div>
            <div className="frame-box">
                <iframe security="sandbox" referrerPolicy="no-referrer-when-downgrade" title={frameLink} loading="lazy" allowFullScreen src={frameLink ? frameLink : "https://official-dev-vineet.github.io/portfolio-new/"} className="frame" />
            </div>

        </div>
    )
}

export default Frame