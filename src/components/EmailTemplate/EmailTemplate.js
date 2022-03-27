
import  './../EmailTemplate/emailTemplate.css';

const EmailTemplate = () =>{

    return <>

            <div class="emailContainer">
                <div class="headContain">
                    <h2 class="headTitle">{'Comanda a fost inregistrata'}</h2>
                    <h3>{'Ne bucuram de comanda dvs.'}</h3>
                </div>
                <div class="middleContain">
                    <h3>{'Produsele comandate sunt:'}</h3>

                    <h4>{'Cost total:'}</h4>
                </div>
            </div>

   
    </>
}

export default EmailTemplate;