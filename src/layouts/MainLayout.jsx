import { useState } from "react";

import Sidebar
    from "../components/layout/Sidebar";

import Topbar
    from "../components/layout/Topbar";

import BottomNavbar
    from "../components/layout/BottomNavbar";


function MainLayout({ children }) {

    const [isSidebarOpen, setIsSidebarOpen] =
        useState(false);

    return (

        <div style={styles.page}>


            {isSidebarOpen && (

                <div
                    style={styles.overlay}

                    onClick={() =>
                        setIsSidebarOpen(false)
                    }
                />

            )}


            <Sidebar

                isOpen={isSidebarOpen}

                onClose={() =>
                    setIsSidebarOpen(false)
                }

            />


            <Topbar

                onMenuClick={() =>

                    setIsSidebarOpen(
                        !isSidebarOpen
                    )

                }

            />


            <div style={styles.content}>

                {children}

            </div>


            <BottomNavbar />

        </div>
    );
}


const styles = {

    page: {

        minHeight: "100vh",

        background:
            "linear-gradient(180deg, #f1f5f9, #e2e8f0)"
    },

    content: {

        padding: "18px",

        paddingTop: "95px",

        paddingBottom: "120px",

        maxWidth: "1200px",

        margin: "0 auto"
    },

    overlay: {

        position: "fixed",

        top: 0,

        left: 0,

        width: "100%",

        height: "100%",

        backgroundColor:
            "rgba(15,23,42,0.45)",

        backdropFilter: "blur(3px)",

        zIndex: 500
    }
};

export default MainLayout;