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
    getElementoById
}
    from "../api/api";







const styles = {


    container: {

        maxWidth:"1100px",

        margin:"0 auto",

        display:"flex",

        flexDirection:"column",

        gap:"18px",

        paddingBottom:"120px"

    },



    backButton: {

        width:"fit-content",

        background:"#ffffff",

        color:"#1e293b",

        padding:"10px 14px",

        borderRadius:"10px",

        border:"1px solid #e2e8f0",

        textDecoration:"none",

        fontWeight:"600"

    },



    headerCard: {

        background:"#ffffff",

        border:"1px solid #e2e8f0",

        borderRadius:"18px",

        padding:"22px",

        display:"flex",

        justifyContent:"space-between",

        alignItems:"flex-start",

        gap:"20px",

        flexWrap:"wrap"

    },



    titleBox: {

        display:"flex",

        flexDirection:"column",

        gap:"5px"

    },



    title: {

        margin:0,

        fontSize:"30px",

        color:"#1e293b",

        fontWeight:"700"

    },



    subtitle: {

        margin:0,

        color:"#64748b",

        fontSize:"14px"

    },



    editButton: {

        background:"#f8fafc",

        color:"#1e293b",

        border:"1px solid #cbd5e1",

        borderRadius:"10px",

        padding:"10px 15px",

        textDecoration:"none",

        fontWeight:"600"

    },



    card: {

        background:"#ffffff",

        border:"1px solid #e2e8f0",

        borderRadius:"18px",

        padding:"22px",

        display:"flex",

        flexDirection:"column",

        gap:"28px"

    },



    section: {

        display:"flex",

        flexDirection:"column",

        gap:"12px"

    },



    sectionTitle: {

        margin:0,

        color:"#1e293b"

    },



    grid: {

        display:"grid",

        gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",

        gap:"14px"

    },



    infoBox: {

        background:"#f8fafc",

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



    text: {

        margin:0,

        color:"#475569",

        lineHeight:"1.6"

    },



    cleanLink: {

        color:"#1e293b",

        textDecoration:"none",

        fontWeight:"700"

    },



    // =========================
    // IMMAGINE
    // =========================

    imageContainer: {

        background:"#f8fafc",

        border:"1px solid #e2e8f0",

        borderRadius:"14px",

        padding:"14px",

        display:"flex",

        flexDirection:"column",

        gap:"10px"

    },



    elementImage: {

        width:"100%",

        maxWidth:"500px",

        maxHeight:"340px",

        objectFit:"cover",

        borderRadius:"12px",

        cursor:"pointer",

        border:"1px solid #e2e8f0"

    },



    imageHint: {

        margin:0,

        color:"#64748b",

        fontSize:"13px"

    },



    noImage: {

        margin:0,

        color:"#64748b",

        fontSize:"14px"

    },



    // =========================
    // VISUALIZZAZIONE FULLSCREEN
    // =========================

    imageOverlay: {

        position:"fixed",

        top:0,

        left:0,

        width:"100vw",

        height:"100vh",

        background:"rgba(0,0,0,0.92)",

        display:"flex",

        justifyContent:"center",

        alignItems:"center",

        padding:"20px",

        boxSizing:"border-box",

        zIndex:9999,

        cursor:"pointer"

    },



    fullscreenImage: {

        maxWidth:"95vw",

        maxHeight:"90vh",

        objectFit:"contain",

        borderRadius:"8px",

        cursor:"default"

    },



    closeButton: {

        position:"fixed",

        top:"18px",

        right:"22px",

        width:"44px",

        height:"44px",

        borderRadius:"50%",

        border:"1px solid rgba(255,255,255,0.4)",

        background:"rgba(0,0,0,0.5)",

        color:"#ffffff",

        fontSize:"28px",

        cursor:"pointer",

        display:"flex",

        justifyContent:"center",

        alignItems:"center",

        zIndex:10000

    }

};







function ElementoDetailPage(){



    const { id } =
        useParams();



    const [elemento,setElemento] =
        useState(null);



    const [immagineAperta,setImmagineAperta] =
        useState(false);







    useEffect(()=>{


        loadElemento();


    },[id]);







    async function loadElemento(){



        try{


            const data =

                await getElementoById(id);



            setElemento(data);



        }catch(error){



            console.error(error);



        }



    }







    function apriImmagine(){


        setImmagineAperta(true);


    }





    function chiudiImmagine(){


        setImmagineAperta(false);


    }







    if(!elemento){



        return(


            <MainLayout>


                <p>

                    Caricamento...

                </p>


            </MainLayout>


        );


    }









    return(



        <MainLayout>




            <div style={styles.container}>






                <Link


                    to={`/asset/${elemento.assetId}`}


                    style={styles.backButton}


                >


                    ← Torna all'Opera



                </Link>









                <div style={styles.headerCard}>





                    <div style={styles.titleBox}>




                        <h1 style={styles.title}>


                            {elemento.codice}


                        </h1>





                        <p style={styles.subtitle}>


                            Dettaglio elemento strutturale


                        </p>




                    </div>







                    <Link


                        to={`/elemento/${elemento.elementoId}/edit`}


                        style={styles.editButton}


                    >


                        Modifica


                    </Link>





                </div>









                <div style={styles.card}>






                    <Section title="Informazioni principali">






                        <Info


                            label="Tipo elemento"


                            value={elemento.tipoElementoNome}


                        />






                        <Info


                            label="Campata"


                            value={elemento.campata}


                        />







                        <Info


                            label="Lato"


                            value={elemento.lato}


                        />








                        <div style={styles.infoBox}>




                            <div style={styles.label}>


                                Opera


                            </div>





                            <div style={styles.value}>




                                <Link


                                    to={`/asset/${elemento.assetId}`}


                                    style={styles.cleanLink}


                                >


                                    {elemento.nome}


                                </Link>





                            </div>




                        </div>






                    </Section>









                    <Section title="Descrizione">



                        <p style={styles.text}>


                            {

                                elemento.descrizione

                                    ?

                                    elemento.descrizione

                                    :

                                    "Nessuna descrizione presente"

                            }


                        </p>



                    </Section>









                    <Section title="Immagine dell'elemento">



                        {

                            elemento.allegato?.url

                                ?

                                <div style={styles.imageContainer}>



                                    <img

                                        src={elemento.allegato.url}

                                        alt={`Elemento ${elemento.codice}`}

                                        style={styles.elementImage}

                                        onClick={apriImmagine}

                                    />



                                    <p style={styles.imageHint}>


                                        Tocca l'immagine per visualizzarla a schermo intero


                                    </p>



                                </div>


                                :


                                <p style={styles.noImage}>


                                    Nessuna immagine presente


                                </p>

                        }



                    </Section>









                    <Section title="Posizione">






                        <Info


                            label="Latitudine"


                            value={elemento.latitudine}


                        />






                        <Info


                            label="Longitudine"


                            value={elemento.longitudine}


                        />





                    </Section>





                </div>






            </div>







            {

                immagineAperta

                &&

                elemento.allegato?.url

                &&


                <div

                    style={styles.imageOverlay}

                    onClick={chiudiImmagine}

                >



                    <button

                        type="button"

                        style={styles.closeButton}

                        onClick={chiudiImmagine}

                        aria-label="Chiudi immagine"

                    >


                        ×


                    </button>





                    <img

                        src={elemento.allegato.url}

                        alt={`Elemento ${elemento.codice}`}

                        style={styles.fullscreenImage}

                        onClick={(event)=>

                            event.stopPropagation()

                        }

                    />



                </div>

            }





        </MainLayout>



    );



}









function Section({

                     title,

                     children

                 }){



    return(



        <div style={styles.section}>



            <h3 style={styles.sectionTitle}>


                {title}


            </h3>




            <div style={styles.grid}>


                {children}


            </div>



        </div>


    );



}









function Info({

                  label,

                  value

              }){



    return(



        <div style={styles.infoBox}>



            <div style={styles.label}>


                {label}


            </div>




            <div style={styles.value}>


                {

                    value !== null

                    &&

                    value !== undefined

                    &&

                    value !== ""

                        ?

                        value

                        :

                        "-"

                }


            </div>



        </div>


    );



}





export default ElementoDetailPage;