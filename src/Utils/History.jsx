import { useContext } from "react"
import { userContext } from "../Context/Context"
import "./history.css"

const History = () => {
    const { history, setFrameLink } = useContext(userContext);
    return (
        <div className="fixed-center history padding-md radius-1 shadow-3d">
            <h3 className="tac mb">
                History
            </h3>
            <ul className="mt">
                {
                    typeof history === "object" && history.map((item, index) => {
                        return (
                            <li key={index} className="t-dander">
                                <p>
                                    Time : <span className="t-info">{item.time}</span>
                                </p>
                                <p>
                                    Url : <span onClick={()=>setFrameLink(item.url)} className="t-warning">{item.url}</span>
                                </p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default History