import React from 'react'
import "./checkbox.css"

const checkbox = ({value}) => {
    return (
        /* From Uiverse.io by mnikita7767 */
        <section className="container">
            <label>
                <input type="checkbox" name="check" />
                <span></span>
                <p className='uppercase'>{value}</p>
            </label>
        </section>

    )
}

export default checkbox