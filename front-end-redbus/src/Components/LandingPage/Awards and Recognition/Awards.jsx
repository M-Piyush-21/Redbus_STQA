
import React from 'react'
import Styles from './Awards.module.css'
const Awards = () => {
    return (
        <div>
            <div className = {Styles.borderSeprator}></div>
            <div className = {Styles.awardsContainer}>
                <div className = {Styles.awardHeading}>AWARDS AND RECOGNITION</div>
                <div style = {{display : "flex" , justifyContent : "space-evenly",alignItems : "center", marginTop : "40px", marginBottom : "70px"}}>
                    <div style = {{display : "flex" , flexDirection : "column" , justifyContent : "space-evenly" , height : "200px",alignItems : "center" }}>
                        <img src = "/local/placeholder.svg" alt = "" />
                        <div className = {Styles.awardsPara}>
                            Most Innovative Company
                        </div>
                    </div>
                    <div>
                        <img src = "/local/placeholder.svg" alt = "" />
                        <div className = {Styles.awardsPara}>
                            Most Trusted Brand
                        </div>
                    </div>
                    <div>
                        <img src = "/local/placeholder.svg" alt = "" />
                        <div className = {Styles.awardsPara} style = {{marginLeft : "70px"}}>
                            Mobile Innovation Award
                        </div>
                    </div>
                </div>
            </div>
            <div className = {Styles.borderSeprator}></div>
        </div>
    )
}

export default Awards
