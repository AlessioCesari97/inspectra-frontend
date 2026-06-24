import { useEffect, useState }
    from "react";

import { Link }
    from "react-router-dom";

import MainLayout
    from "../layouts/MainLayout";

import { getProve }
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

    header: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        flexWrap: "wrap",

        gap: "12px"
    },

    title: {

        margin: 0,

        fontSize: "30px",

        fontWeight: "700",

        color: "#1e293b"
    },

    subtitle: {

        margin: "4px 0 0 0",

        color: "#64748b",

        fontSize: "14px"
    },

    addButton: {

        backgroundColor: "#1e293b",

        color: "#ffffff",

        padding: "11px 16px",

        borderRadius: "10px",

        textDecoration: "none",

        fontWeight: "600",

        fontSize: "14px",

        width: "fit-content"
    },

    list: {

        display: "flex",

        flexDirection: "column",

        gap: "12px"
    },

    card: {

        backgroundColor: "#ffffff",

        border: "1px solid #e2e8f0",

        borderRadius: "14px",

        padding: "18px",

        textDecoration: "none",

        display: "flex",

        flexDirection: "column",

        gap: "10px"
    },

    cardTitle: {

        margin: 0,

        color: "#1e293b",

        fontSize: "18px",

        fontWeight: "700"
    },

    cardInfo: {

        color: "#475569",

        fontSize: "14px",

        margin: 0
    }
};


function ProveListPage() {

    const [prove, setProve] =
        useState([]);


    useEffect(() => {

        loadProve();

    }, []);


    async function loadProve() {

        try {

            const data =
                await getProve();

            setProve(data);

        } catch(error) {

            console.error(error);
        }
    }


    return (

        <MainLayout>

            <div style={styles.container}>


                <div style={styles.header}>


                    <div>

                        <h1 style={styles.title}>
                            Catalogo Prove
                        </h1>

                        <p style={styles.subtitle}>
                            Elenco delle prove disponibili
                        </p>

                    </div>


                    <Link
                        to="/nuova-prova"
                        style={styles.addButton}
                    >

                        + Nuova Prova

                    </Link>

                </div>


                <div style={styles.list}>


                    {prove.map((prova) => (

                        <Link

                            key={prova.provaId}

                            to={`/prova/${prova.provaId}`}

                            style={styles.card}
                        >

                            <h3 style={styles.cardTitle}>

                                {prova.nomeProva}

                            </h3>

                            <p style={styles.cardInfo}>

                                <strong>Sigla:</strong>
                                {" "}
                                {prova.sigla}

                            </p>

                        </Link>

                    ))}

                </div>

            </div>

        </MainLayout>
    );
}

export default ProveListPage;