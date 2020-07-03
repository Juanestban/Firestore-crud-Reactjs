import React, { useState, useEffect } from "react";
import "./LinkForm.css";
import { database } from "../../firebase";

const LinkForm = (props) => {
    const userInitial = {
        name: '',
        imgUrl: '',
        socialWeb: ''
    }

    const [values, setValues] = useState(userInitial);

    const getUserById = async (id) => {
        const doc = await database.collection('userDatos').doc(id).get();
        setValues({...doc.data()});
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({...userInitial});
        } else {
            getUserById(props.currentId);
        }
    }, [props.currentId]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }
  
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addOrEddit(values);
        setValues({...userInitial});
    }

    return (
        <form className="card card-body bg-primary align-self-center" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">home</i>
                </div>
                <input value={values.name} onChange={handleInputChange} type="text" className="form-control" placeholder="name" name="name" />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_photo</i>
                </div>
                <input value={values.imgUrl} onChange={handleInputChange} type="url" className="form-control" placeholder="img url" name="imgUrl" />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input value={values.socialWeb} onChange={handleInputChange} type="text" className="form-control" placeholder="social web" name="socialWeb" />
            </div>
            <button className={'btn ' + (props.currentId === '' ? 'btn-outline-success' : 'btn-outline-info')}>
                {props.currentId === '' ? 'Save' : 'Update'}
            </button>
        </form>
    );
};

export default LinkForm;
