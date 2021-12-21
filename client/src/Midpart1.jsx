import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import Slider from './Api';

const Midpart1 = () => {
    const [data, setdata] = useState(false)
    const history = useHistory()
    const [hr, sethr] = useState({ name: "", phone: "" })
    const [tr, settr] = useState("");

    const photo = (e) => {
        console.log("this is ", e);
        setdata(e);
        const data = Slider.find((vak) => {
            return vak.id === e;
        })
        console.log(data.cover);
        settr(data.cover);

    }

    const frist = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        sethr({ ...hr, [name]: value })
        console.log(hr.name, hr.phone)

    }

    const finalfrst = async (e) => {
        e.preventDefault();
        const { name, phone } = hr;
        const data = await fetch("/four", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, phone, tr })
        })

        const org = await data.json();
        console.log(org);

        if (data.status === 201) {
            history.push("/order")
        } else if (data.status === 404) {
            window.alert("invalid data")
        } else if (data.status === 401) {
            window.alert("plzz register")
        }
    }

    return (
        <>
            <form method="POST">
                <div className="row my-2">

                    {
                        Slider.map((val) => {
                            return (
                                <div className="col-md-6 text-center">
                                    <img onClick={() => photo(val.id)} src={val.cover} className="w-50  py-3 mb-5" alt="" />
                                    <div className=" mb-3 " style={{ display: data === (val.id) ? "" : "none" }}>
                                        <div className="mb-3 row">
                                            <label for="inputPassword" className="col-sm-2 col-form-label">Name</label>
                                            <div className="col-sm-10">
                                                <input type="text" name="name" onChange={frist} value={hr.name} className="form-control w-75 mx-2" id="inputPassword" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label for="inputPassword" className="col-sm-2 col-form-label">Phone</label>
                                            <div className="col-sm-10">
                                                <input type="number" name="phone" onChange={frist} value={hr.phone} className="form-control w-75 mb-3 mx-2" id="inputPassword" />
                                            </div>
                                            <button type="button" onClick={finalfrst} className="btn btn-info w-25 mx-3 mb-5 mx-2">Submit</button>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }


                </div>
            </form>



        </>


    )
}
export default Midpart1;