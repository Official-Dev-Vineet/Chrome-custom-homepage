import PropTypes from 'prop-types'
import { useContext } from 'react'
import { userContext } from '../Context/Context'

const Settings = ({ isShow }) => {
    const { accentColor, setAccentColor, currentTheme, setCurrentTheme } = useContext(userContext)
    const accentColorSaver = (value) => {
        localStorage.setItem("accentColor", value)
        setAccentColor(value)
    }
    return (
        <aside className={`user-control shadow-3d tac padding-md flex gap-sm  flex-col transition radius-1 ${isShow && "show"
            }`}>

            <div className="wrapper">
                <h2 className="ff-1 mb tac">Settings</h2>
                <ul>
                    <li>
                        Theme Adjust
                        <ol>
                            <li className='t-warning mt flex'>
                                <span className='mr-auto'> Accent color</span>
                                <input type="color" value={accentColor} onChange={e => accentColorSaver(e.target.value)} />
                            </li>
                            <li className='t-warning mt flex'>
                                <span className='mr-auto'>Change Theme</span>
                                <select value={currentTheme} onChange={e => setCurrentTheme(e.target.value)}>
                                    <option value="dark">Dark</option>
                                    <option value="light">Light</option>
                                </select>
                            </li>
                        </ol>
                    </li>
                </ul>
            </div>

        </aside>
    )
}

export default Settings
Settings.propTypes = {
    isShow: PropTypes.bool
}