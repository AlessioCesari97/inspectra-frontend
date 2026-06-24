import { Link }
    from "react-router-dom";


function Topbar({ onMenuClick }) {

    function handleRefresh() {

        window.location.reload();
    }


    return (

        <div style={styles.topbar}>


            <button
                onClick={onMenuClick}
                style={styles.menuButton}
            >

                ☰

            </button>


            <Link
                to="/"
                style={styles.title}
            >

                INSPECTRA

            </Link>


            <button
                style={styles.refreshButton}
                onClick={handleRefresh}
            >

                ↻

            </button>

        </div>
    );
}


const styles = {

    topbar: {

        position: "fixed",

        top: 0,

        left: 0,

        width: "100%",

        height: "72px",

        background:
            "linear-gradient(90deg, #0f172a, #1e293b)",

        color: "white",

        display: "flex",

        alignItems: "center",

        justifyContent: "space-between",

        padding: "0 18px",

        zIndex: 900,

        boxShadow:
            "0 4px 20px rgba(0,0,0,0.12)"
    },

    menuButton: {

        background:
            "rgba(255,255,255,0.08)",

        border: "none",

        color: "white",

        width: "44px",

        height: "44px",

        borderRadius: "14px",

        fontSize: "24px",

        cursor: "pointer"
    },

    title: {

        fontSize: "22px",

        color: "white",

        textDecoration: "none",

        fontWeight: "800",

        letterSpacing: "2px"
    },

    refreshButton: {

        background:
            "rgba(255,255,255,0.08)",

        border: "none",

        color: "white",

        width: "44px",

        height: "44px",

        borderRadius: "14px",

        fontSize: "22px",

        cursor: "pointer"
    }
};

export default Topbar;