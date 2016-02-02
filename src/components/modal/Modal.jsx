import React from "react";

import Style from "../../utils/Style";
import ModalConfig from "./ModalConfig";
import ModalPanel from "./ModalPanel";



class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.settings = this.props.settings ? this.props.settings:new ModalConfig();


        this.openModal = this.openModal.bind(this);

    }

    componentDidMount(){
        this.settings.open.addImmediateCallback(this, this.forceUpdate);
        this.settings.buttonIcon.addImmediateCallback(this, this.forceUpdate);
    }



    componentWillUnmount () {
        this.settings.open.removeCallback(this, this.forceUpdate)
        this.settings.buttonIcon.removeCallback(this, this.forceUpdate)
    }


    openModal(){
        this.settings.open.value = true;
    }


    render() {
    var isOpen = this.settings.open.value;
    var overlay = Style.overlayContainer(isOpen);
    var modal = Style.modal(isOpen);
    var modalButtonUI = "";

    if (!this.props.keyPress){
        if(this.settings.buttonIcon.value){
            modalButtonUI = <span style={{cursor:"pointer"}} onClick={this.openModal}><i className={this.settings.buttonIcon.value}></i></span>;
        }
        else{
            modalButtonUI = <span type="button" className="btn btn-primary" onClick={this.openModal}>Open</span>;
        }

    }
    return (<span >
                    <span type="button" className="btn btn-primary" onClick={this.openModal}>Open</span>

                    <div style={overlay}/>
                    <div style={modal}>
                        <ModalPanel  sessionOpen={this.settings.open} settings={this.settings.panelConfig}>
                            {this.props.children}
                        </ModalPanel>
                    </div>
            </span>
    );
  }
}

export default Modal;