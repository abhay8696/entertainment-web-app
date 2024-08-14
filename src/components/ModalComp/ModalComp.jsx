import React, { useContext } from 'react';
//context
import { ModalContext } from '../../contexts/AllContexts';
//styles
import "./ModalComp.css";

const ModalComp = () => {

    //contexts
    const [Modal, SetModal] = useContext(ModalContext);

    return (
        <div 
            className={`ModalComp-wrapper ModalComp-wrapper-${Modal.position}`} 
            onClick={()=> SetModal({position: "down"})}
        >
            <h1>MODAL</h1>
        </div>
    );
};

export default ModalComp;