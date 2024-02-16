import React from 'react'
import Layout from '../../components/Layout/Layout'

const Yourorders = () => {
    return (
        <Layout>
            <div style={{ display: 'flex', justifyContent: 'center',margin:"30px"}}>
                <table style={{ width: "900px" ,borderSpacing:"0",borderCollapse:"separate",borderRadius:"15px",border:"1px solid rgb(223, 223, 223)"}}>
                    <thead>
                        <tr >
                            <th style={{fontSize:"small",height:"70px",borderTopLeftRadius: "15px",fontFamily: "Rubik", fontWeight: "400", backgroundColor: "rgb(238, 238, 238)"  }}>ORDER PLACED<br/>17 Feb 2024</th>
                            <th style={{fontSize:"small",fontFamily: "Rubik", fontWeight: "400",backgroundColor: "rgb(238, 238, 238)"  }}>SHIP TO<br/>Bezelel b</th>
                            <th style={{fontSize:"small",fontFamily: "Rubik", fontWeight: "400",backgroundColor: "rgb(238, 238, 238)"  }}>BILLED TO<br/>Bezelel b</th>
                            <th style={{fontSize:"small",fontFamily: "Rubik", fontWeight: "400" ,backgroundColor: "rgb(238, 238, 238)" }}>TOTAL AMOUNT<br/>2990.00</th>
                            <th style={{fontSize:"small",borderTopRightRadius:"15px",fontFamily: "Rubik", fontWeight: "400",backgroundColor: "rgb(238, 238, 238)"  }}>ORDER# 405721906 </th>
                        </tr>
                    </thead>
                    <tbody>
                        <td >Image</td>
                        <td>Model</td>
                        <td></td>
                        <td></td>
                        <td>track</td>
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Yourorders