import MainLayout from "../layouts/MainLayout";

function HomePage() {

    return (

        <MainLayout>

            <div style={styles.container}>

                <h1 style={styles.title}>
                    Inspectra
                </h1>

                <p style={styles.subtitle}>

                    Gestione digitale delle
                    attività ispettive
                    infrastrutturali

                </p>


                <div style={styles.infoBox}>

                    Nessun elemento selezionato

                </div>

            </div>

        </MainLayout>
    );
}


const styles = {

    container: {

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        justifyContent: "center",

        marginTop: "80px",

        textAlign: "center"
    },

    title: {

        fontSize: "42px",

        marginBottom: "10px",

        color: "#1f2937"
    },

    subtitle: {

        fontSize: "18px",

        color: "#666",

        maxWidth: "400px",

        lineHeight: "1.5",

        marginBottom: "50px"
    },

    infoBox: {

        width: "100%",

        maxWidth: "350px",

        backgroundColor: "#fff",

        padding: "30px",

        borderRadius: "18px",

        boxShadow:
            "0 4px 12px rgba(0,0,0,0.08)",

        fontSize: "18px",

        fontWeight: "500",

        color: "#444"
    }
};

export default HomePage;