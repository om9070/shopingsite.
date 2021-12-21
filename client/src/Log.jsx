import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

const Log = () => {
    const history = useHistory();
    const [tr, settr] = useState({ name: "", email: "", mobile: "", profile: "", password: "", cpassword: "" });
    const [gt, setgt] = useState({ email: "", password: "" })
    const register = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        settr({ ...tr, [name]: value })
        console.log(tr.name, tr.email, tr.mobile, tr.password);

    }
    const registerpic = (event) => {
        settr({ ...tr, profile: event.target.files[0] })
        console.log(event.target.files[0])
    }

    const finalreg = async (e) => {
        e.preventDefault();

        try {
            let res = new FormData();
            res.append("name", tr.name)
            res.append("email", tr.email)
            res.append("mobile", tr.mobile)
            res.append("profile", tr.profile)
            res.append("password", tr.password)
            res.append("cpassword", tr.cpassword)

            const data = await fetch("/register", {
                method: "POST",
                body: res
            })
            const vas = await data.json();
            console.log(vas);

            if (data.status === 201) {
                window.alert("regiter succes! plzz log in")
            } else if (data.status === 422) {
                window.alert("value missing")
            }
            settr({ name: "", email: "", mobile: "", profile: "", password: "", cpassword: "" })

        } catch (e) {
            console.log("worng part1", e);
        }

    }





    const login = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setgt({ ...gt, [name]: value })

    }

    const finallog = async (e) => {
        const { email, password } = gt;
        e.preventDefault();
        const res = await fetch("/logdata", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json();
        console.log(data);

        if (res.status === 200) {
            history.push("/")
        } else if (res.status === 422) {
            window.alert("input data worng")
        } else if (res.status === 400) {
            window.alert("plzz register")
        }

    }
    return (
        <>
            <div className="jaiter">

                <div className="row fighter my-5 babu d-flex flex-row justify-content-start align-items-center">
                    <div className="col-md-7 ">
                        <form enctype="multipart/form-data" method="POST">
                            <div className="mb-3 col-md-8 mx-3">
                                <label for="exampleFormControlInput1" className="form-label">Name:</label>
                                <input name="name" value={tr.name} onChange={register} type="text" className="form-control" id="exampleFormControlInput1" placeholder="enter your name" />
                            </div>

                            <div className="mb-3 col-md-8 mx-3">
                                <label for="exampleFormControlInput1" className="form-label">Email:</label>
                                <input name="email" value={tr.email} onChange={register} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>

                            <div className="mb-3 col-md-8 mx-3">
                                <label for="exampleFormControlInput1" className="form-label">Mobile</label>
                                <input name="mobile" value={tr.mobile} onChange={register} type="number" className="form-control" id="exampleFormControlInput1" placeholder="000_0000_000" />
                            </div>

                            <div className="mb-3 col-md-8 mx-3">
                                <label for="exampleFormControlInput1" className="form-label">Profile-pic</label>
                                <input name="profile" onChange={registerpic} type="file" className="form-control" id="exampleFormControlInput1" />
                            </div>

                            <div className="mb-3 col-md-8 mx-3" >
                                <label for="exampleFormControlInput1" className="form-label">Password</label>
                                <input name="password" value={tr.password} onChange={register} type="password" className="form-control" id="exampleFormControlInput1" placeholder="enter your password" />
                            </div>

                            <div className="mb-3 col-md-8 mx-3">
                                <label for="exampleFormControlInput1" className="form-label">C-password</label>
                                <input name="cpassword" value={tr.cpassword} onChange={register} type="password" className="form-control" id="exampleFormControlInput1" placeholder="enter your c-password" />
                            </div>

                            <button type="button" onClick={finalreg} class="btn btn-info mx-3">Submit</button>
                        </form>
                    </div>

                    <div className="col-md-5">
                        <form method="POST">
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Email address</label>
                                <input type="email" name="email" value={gt.email} onChange={login} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Password</label>
                                <input type="password" name="password" onChange={login} value={gt.password} className="form-control" id="exampleFormControlInput1" placeholder="Enter your password" />
                            </div>
                            <button type="button" onClick={finallog} class="btn btn-info ">Log-In</button>
                        </form>
                    </div>
                </div>


            </div>
        </>
    )
}
export default Log;