import { useEffect, useState }
    from "react";


import {
    useParams,
    Link
}
    from "react-router-dom";


import MainLayout
    from "../layouts/MainLayout";


import { getIspezioneById }
    from "../api/api";


import IspezioneEsecuzioniSection
    from "../components/IspezioneEsecuzioniSection";









function IspezioneDetailPage(){



    const { id } =
        useParams();




    const [ispezione,setIspezione] =
        useState(null);







    useEffect(()=>{


        loadIspezione();


    },[id]);








    async function loadIspezione(){


        try{


            const data =
                await getIspezioneById(id);



            setIspezione(data);



        }catch(error){


            console.error(error);


        }


    }









    if(!ispezione){



        return(

            <MainLayout>

                Caricamento...

            </MainLayout>

        );


    }








    const stato =
        ispezione.stato;





    const mostraLavori =

        stato !== "BOZZA";





    const mostraFirme =

        stato === "COMPLETATA"

        ||

        stato === "FIRMATA"

        ||

        stato === "ARCHIVIATA";






    const mostraReport =

        stato === "FIRMATA"

        ||

        stato === "ARCHIVIATA";









    return(



        <MainLayout>




            <div style={styles.container}>







                <Link


                    to="/ispezioni"


                    style={styles.backButton}


                >


                    ← Torna alle ispezioni


                </Link>










                <div style={styles.card}>









                    <div style={styles.header}>








                        <div>



                            <h1 style={styles.title}>


                                {ispezione.titoloIspezione}


                            </h1>






                            <p style={styles.subtitle}>


                                Dettaglio ispezione


                            </p>




                        </div>










                        {


                            stato !== "ARCHIVIATA"


                                ?



                                <Link


                                    to={`/ispezione/${id}/edit`}


                                    style={styles.editButton}


                                >


                                    Modifica


                                </Link>





                                :





                                <div style={styles.archivedBox}>


                                    Ispezione archiviata - sola consultazione


                                </div>


                        }







                    </div>







                    <div style={styles.grid}>





                        <Info

                            label="Stato"

                            value={ispezione.stato}

                        />







                        <Info

                            label="Data"

                            value={ispezione.dataIspezione}

                        />








                        <Info

                            label="Creato da"

                            value={ispezione.createdBy}

                        />










                        <div style={styles.box}>



                            <div style={styles.label}>

                                Opera collegata

                            </div>






                            {

                                ispezione.assetId


                                    ?


                                    <Link


                                        to={`/asset/${ispezione.assetId}`}


                                        style={styles.link}


                                    >


                                        {ispezione.assetNome}


                                    </Link>




                                    :




                                    <div style={styles.value}>

                                        -

                                    </div>


                            }






                        </div>












                        <div style={styles.box}>



                            <div style={styles.label}>

                                Piano collegato

                            </div>






                            {

                                ispezione.pianoId


                                    ?


                                    <Link


                                        to={`/piano/${ispezione.pianoId}`}


                                        style={styles.link}


                                    >


                                        {ispezione.codicePiano}


                                    </Link>




                                    :




                                    <div style={styles.value}>

                                        -

                                    </div>


                            }






                        </div>







                    </div>














                    <h3>

                        Personale

                    </h3>








                    <div style={styles.grid}>






                        <Info

                            label="Operatore prove"

                            value={ispezione.operatoreProve}

                        />








                        <Info

                            label="Ingegnere"

                            value={ispezione.ingegnere}

                        />








                        <Info

                            label="Referente concessionaria"

                            value={ispezione.referenteConcessionaria}

                        />







                    </div>















                    {

                        mostraLavori &&


                        <>


                            <h3>

                                Attività operative

                            </h3>









                            <div style={styles.grid}>








                                <Info

                                    label="Installazione cantiere"

                                    value={ispezione.installazioneCantiere}

                                />








                                <Info

                                    label="Inizio lavori"

                                    value={ispezione.inizioLavori}

                                />








                                <Info

                                    label="Fine lavori"

                                    value={ispezione.fineLavori}

                                />







                            </div>



                        </>


                    }















                    {

                        mostraFirme &&


                        <>



                            <h3>

                                Firme

                            </h3>









                            <div style={styles.grid}>








                                <Info

                                    label="Firma operatore"

                                    value={ispezione.firmaOperatore}

                                />








                                <Info

                                    label="Firma ingegnere"

                                    value={ispezione.firmaIngegnere}

                                />









                                <Info

                                    label="Firma concessionaria"

                                    value={ispezione.firmaConcessionaria}

                                />







                            </div>




                        </>


                    }













                    {

                        mostraReport &&


                        <div>



                            <h3>

                                Report finale

                            </h3>






                            <p style={styles.text}>


                                {

                                    ispezione.report

                                    ||

                                    "Nessun report presente"

                                }


                            </p>




                        </div>


                    }









                    <div>




                        <h3>

                            Annotazioni

                        </h3>






                        <p style={styles.text}>


                            {

                                ispezione.annotazioniAggiuntive

                                ||

                                "Nessuna annotazione presente"

                            }


                        </p>





                    </div>









                </div>












                <IspezioneEsecuzioniSection

                    ispezione={ispezione}

                />









            </div>






        </MainLayout>




    );



}









function Info({label,value}){


    return(



        <div style={styles.box}>





            <div style={styles.label}>


                {label}


            </div>







            <div style={styles.value}>


                {value || "-"}


            </div>





        </div>


    );


} const styles = {




    container: {

        maxWidth:"1200px",

        margin:"0 auto",

        display:"flex",

        flexDirection:"column",

        gap:"20px",

        paddingBottom:"120px"

    },










    card: {

        backgroundColor:"#ffffff",

        border:"1px solid #e2e8f0",

        borderRadius:"18px",

        padding:"22px",

        display:"flex",

        flexDirection:"column",

        gap:"20px",

        boxShadow:

            "0 4px 12px rgba(15,23,42,0.05)"

    },











    header: {

        display:"flex",

        justifyContent:"space-between",

        alignItems:"center",

        flexWrap:"wrap",

        gap:"15px"

    },











    title: {

        margin:0,

        fontSize:"32px",

        fontWeight:"700",

        color:"#1e293b"

    },










    subtitle: {

        margin:0,

        color:"#64748b",

        fontSize:"14px"

    },










    backButton: {

        width:"fit-content",

        backgroundColor:"#ffffff",

        color:"#1e293b",

        padding:"10px 14px",

        borderRadius:"10px",

        textDecoration:"none",

        border:"1px solid #e2e8f0",

        fontWeight:"600"

    },










    editButton: {

        backgroundColor:"#ffffff",

        color:"#1e293b",

        padding:"11px 16px",

        borderRadius:"10px",

        textDecoration:"none",

        fontWeight:"600",

        border:"1px solid #cbd5e1",

        cursor:"pointer"

    },











    archivedBox: {

        background:"#f1f5f9",

        border:"1px solid #cbd5e1",

        padding:"12px",

        borderRadius:"10px",

        color:"#475569",

        fontWeight:"600"

    },










    grid: {

        display:"grid",

        gridTemplateColumns:

            "repeat(auto-fit,minmax(220px,1fr))",

        gap:"14px"

    },










    box: {

        backgroundColor:"#f8fafc",

        border:"1px solid #e2e8f0",

        borderRadius:"12px",

        padding:"14px"

    },











    label: {

        color:"#64748b",

        fontSize:"12px",

        fontWeight:"700"

    },











    value: {

        marginTop:"6px",

        color:"#1e293b",

        fontWeight:"600"

    },










    link: {

        color:"#1e293b",

        textDecoration:"none",

        fontWeight:"600",

        display:"block",

        marginTop:"6px"

    },











    text: {

        margin:0,

        color:"#475569",

        lineHeight:"1.6"

    }




};








export default IspezioneDetailPage;