import { useEffect, useState }
    from "react";

import {
    useParams,
    Link
}
    from "react-router-dom";

import MainLayout
    from "../layouts/MainLayout";

import { getProvaById }
    from "../api/api";


const styles = {

    container: {

        maxWidth: "1000px",

        margin: "0 auto",

        display: "flex",

        flexDirection: "column",

        gap: "18px",

        paddingBottom: "120px"
    },

    backButton: {

        display: "inline-flex",

        alignItems: "center",

        gap: "8px",

        width: "fit-content",

        backgroundColor: "#ffffff",

        color: "#1e293b",

        padding: "10px 14px",

        borderRadius: "10px",

        textDecoration: "none",

        fontWeight: "600",

        border: "1px solid #e2e8f0"
    },

    headerCard: {

        backgroundColor: "#ffffff",

        border: "1px solid #e2e8f0",

        borderRadius: "18px",

        padding: "22px",

        display: "flex",

        flexDirection: "column",

        gap: "18px"
    },

    headerTop: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "flex-start",

        gap: "20px",

        flexWrap: "wrap"
    },

    title: {

        margin: 0,

        fontSize: "30px",

        fontWeight: "700",

        color: "#1e293b"
    },

    subtitle: {

        margin: 0,

        color: "#64748b",

        fontSize: "14px"
    },

    editButton: {

        backgroundColor: "#f8fafc",

        color: "#1e293b",

        border: "1px solid #cbd5e1",

        borderRadius: "10px",

        padding: "10px 14px",

        textDecoration: "none",

        fontWeight: "600",

        fontSize: "14px"
    },

    infoGrid: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

        gap: "14px"
    },

    infoBox: {

        backgroundColor: "#f8fafc",

        border: "1px solid #e2e8f0",

        borderRadius: "12px",

        padding: "14px"
    },

    infoTitle: {

        fontSize: "12px",

        color: "#64748b",

        fontWeight: "600",

        marginBottom: "6px"
    },

    infoValue: {

        color: "#1e293b",

        fontWeight: "600",

        wordBreak: "break-word"
    },

    section: {

        display: "flex",

        flexDirection: "column",

        gap: "10px"
    },

    sectionTitle: {

        margin: 0,

        fontSize: "18px",

        color: "#1e293b"
    },

    text: {

        margin: 0,

        color: "#475569",

        lineHeight: "1.6"
    }
};


function ProvaDetailPage() {

    const { id } = useParams();

    const [prova, setProva] =
        useState(null);


    useEffect(() => {

        loadProva();

    }, [id]);


    async function loadProva() {

        try {

            const data =
                await getProvaById(id);

            setProva(data);

        } catch(error) {

            console.error(error);
        }
    }


    if (!prova) {

        return (

            <MainLayout>

                <p>Caricamento...</p>

            </MainLayout>
        );
    }


    return (

        <MainLayout>

            <div style={styles.container}>


                <Link
                    to="/prove"
                    style={styles.backButton}
                >

                    ← Catalogo Prove

                </Link>


                <div style={styles.headerCard}>


                    <div style={styles.headerTop}>


                        <div>

                            <h1 style={styles.title}>

                                {prova.nomeProva}

                            </h1>


                            <p style={styles.subtitle}>
                                Dettaglio prova
                            </p>

                        </div>


                        <Link
                            to={`/prova/${prova.provaId}/edit`}
                            style={styles.editButton}
                        >

                            Modifica

                        </Link>

                    </div>


                    <div style={styles.infoGrid}>


                        <div style={styles.infoBox}>

                            <div style={styles.infoTitle}>
                                Sigla
                            </div>

                            <div style={styles.infoValue}>
                                {prova.sigla}
                            </div>

                        </div>

                    </div>


                    <div style={styles.section}>


                        <h3 style={styles.sectionTitle}>
                            Descrizione
                        </h3>


                        <p style={styles.text}>

                            {prova.descrizione ||
                                "Nessuna descrizione"}

                        </p>

                    </div>


                    <div style={styles.section}>


                        <h3 style={styles.sectionTitle}>
                            Note Generali
                        </h3>


                        <p style={styles.text}>

                            {prova.noteGenerali ||
                                "Nessuna nota"}

                        </p>

                    </div>

                </div>

            </div>

        </MainLayout>
    );
}

export default ProvaDetailPage;