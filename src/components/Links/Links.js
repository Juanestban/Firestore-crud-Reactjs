import React, { useEffect, useState } from "react";
import "./Links.css";

// firebase => fireStore
import {database} from '../../firebase';
// toast
import { toast } from 'react-toastify';
// components
import LinksForm from "../LinksForm/LinkForm";

const Links = () => {

  const [users, setUsers] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const imgStandar = 'https://png.pngtree.com/element_our/md/20180414/md_5ad1c8a1a6fc5.jpg';

  const addOrEddit = async (objectUser) => {
    // user el try para evitar errores en el navegador
    try {
      if (currentId === '') {
        await database.collection('userDatos').doc().set(objectUser);
        toast('new user added', {
          type: 'success',
          autoClose: 1500
        });
      } else {
        await database.collection('userDatos').doc(currentId).update(objectUser);
        toast('user updated successfuly', {
          type: 'info',
          autoClose: 1500
        });
        setCurrentId('');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getusersData = () => {
    database.collection('userDatos').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({...doc.data(), id: doc.id});
      });
      setUsers(docs);
    });
  }

  const handleUserDelete = async (id) => {
    if (window.confirm('are you sure that you wish delete this user?')) {
      await database.collection('userDatos').doc(id).delete();
      toast('user has been deleted', {
        type: 'error',
        autoClose: 1500
      });
      setCurrentId('');
    }
  }

  useEffect(() => {
    getusersData();
  }, []);

  return (
    <div className="pb-4 d-flex flex-column">
      <LinksForm {...{addOrEddit, currentId, users}} />
      
      <div className="row">
        {users.map(user => (
          <div key={user.id} className="col-4">
            <div className="card mt-3">
              <div className="card-header d-flex justify-content-between align-items-center">
                <p className="text-primary m-0 display-5">
                  {user.name}
                </p>
                <div>
                  <button onClick={() => setCurrentId(user.id)} className="btn btn-primary btn-sm mr-1">
                    <i className="material-icons">create</i>
                  </button>
                  <button onClick={() => handleUserDelete(user.id)} className="btn btn-danger btn-sm">
                    <i className="material-icons">delete</i>
                  </button>
                </div>
              </div>
              <div className="card-body p-0">
                <img src={user.imgUrl === '' ? imgStandar : user.imgUrl} className="img-calc img-fluid" alt=""/>
              </div>
              <div className="card-footer">
                <p className="text-primary m-0 display-5">{user.socialWeb}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
