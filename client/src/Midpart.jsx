import React from 'react'
import Midpart1 from './Midpart1';

const Midpart = () => {
    return (
        <>


            <div className="container service">
                <div className="row">
                    <div className="photo col-md-5 my-2 col-xl-5">
                        <img src="./img/bg4.jpg" className="w-75 mx-auto " alt="" />
                    </div>
                    <div className="col-md-7 align-self-center">
                        <h1 className="welcome">welcome to E-commerce</h1>
                        <p >there are many collection you can cheak <br /> and buy anything :smile😄</p>

                    </div>
                </div>


            </div>

            <Midpart1 />

        </>
    )
}
export default Midpart;