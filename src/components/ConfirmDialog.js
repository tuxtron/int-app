import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ConfirmDialog.scss';

function ConfirmDialog(props) {

    const token = useSelector(state => state.auth.token);
    const [ open, setOpen ] = useState(props.open);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open])

    const closeModal = () => {
        props.closeHandler();
        setOpen(false);
    }

    const goToAutogestion = () => {
        window.open(`https://facturacion-front.vercel.app/?from=web&token=${token}`);
        setOpen(false);
    }

  return (
      <>
        {
            open ? (
                <div className="modal-container">
                    <div className="dialog-container">
                        <p className="title">{props.title}</p>
                        <p className="body">{props.body}</p>
                        <div className="row">
                            <div className="confirmBtn" onClick={closeModal}>
                                <p>Cerrar</p>
                            </div>
                            <div className="suscriptionBtn" onClick={goToAutogestion}>
                                <p>Modificar suscripción</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null
        }
      </>
  );
}

export default ConfirmDialog;

/*
    Como usar: 
    * En el componente pages que se desea invocar el modal:
    -------------------------------------------------------------------------
    const [ openModal, setOpenModal ] = useState(false);

    <ConfirmDialog 
        open={openModal} 
        closeHandler={() => setOpenModal(false)} // funcion que se ejecuta despues de clickear "confirmar dentro del modal"
        title="Credencial incorrecta"
        body="Hubo un error al iniciar sesión, por favor intentá nuevamente"
    />
    -------------------------------------------------------------------------

*/
