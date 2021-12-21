import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

const Order = () => {
    const [data, setdata] = useState([]);

    const orderdata = async () => {
        const data = await fetch("/ten", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const real = await data.json();
        console.log(real.payment);
        setdata(real.payment)

    }

    console.log(data)
    useEffect(() => {
        orderdata();
    }, [])



    const deletedata = async (e) => {
        console.log(e);
        const sdelete = await fetch("/mango", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ e })
        })
        const orgd = await sdelete.json()
        console.log(orgd);

        if (sdelete.status === 201) {
            window.alert("deleted data")
            orderdata();
        }

    }

    return (
        <>
            <div className="realrow">
                {
                    data.length === 0 ? <h1 className="mariz">plzz order now</h1> : data.map((val) => {
                        return (
                            <div className="filitexy ">
                                <div class="row g-0 bg-light position-relative">
                                    <div class="col-md-5 mb-md-0 p-md-4">
                                        <img src={val.tr} class="w-100" alt="..." />
                                    </div>
                                    <div class="col-md-7 p-4 ps-md-0 align-self-center">
                                        <div class="mb-3 row">
                                            <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
                                            <div class="col-sm-10">
                                                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={val.name} />
                                            </div>
                                        </div>
                                        <div class="mb-3 row">
                                            <label for="staticEmail" class="col-sm-2 col-form-label">phone</label>
                                            <div class="col-sm-10">
                                                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={val.phone} />
                                            </div>
                                        </div>
                                        <Link to={{
                                            pathname: '/dorder',
                                            state: (val._id)
                                        }} class="btn btn-info mx-3 ">Update</Link>
                                        <button type="button" onClick={() => deletedata(val._id)} class="btn btn-info ">Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}
export default Order;