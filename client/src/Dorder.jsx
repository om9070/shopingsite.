import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"

const Dorder = (props) => {
    console.log(props.location.state)
    const [gt, setgt] = useState([])
    const [sr, setsr] = useState([])
    const history = useHistory();
    const trigar = async () => {

        const data = await fetch("/banana", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const real = await data.json();
        console.log(real.payment);

        const baba = real.payment.find((val) => {
            return val._id == props.location.state;
        });
        console.log(baba);
        setsr({ ...sr, op: baba.name, phone: baba.phone })
        setgt(baba)

    }

    useEffect(() => {
        trigar();
    }, [])

    const turbo = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setsr({ ...sr, [name]: value })

    }

    const updata = async (e) => {
        e.preventDefault();
        const id = props.location.state;
        const { op, phone } = sr;
        const data = await fetch("/lichi", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ op, phone, id })
        })

        const org = await data.json();
        console.log(org);

        if (data.status == 201) {
            history.push("/order")
        } else {
            window.alert("something falut")
        }

    }

    return (
        <>
            <form method="PUT">
                <div className=" container">
                    <div className="row mt-5 mx-3 d-flex flex-row justify-content-start align-items-center">
                        <div className=" mt-5 mx-3 col-md-4 col-sm-4">
                            <img src={gt.tr} className=" w-100 mx-3" alt="" />
                        </div>
                        <div className="mt-5  col-md-7 col-sm-4 justify-content-start">
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label">Phone:</label>
                                <div className="col-sm-10">
                                    <input type="text" name="op" onChange={turbo} readonly className="form-control-plaintext" id="staticEmail" value={sr.op} />
                                    <hr />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label">Phone:</label>
                                <div className="col-sm-10">

                                    <input type="text" name="phone" onChange={turbo} readonly className="form-control-plaintext" id="staticEmail" value={sr.phone} />
                                    <hr />
                                </div>
                            </div>
                            <button type="button" onClick={updata} class="btn btn-info ">update</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
export default Dorder;