import { React, useEffect, useState } from 'react'
import { Link } from "react-router-dom"


const Register = () => {
    const [pr, setpr] = useState([]);



    const getdata = async () => {
        const res = await fetch("/seven", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const pdata = await res.json();
        console.log(pdata);

        setpr([pdata]);
    }


    useEffect(() => {
        getdata();
    }, [])




    return (
        <>
            {
                <div className="container">
                    <div className="filite ">
                        {
                            pr.length == 0 ? <h1 className="realrow">plzz go to registration</h1> : pr.map((val, id) => {
                                return (
                                    <>
                                        <div className="row" key={id}>
                                            <div className=" col-md-7">
                                                <div class="mb-3 row">
                                                    <label for="staticEmail" className="col-sm-2 col-form-label">Name:</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" readonly className="form-control-plaintext" id="staticEmail" value={val.name} />
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="mb-3 row">
                                                    <label for="staticEmail" className="col-sm-2 col-form-label">Phone:</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" readonly className="form-control-plaintext" id="staticEmail" value={val.mobile} />
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="mb-3 row">
                                                    <label for="staticEmail" className="col-sm-2 col-form-label">Email:</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" readonly className="form-control-plaintext" id="staticEmail" value={val.email} />
                                                    </div>
                                                </div>
                                                <hr />

                                            </div>
                                            <div className=" col-md-5">
                                                <img src={val.profile} className="d-block w-100" alt="..." />
                                            </div>
                                            <Link to={{ pathname: "/update" }} type="button" className="btn my-3 btn-info w-25 mx-3">Update</Link>

                                        </div>
                                    </>
                                )
                            })

                        }



                    </div>


                </div>
            }
        </>
    )
}
export default Register;