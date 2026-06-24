import {
    Link,
    useLocation
}
    from "react-router-dom";

function BottomNavbar() {

    const location = useLocation();

    const isPiani =
        location.pathname.includes("/piani");

    const isIspezioni =
        location.pathname.includes("/ispezioni");


    return (

        <div style={styles.wrapper}>

            <div style={styles.navbar}>


                <Link
                    to="/piani"
                    style={{
                        ...styles.link,
                        ...(isPiani
                            ? styles.activeLink
                            : styles.inactiveLink)
                    }}
                >

                    <span style={styles.icon}>
                        📋
                    </span>

                    <span>
                        Piani
                    </span>

                </Link>


                <Link
                    to="/ispezioni"
                    style={{
                        ...styles.link,
                        ...(isIspezioni
                            ? styles.activeLink
                            : styles.inactiveLink)
                    }}
                >

                    <span style={styles.icon}>
                        🔍
                    </span>

                    <span>
                        Ispezioni
                    </span>

                </Link>

            </div>

        </div>
    );
}


const styles = {

    wrapper: {

        position: "fixed",

        bottom: 0,

        left: 0,

        width: "100%",

        padding: "12px",

        background:
            "linear-gradient(to top, #f1f5f9, transparent)",

        zIndex: 1000
    },

    navbar: {

        display: "flex",

        gap: "12px",

        backgroundColor: "#ffffff",

        padding: "10px",

        borderRadius: "24px",

        boxShadow:
            "0 8px 25px rgba(15,23,42,0.12)",

        border: "1px solid #e2e8f0",

        maxWidth: "700px",

        margin: "0 auto"
    },

    link: {

        flex: 1,

        display: "flex",

        flexDirection: "column",

        justifyContent: "center",

        alignItems: "center",

        gap: "4px",

        textDecoration: "none",

        padding: "14px 10px",

        borderRadius: "18px",

        fontWeight: "700",

        fontSize: "14px",

        transition: "all 0.2s ease",

        minHeight: "62px"
    },

    activeLink: {

        background:
            "linear-gradient(135deg, #2563eb, #1d4ed8)",

        color: "#ffffff",

        transform: "scale(0.98)",

        boxShadow:
            "inset 0 2px 8px rgba(0,0,0,0.15)"
    },

    inactiveLink: {

        backgroundColor: "#f8fafc",

        color: "#334155",

        border: "1px solid #e2e8f0"
    },

    icon: {

        fontSize: "20px"
    }
};

export default BottomNavbar;