import { Link } from "react-router-dom";

function Sidebar({

                     isOpen,
                     onClose

                 }) {

    return (

        <>

            <div
                style={{
                    ...styles.sidebar,
                    left: isOpen ? "0" : "-290px"
                }}
            >

                <div style={styles.header}>

                    <h2 style={styles.logo}>
                        INSPECTRA
                    </h2>

                    <p style={styles.subtitle}>
                        Inspection Management
                    </p>

                </div>


                <nav style={styles.nav}>


                    <Link
                        to="/assets"
                        style={styles.link}
                        onClick={onClose}
                    >

                        🌉 Opere

                    </Link>


                    <Link
                        to="/prove"
                        style={styles.link}
                        onClick={onClose}
                    >

                        ⚙️ Catalogo Prove

                    </Link>

                    <Link
                        to="/archivio-ispezioni"
                        style={styles.link}
                        onClick={onClose}
                    >

                        📁 Archivio Ispezioni

                    </Link>


                    <div style={styles.separator}></div>


                    <button style={styles.bottomButton}>
                        ℹ️ About
                    </button>

                    <button style={styles.bottomButton}>
                        💬 Feedback
                    </button>

                    <button style={styles.bottomButton}>
                        📤 Share
                    </button>


                    <button style={styles.logoutButton}>
                        Logout
                    </button>

                </nav>

            </div>

        </>
    );
}


const styles = {

    sidebar: {

        position: "fixed",

        top: 0,

        width: "290px",

        height: "100vh",

        background:
            "linear-gradient(180deg, #0f172a, #1e293b)",

        color: "white",

        transition: "0.3s ease",

        padding: "28px 22px",

        zIndex: 1000,

        boxShadow:
            "8px 0 25px rgba(0,0,0,0.25)"
    },

    header: {

        marginBottom: "40px"
    },

    logo: {

        margin: 0,

        fontSize: "28px",

        fontWeight: "800",

        letterSpacing: "2px"
    },

    subtitle: {

        marginTop: "8px",

        color: "#94a3b8",

        fontSize: "13px"
    },

    nav: {

        display: "flex",

        flexDirection: "column",

        gap: "14px"
    },

    link: {

        color: "white",

        textDecoration: "none",

        fontSize: "16px",

        fontWeight: "600",

        padding: "14px 16px",

        borderRadius: "16px",

        backgroundColor:
            "rgba(255,255,255,0.05)",

        transition: "0.2s ease"
    },

    separator: {

        margin: "20px 0",

        borderBottom:
            "1px solid rgba(255,255,255,0.1)"
    },

    bottomButton: {

        background: "none",

        border: "none",

        color: "#cbd5e1",

        textAlign: "left",

        fontSize: "15px",

        cursor: "pointer",

        padding: "10px 6px"
    },

    logoutButton: {

        marginTop: "30px",

        background:
            "linear-gradient(135deg, #2563eb, #1d4ed8)",

        color: "white",

        border: "none",

        padding: "14px",

        cursor: "pointer",

        borderRadius: "16px",

        fontWeight: "700",

        fontSize: "15px",

        boxShadow:
            "0 6px 15px rgba(37,99,235,0.3)"
    }
};

export default Sidebar;