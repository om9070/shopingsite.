import { React, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"

const Updateres = () => {
    const [data, setdata] = useState({});
    const [pr, setpr] = useState({});
    const history = useHistory();
    const [img, setimg] = useState("");


    const getdatas = async () => {
        const res = await fetch("/eight", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const pdata = await res.json();
        console.log(pdata);
        setpr(pdata)


        setdata({ ...data, name: pdata.name, phone: pdata.mobile, email: pdata.email, photo: pdata.profile })


    }

    useEffect(() => {
        getdatas();
    }, [])

    console.log(pr)
    console.log(data);

    const trigar = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setdata({ ...data, [name]: value })
    }


    const imgpic = (r) => {
        setimg(r.target.files[0]);
    }

    const updata = async (e) => {
        e.preventDefault();
        // console.log(data.name)
        const { name, email, phone } = data;
        console.log(name);
        try {
            var fmdata = new FormData();
            fmdata.append("name", name)
            fmdata.append("mobile", phone)
            fmdata.append("email", email)
            fmdata.append("profile", img)




            const data = await fetch("/frist", {
                method: "PUT",
                body: fmdata
            })
            const orgdata = await data.json();
            console.log("this is frist")
            console.log(orgdata);



            if (data.status === 201) {
                window.alert("updated data")
                history.push("/profile");
            } else {
                console.log("this is belong to worng")
                window.alert("sorry!data din't changed")
            }

        } catch (e) {
            window.alert("data din't changed")
            console.log("ites belong to new data", e)


        }
    }

    return (
        <>
            <form enctype="multipart/form-data" method="PUT">
                <div className="container">
                    <div className="filite ">

                        <div className="row">
                            <div className=" col-md-7">
                                <div class="mb-3 row">
                                    <label for="staticEmail" className="col-sm-2 col-form-label">Name:</label>
                                    <div className="col-sm-10">
                                        <input name="name" onChange={trigar} type="text" readonly className="form-control-plaintext" id="staticEmail" value={data.name} />
                                    </div>
                                </div>
                                <hr />
                                <div className="mb-3 row">
                                    <label for="staticEmail" className="col-sm-2 col-form-label">Phone:</label>
                                    <div className="col-sm-10">
                                        <input name="phone" onChange={trigar} type="text" readonly className="form-control-plaintext" id="staticEmail" value={data.phone} />
                                    </div>
                                </div>
                                <hr />
                                <div className="mb-3 row">
                                    <label for="staticEmail" className="col-sm-2 col-form-label">Email:</label>
                                    <div className="col-sm-10">
                                        <input name="email" onChange={trigar} type="text" readonly className="form-control-plaintext" id="staticEmail" value={data.email} />
                                    </div>
                                </div>
                                <hr />
                                <div className="mb-3 row " >
                                    <label for="staticEmail" className="col-sm-2 col-form-label">profile pic:</label>
                                    <div className="col-sm-10">
                                        <input type="file" name="profile" onChange={imgpic} readonly className="form-control-plaintext" id="staticEmail" />
                                    </div>
                                </div>
                            </div>
                            <div className=" col-md-5">
                                <img src={data.photo} className="d-block w-100" alt="..." />
                            </div>
                            <button type="button" onClick={updata} className="btn my-3 btn-info w-25 mx-3">Update</button>
                            <button type="button" onClick={() => { history.goBack() }} className="btn my-3 btn-info w-25 mx-3">cancle</button>


                        </div>






                    </div>


                </div>
            </form>
        </>
    )
}
export default Updateres;