import { useEffect, useState }
    from "react";


import {
    useParams,
    useNavigate,
    Link
}
    from "react-router-dom";


import MainLayout
    from "../layouts/MainLayout";


import {

    getIspezioneById,

    updateIspezione

}
    from "../api/api";








function EditIspezionePage(){



    const { id } =
        useParams();



    const navigate =
        useNavigate();





    const [formData,setFormData] =
        useState(null);



    const [error,setError] =
        useState("");



    const [success,setSuccess] =
        useState("");









    useEffect(()=>{


        loadData();


    },[id]);










    async function loadData(){



        try{



            const i =

                await getIspezioneById(id);






            setFormData({



                titoloIspezione:
                    i.titoloIspezione || "",



                stato:
                    i.stato || "BOZZA",



                dataIspezione:
                    i.dataIspezione || "",






                operatoreProve:
                    i.operatoreProve || "",



                ingegnere:
                    i.ingegnere || "",



                referenteConcessionaria:
                    i.referenteConcessionaria || "",






                installazioneCantiere:
                    i.installazioneCantiere || "",



                inizioLavori:
                    i.inizioLavori || "",



                fineLavori:
                    i.fineLavori || "",






                firmaOperatore:
                    i.firmaOperatore || "",



                firmaIngegnere:
                    i.firmaIngegnere || "",



                firmaConcessionaria:
                    i.firmaConcessionaria || "",






                createdBy:
                    i.createdBy || "",



                annotazioniAggiuntive:
                    i.annotazioniAggiuntive || "",



                report:
                    i.report || "",






                asset:

                    i.assetId

                        ?

                        {assetId:i.assetId}

                        :

                        null,







                pianoIndagine:

                    i.pianoId

                        ?

                        {pianoId:i.pianoId}

                        :

                        null



            });




        }catch(error){



            console.error(error);



            setError(

                "Errore caricamento ispezione"

            );



        }



    }      function handleChange(e){



        const {

            name,

            value

        } = e.target;







        if(name === "stato"){



            let aggiornata = {


                ...formData,


                stato:value


            };







            if(value === "BOZZA"){



                aggiornata.installazioneCantiere = "";


                aggiornata.inizioLavori = "";


                aggiornata.fineLavori = "";



                aggiornata.firmaOperatore = "";


                aggiornata.firmaIngegnere = "";


                aggiornata.firmaConcessionaria = "";



                aggiornata.report = "";



            }









            if(value === "IN_CORSO"){



                aggiornata.firmaOperatore = "";


                aggiornata.firmaIngegnere = "";


                aggiornata.firmaConcessionaria = "";



                aggiornata.report = "";



            }









            setFormData(

                aggiornata

            );



            return;


        }










        setFormData({


            ...formData,


            [name]:

            value


        });



    }












    async function handleSubmit(e){



        e.preventDefault();




        setError("");

        setSuccess("");







        if(!formData.titoloIspezione.trim()){



            setError(

                "Inserisci il titolo ispezione"

            );



            return;


        }









        if(


            [

                "IN_CORSO",

                "COMPLETATA",

                "FIRMATA",

                "ARCHIVIATA"


            ].includes(formData.stato)


            &&


            !formData.installazioneCantiere


        ){



            setError(

                "Inserisci installazione cantiere"

            );



            return;



        }










        if(


            [

                "IN_CORSO",

                "COMPLETATA",

                "FIRMATA",

                "ARCHIVIATA"


            ].includes(formData.stato)


            &&


            !formData.inizioLavori


        ){



            setError(

                "Inserisci data inizio lavori"

            );



            return;



        }










        if(


            [

                "COMPLETATA",

                "FIRMATA",

                "ARCHIVIATA"


            ].includes(formData.stato)


            &&


            !formData.fineLavori


        ){



            setError(

                "Inserisci data fine lavori"

            );



            return;



        }










        if(


            [

                "FIRMATA",

                "ARCHIVIATA"


            ].includes(formData.stato)


            &&


            (

                !formData.firmaOperatore

                ||

                !formData.firmaIngegnere

                ||

                !formData.firmaConcessionaria


            )


        ){



            setError(

                "Inserisci tutte le firme richieste"

            );



            return;


        }











        try{



            await updateIspezione(

                id,

                formData

            );








            setSuccess(

                "Ispezione salvata correttamente"

            );








            setTimeout(()=>{



                navigate(

                    `/ispezione/${id}`

                );



            },1000);








        }catch(error){



            console.error(error);



            setError(

                "Errore durante il salvataggio"

            );



        }



    }











    if(!formData){



        return(


            <MainLayout>


                Caricamento...


            </MainLayout>


        );



    }












    const mostraLavori =


        [

            "IN_CORSO",

            "COMPLETATA",

            "FIRMATA",

            "ARCHIVIATA"


        ].includes(formData.stato);









    const mostraFirme =


        [

            "COMPLETATA",

            "FIRMATA",

            "ARCHIVIATA"


        ].includes(formData.stato);









    const mostraReport =


        [

            "FIRMATA",

            "ARCHIVIATA"


        ].includes(formData.stato);     return(



        <MainLayout>





            <div style={styles.container}>








                <Link

                    to={`/ispezione/${id}`}

                    style={styles.backButton}

                >


                    ← Torna all'ispezione


                </Link>










                <form

                    onSubmit={handleSubmit}

                    style={styles.card}

                >







                    <div>



                        <h1 style={styles.title}>


                            Modifica Ispezione


                        </h1>






                        <p style={styles.subtitle}>


                            Aggiorna informazioni e stato dell'ispezione


                        </p>




                    </div>










                    {

                        success &&


                        <div style={styles.success}>


                            {success}


                        </div>


                    }









                    {

                        error &&


                        <div style={styles.error}>


                            {error}


                        </div>


                    }












                    <h3 style={styles.sectionTitle}>


                        Informazioni principali


                    </h3>










                    <div style={styles.grid}>









                        <div style={styles.group}>



                            <label style={styles.label}>

                                Stato

                            </label>







                            <select


                                name="stato"


                                value={formData.stato}


                                onChange={handleChange}


                                style={styles.input}


                            >



                                <option value="BOZZA">

                                    Bozza

                                </option>



                                <option value="IN_CORSO">

                                    In corso

                                </option>




                                <option value="COMPLETATA">

                                    Completata

                                </option>




                                <option value="FIRMATA">

                                    Firmata

                                </option>




                                <option value="ARCHIVIATA">

                                    Archiviata

                                </option>




                            </select>






                        </div>









                        <Input

                            label="Titolo"

                            name="titoloIspezione"

                            value={formData.titoloIspezione}

                            onChange={handleChange}

                        />








                        <Input

                            label="Data"

                            name="dataIspezione"

                            type="date"

                            value={formData.dataIspezione}

                            onChange={handleChange}

                        />








                        <Input

                            label="Creato da"

                            name="createdBy"

                            value={formData.createdBy}

                            onChange={handleChange}

                        />








                    </div>













                    <h3 style={styles.sectionTitle}>


                        Personale


                    </h3>










                    <div style={styles.grid}>







                        <Input

                            label="Operatore prove"

                            name="operatoreProve"

                            value={formData.operatoreProve}

                            onChange={handleChange}

                        />








                        <Input

                            label="Ingegnere"

                            name="ingegnere"

                            value={formData.ingegnere}

                            onChange={handleChange}

                        />








                        <Input

                            label="Referente concessionaria"

                            name="referenteConcessionaria"

                            value={formData.referenteConcessionaria}

                            onChange={handleChange}

                        />








                    </div>                     {


                    mostraLavori &&


                    <>



                        <h3 style={styles.sectionTitle}>

                            Attività operative

                        </h3>






                        <div style={styles.grid}>





                            <Input

                                label="Installazione cantiere"

                                type="datetime-local"

                                name="installazioneCantiere"

                                value={formData.installazioneCantiere}

                                onChange={handleChange}

                            />






                            <Input

                                label="Inizio lavori"

                                type="datetime-local"

                                name="inizioLavori"

                                value={formData.inizioLavori}

                                onChange={handleChange}

                            />







                            <Input

                                label="Fine lavori"

                                type="datetime-local"

                                name="fineLavori"

                                value={formData.fineLavori}

                                onChange={handleChange}

                            />






                        </div>



                    </>


                }









                    {


                        mostraFirme &&


                        <>




                            <h3 style={styles.sectionTitle}>

                                Firme

                            </h3>







                            <div style={styles.grid}>






                                <Input

                                    label="Firma operatore"

                                    name="firmaOperatore"

                                    value={formData.firmaOperatore}

                                    onChange={handleChange}

                                />






                                <Input

                                    label="Firma ingegnere"

                                    name="firmaIngegnere"

                                    value={formData.firmaIngegnere}

                                    onChange={handleChange}

                                />







                                <Input

                                    label="Firma concessionaria"

                                    name="firmaConcessionaria"

                                    value={formData.firmaConcessionaria}

                                    onChange={handleChange}

                                />






                            </div>



                        </>


                    }










                    {


                        mostraReport &&


                        <div style={styles.group}>




                            <label style={styles.label}>

                                Report

                            </label>






                            <textarea

                                name="report"

                                value={formData.report}

                                onChange={handleChange}

                                style={styles.textarea}

                            />





                        </div>


                    }










                    <div style={styles.group}>



                        <label style={styles.label}>

                            Annotazioni

                        </label>






                        <textarea

                            name="annotazioniAggiuntive"

                            value={formData.annotazioniAggiuntive}

                            onChange={handleChange}

                            style={styles.textarea}

                        />





                    </div>










                    <button

                        style={styles.button}

                    >


                        Salva Modifiche


                    </button>








                </form>






            </div>





        </MainLayout>



    );



}









function Input({

                   label,

                   name,

                   value,

                   onChange,

                   type="text"

               }){


    return(


        <div style={styles.group}>




            <label style={styles.label}>


                {label}


            </label>






            <input

                type={type}

                name={name}

                value={value}

                onChange={onChange}

                style={styles.input}

            />





        </div>


    );


}










const styles = {




    container:{

        maxWidth:"900px",

        margin:"0 auto",

        display:"flex",

        flexDirection:"column",

        gap:"18px",

        paddingBottom:"120px"

    },







    backButton:{

        width:"fit-content",

        background:"#ffffff",

        color:"#1e293b",

        padding:"10px 14px",

        borderRadius:"10px",

        border:"1px solid #e2e8f0",

        textDecoration:"none",

        fontWeight:"700"

    },








    card:{

        background:"#ffffff",

        padding:"25px",

        borderRadius:"18px",

        border:"1px solid #e2e8f0",

        boxShadow:
            "0 4px 12px rgba(15,23,42,0.05)",

        display:"flex",

        flexDirection:"column",

        gap:"20px"

    },








    title:{

        margin:0,

        fontSize:"32px",

        color:"#1e293b",

        fontWeight:"700"

    },







    subtitle:{

        margin:0,

        color:"#64748b",

        fontSize:"14px"

    },








    sectionTitle:{

        margin:"10px 0 0",

        color:"#1e293b"

    },








    grid:{

        display:"grid",

        gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",

        gap:"16px"

    },








    group:{

        display:"flex",

        flexDirection:"column",

        gap:"8px"

    },








    label:{

        fontWeight:"700",

        color:"#475569",

        fontSize:"14px"

    },








    input:{

        height:"46px",

        padding:"0 12px",

        borderRadius:"10px",

        border:"1px solid #cbd5e1",

        outline:"none"

    },








    textarea:{

        minHeight:"100px",

        padding:"12px",

        borderRadius:"10px",

        border:"1px solid #cbd5e1",

        resize:"vertical"

    },








    button:{

        height:"50px",

        borderRadius:"10px",

        border:"none",

        background:"#1e293b",

        color:"#ffffff",

        fontWeight:"700",

        cursor:"pointer",

        fontSize:"15px"

    },







    success:{

        background:"#dcfce7",

        color:"#166534",

        padding:"12px",

        borderRadius:"10px",

        fontWeight:"700"

    },








    error:{

        background:"#fee2e2",

        color:"#991b1b",

        padding:"12px",

        borderRadius:"10px",

        fontWeight:"700"

    }



};







export default EditIspezionePage;