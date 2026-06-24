import { Link }
    from "react-router-dom";



function ElementoCard({ elemento }) {


    return (


        <Link

            to={`/elemento/${elemento.elementoId}`}

            style={styles.link}

        >



            <div style={styles.card}>



                <div style={styles.header}>


                    <div>


                        <h3 style={styles.title}>


                            {elemento.codice}


                        </h3>



                        <p style={styles.subtitle}>


                            Elemento strutturale


                        </p>



                    </div>





                    <div style={styles.badge}>


                        {elemento.tipoElementoNome || "-"}


                    </div>



                </div>









                <div style={styles.infoGrid}>





                    <div style={styles.infoBox}>


                        <div style={styles.label}>

                            Campata

                        </div>



                        <div style={styles.value}>


                            {elemento.campata || "-"}


                        </div>


                    </div>








                    <div style={styles.infoBox}>


                        <div style={styles.label}>


                            Lato


                        </div>



                        <div style={styles.value}>


                            {elemento.lato || "-"}


                        </div>



                    </div>




                </div>





            </div>



        </Link>


    );


}








const styles = {



    link: {


        textDecoration: "none"


    },




    card: {


        backgroundColor: "#ffffff",

        border: "1px solid #e2e8f0",

        borderRadius: "18px",

        padding: "18px",


        display: "flex",

        flexDirection: "column",

        gap: "16px",


        boxShadow:

            "0 2px 8px rgba(15,23,42,0.04)"


    },





    header: {


        display: "flex",

        justifyContent: "space-between",

        alignItems: "flex-start",

        gap: "20px"


    },






    title: {


        margin: 0,

        color: "#1e293b",

        fontSize: "20px",

        fontWeight: "700"


    },






    subtitle: {


        marginTop: "5px",

        color: "#64748b",

        fontSize: "13px"


    },







    badge: {


        backgroundColor: "#f1f5f9",

        color: "#334155",

        padding: "6px 12px",

        borderRadius: "999px",

        fontSize: "12px",

        fontWeight: "700"


    },







    infoGrid: {


        display: "grid",

        gridTemplateColumns:

            "repeat(auto-fit, minmax(150px, 1fr))",

        gap: "12px"


    },







    infoBox: {


        backgroundColor: "#f8fafc",

        border: "1px solid #e2e8f0",

        borderRadius: "12px",

        padding: "12px"


    },






    label: {


        color: "#64748b",

        fontSize: "12px",

        fontWeight: "600",

        marginBottom: "5px"


    },






    value: {


        color: "#1e293b",

        fontWeight: "600"


    }


};





export default ElementoCard;