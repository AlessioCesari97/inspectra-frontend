import { useEffect, useState }

from "react";


import {
    useParams,
    Link
}
    from "react-router-dom";


import MainLayout
    from "../layouts/MainLayout";


import {
    getEsecuzioneById
}
    from "../api/api";









const styles = {


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

        gap:"20px"

    },






    header: {

        display:"flex",

        justifyContent:"space-between",

        alignItems:"center",

        flexWrap:"wrap"

    },






    actions: {

        display:"flex",

        alignItems:"center",

        gap:"10px"

    },







    title: {

        margin:0,

        fontSize:"32px",

        fontWeight:"700",

        color:"#1e293b"

    },







    subtitle: {

        margin:0,

        color:"#64748b"

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

        fontWeight:"600"

    },








    editButton: {

        backgroundColor:"#ffffff",

        color:"#1e293b",

        padding:"11px 16px",

        borderRadius:"10px",

        textDecoration:"none",

        fontWeight:"600",

        border:"1px solid #cbd5e1"

    },







    badge: {

        backgroundColor:"#f1f5f9",

        border:"1px solid #cbd5e1",

        borderRadius:"10px",

        padding:"11px 16px",

        fontWeight:"700",

        color:"#334155"

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

    }



};function EsecuzioneDetailPage(){



    const { id } =
        useParams();




    const [esecuzione,setEsecuzione] =
        useState(null);







    useEffect(()=>{


        loadEsecuzione();


    },[id]);









    async function loadEsecuzione(){


        try{


            const data =
                await getEsecuzioneById(id);



            setEsecuzione(data);



        }catch(error){


            console.error(error);


        }


    }










    if(!esecuzione){


        return(

            <MainLayout>


                Caricamento...


            </MainLayout>


        );


    }











    const mostraEsecuzione =


        esecuzione.stato === "ESEGUITA"

        ||

        esecuzione.stato === "AGGIUNTA_IN_SITO";








    const mostraDatiOperativi =


        [

            "ESEGUITA",

            "AGGIUNTA_IN_SITO",

            "NON_ESEGUIBILE",

            "SPOSTATA"

        ].includes(

            esecuzione.stato

        );











    return(



        <MainLayout>




            <div style={styles.container}>






                <Link

                    to={`/piano/${esecuzione.pianoId}`}

                    style={styles.backButton}

                >


                    ← Piano Indagine


                </Link>










                <div style={styles.card}>









                    <div style={styles.header}>







                        <div>


                            <h1 style={styles.title}>


                                {esecuzione.sigla}

                                {esecuzione.numero}


                            </h1>





                            <p style={styles.subtitle}>


                                {esecuzione.nomeProva}


                            </p>



                        </div>











                        <div style={styles.actions}>





                            <div style={styles.badge}>


                                {esecuzione.stato}


                            </div>








                            <Link

                                to={`/esecuzione/${esecuzione.esecuzioneId}/edit`}

                                style={styles.editButton}

                            >


                                Modifica


                            </Link>




                        </div>






                    </div>












                    <div style={styles.grid}>




                        <Info

                            label="Punto previsto"

                            value={esecuzione.puntoPrevisto}

                        />







                    </div>                     <div style={styles.grid}>






                    <Info

                        label="Elemento"

                        value={

                            esecuzione.elementoId

                                ?

                                <Link

                                    to={`/elemento/${esecuzione.elementoId}`}

                                    style={styles.link}

                                >

                                    {esecuzione.codiceElemento}

                                </Link>


                                :


                                "-"

                        }

                    />









                    <Info

                        label="Campata"

                        value={

                            esecuzione.campata

                        }

                    />









                    <Info

                        label="Piano indagine"

                        value={

                            esecuzione.pianoId

                                ?

                                <Link

                                    to={`/piano/${esecuzione.pianoId}`}

                                    style={styles.link}

                                >


                                    {esecuzione.codicePiano}


                                </Link>


                                :


                                "-"

                        }

                    />









                    <Info

                        label="Ispezione"

                        value={

                            esecuzione.ispezioneId

                                ?

                                <Link

                                    to={`/ispezione/${esecuzione.ispezioneId}`}

                                    style={styles.link}

                                >


                                    {esecuzione.titoloIspezione}


                                </Link>


                                :


                                "-"

                        }

                    />




                </div>









                    {mostraDatiOperativi &&


                        <div style={styles.grid}>





                            <Info

                                label="Data esecuzione"

                                value={

                                    esecuzione.timestamp

                                }

                            />








                            <Info

                                label="Posizione"

                                value={

                                    esecuzione.latitudine

                                    &&

                                    esecuzione.longitudine


                                        ?


                                        `${esecuzione.latitudine}, ${esecuzione.longitudine}`


                                        :


                                        "-"

                                }

                            />





                        </div>


                    }













                    <div style={styles.grid}>






                        <Info

                            label="Foto piano"

                            value={

                                esecuzione.fotoPiano1

                                    ?

                                    "Presente"

                                    :

                                    "-"

                            }

                        />








                        <Info

                            label="Foto sezione"

                            value={

                                esecuzione.fotoPiano2

                                    ?

                                    "Presente"

                                    :

                                    "-"

                            }

                        />









                        <Info

                            label="Foto realistica"

                            value={

                                esecuzione.fotoPiano3

                                    ?

                                    "Presente"

                                    :

                                    "-"

                            }

                        />




                    </div>









                    {mostraEsecuzione &&



                        <div style={styles.grid}>





                            <Info

                                label="Foto cantiere 1"

                                value={

                                    esecuzione.fotoCantiere1

                                        ?

                                        "Presente"

                                        :

                                        "-"

                                }

                            />








                            <Info

                                label="Foto cantiere 2"

                                value={

                                    esecuzione.fotoCantiere2

                                        ?

                                        "Presente"

                                        :

                                        "-"

                                }

                            />






                        </div>


                    }









                    <div>


                        <h3>

                            Note

                        </h3>



                        <p>


                            {

                                esecuzione.note

                                ||

                                "Nessuna nota presente"


                            }


                        </p>



                    </div>








                </div>



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


}








export default EsecuzioneDetailPage;