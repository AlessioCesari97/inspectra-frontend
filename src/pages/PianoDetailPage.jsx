import { useEffect, useState }
    from "react";


import {
    useParams,
    Link,
    useLocation
}
    from "react-router-dom";


import MainLayout
    from "../layouts/MainLayout";


import {
    getPianoById,
    archiviaPiano
}
    from "../api/api";


import PianoEsecuzioniSection
    from "../components/PianoEsecuzioniSection";


import PianoIspezioniSection
    from "../components/PianoIspezioniSection";








const styles = {


    container: {

        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        paddingBottom: "120px"

    },


    card: {

        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "18px",
        padding: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "20px"

    },


    header: {

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px"

    },


    actions: {

        display: "flex",
        gap: "10px",
        flexWrap: "wrap"

    },


    title: {

        margin: 0,
        fontSize: "32px",
        fontWeight: "700",
        color: "#1e293b"

    },


    subtitle: {

        margin: 0,
        color: "#64748b"

    },


    button: {

        backgroundColor: "#1e293b",
        color: "#ffffff",
        padding: "11px 16px",
        borderRadius: "10px",
        textDecoration: "none",
        fontWeight: "600",
        border: "none",
        cursor: "pointer"

    },


    disabledButton: {

        backgroundColor: "#94a3b8",
        color: "#ffffff",
        padding: "11px 16px",
        borderRadius: "10px",
        textDecoration: "none",
        fontWeight: "600",
        border: "none",
        cursor: "not-allowed"

    },


    backButton: {

        width: "fit-content",
        backgroundColor: "#ffffff",
        color: "#1e293b",
        padding: "10px 14px",
        borderRadius: "10px",
        textDecoration: "none",
        border: "1px solid #e2e8f0",
        fontWeight: "600"

    },


    grid: {

        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
        gap: "14px"

    },


    box: {

        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "14px"

    },


    archivedBox: {

        background: "#f1f5f9",
        border: "1px solid #cbd5e1",
        padding: "12px",
        borderRadius: "10px",
        color: "#475569",
        fontWeight: "600"

    },


    successBox: {

        backgroundColor: "#f8fafc",
        border: "1px solid #cbd5e1",
        borderRadius: "10px",
        padding: "12px",
        color: "#1e293b",
        fontWeight: "600"

    },


    errorBox: {

        backgroundColor: "#f8fafc",
        border: "1px solid #cbd5e1",
        borderRadius: "10px",
        padding: "12px",
        color: "#1e293b",
        fontWeight: "600"

    },


    editButton: {

        backgroundColor: "#ffffff",
        color: "#1e293b",
        padding: "11px 16px",
        borderRadius: "10px",
        textDecoration: "none",
        fontWeight: "600",
        border: "1px solid #cbd5e1",
        cursor: "pointer"

    },


    label: {

        color: "#64748b",
        fontSize: "12px",
        fontWeight: "700"

    },


    value: {

        marginTop: "6px",
        color: "#1e293b",
        fontWeight: "600"

    },


    link: {

        color: "#1e293b",
        textDecoration: "none",
        fontWeight: "600"

    }

};








function PianoDetailPage() {


    const { id } =
        useParams();


    const location =
        useLocation();



    const [piano, setPiano] =
        useState(null);


    const [archiving, setArchiving] =
        useState(false);


    const [successMessage, setSuccessMessage] =
        useState("");


    const [errorMessage, setErrorMessage] =
        useState("");








    useEffect(() => {


        loadPiano();


    }, [id]);








    async function loadPiano() {


        try {


            const data =
                await getPianoById(id);



            setPiano(data);



        } catch (error) {


            console.error(error);


        }


    }








    async function handleArchivia() {


        if (archiving) {

            return;

        }



        if (piano.stato !== "COMPLETATO") {


            setErrorMessage(

                "Il piano può essere archiviato solo quando è completato."

            );


            return;

        }



        const conferma =
            window.confirm(

                "Vuoi archiviare questo piano? Dopo l'archiviazione non sarà più possibile modificarlo."

            );



        if (!conferma) {

            return;

        }



        try {


            setArchiving(true);

            setSuccessMessage("");

            setErrorMessage("");



            const pianoArchiviato =

                await archiviaPiano(id);



            /*
             * Usiamo direttamente la risposta
             * restituita dalla PUT.
             *
             * Non facciamo una seconda GET.
             */


            setPiano(pianoArchiviato);



            setSuccessMessage(

                "Piano archiviato correttamente."

            );



        } catch (error) {


            console.error(error);



            setErrorMessage(

                error.message

                ||

                "Errore durante l'archiviazione del piano."

            );


        } finally {


            setArchiving(false);


        }


    }








    if (!piano) {


        return (

            <MainLayout>


                Caricamento...


            </MainLayout>

        );


    }








    const backLink =

        location.state?.fromAsset

            ?

            `/asset/${location.state.fromAsset}`

            :

            "/piani";



    const backText =

        location.state?.fromAsset

            ?

            "← Torna all'Opera"

            :

            "← Piani Indagine";








    return (


        <MainLayout>


            <div style={styles.container}>







                <Link

                    to={backLink}

                    style={styles.backButton}

                >

                    {backText}

                </Link>








                <div style={styles.card}>








                    <div style={styles.header}>







                        <div>


                            <h1 style={styles.title}>

                                {piano.codicePiano}

                            </h1>




                            <p style={styles.subtitle}>

                                Dettaglio piano indagine

                            </p>


                        </div>








                        {piano.stato !== "ARCHIVIATO" &&


                            <div style={styles.actions}>


                                <Link

                                    to={`/piani/${piano.pianoId}/edit`}

                                    style={styles.editButton}

                                >

                                    Modifica

                                </Link>






                                {piano.stato === "COMPLETATO" &&


                                    <button

                                        type="button"

                                        onClick={handleArchivia}

                                        disabled={archiving}

                                        style={

                                            archiving

                                                ?

                                                styles.disabledButton

                                                :

                                                styles.button

                                        }

                                    >

                                        {

                                            archiving

                                                ?

                                                "Archiviazione..."

                                                :

                                                "Archivia"

                                        }

                                    </button>

                                }


                            </div>


                        }








                        {piano.stato === "ARCHIVIATO" &&


                            <div style={styles.archivedBox}>

                                Piano archiviato - sola consultazione

                            </div>


                        }






                    </div>








                    {successMessage &&


                        <div style={styles.successBox}>

                            {successMessage}

                        </div>


                    }




                    {errorMessage &&


                        <div style={styles.errorBox}>

                            {errorMessage}

                        </div>


                    }








                    <div style={styles.grid}>


                        <Info

                            label="Revisione"

                            value={piano.revisione}

                        />




                        <Info

                            label="Data"

                            value={piano.data}

                        />








                        <div style={styles.box}>


                            <div style={styles.label}>

                                Opera collegata

                            </div>




                            {

                                piano.assetId

                                    ?

                                    <Link

                                        to={`/asset/${piano.assetId}`}

                                        style={styles.link}

                                    >

                                        {piano.assetNome}

                                    </Link>


                                    :


                                    <div style={styles.value}>

                                        -

                                    </div>


                            }


                        </div>


                    </div>








                    <div>


                        <h3>

                            Descrizione

                        </h3>



                        <p>

                            {

                                piano.descrizione

                                ||

                                "Nessuna descrizione presente"

                            }

                        </p>


                    </div>








                    <div style={styles.grid}>


                        <Info

                            label="Redatto"

                            value={piano.redatto}

                        />



                        <Info

                            label="Verificato"

                            value={piano.verificato}

                        />



                        <Info

                            label="Approvato"

                            value={piano.approvato}

                        />


                    </div>






                </div>








                <PianoEsecuzioniSection

                    piano={piano}

                />







                <PianoIspezioniSection

                    piano={piano}

                />






            </div>


        </MainLayout>


    );


}








function Info({ label, value }) {


    return (


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




export default PianoDetailPage;