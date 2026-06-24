import { Link }
    from "react-router-dom";





const styles = {


    card: {

        backgroundColor: "#ffffff",

        border: "1px solid #e2e8f0",

        borderRadius: "18px",

        padding: "20px",

        textDecoration: "none",

        display: "flex",

        flexDirection: "column",

        gap: "18px",

        boxShadow:
            "0 4px 12px rgba(15,23,42,0.05)",

        transition: "0.2s"
    },



    header: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        gap: "15px"
    },



    nome: {

        margin: 0,

        color: "#1e293b",

        fontSize: "22px",

        fontWeight: "700"
    },



    arrow: {

        color: "#64748b",

        fontSize: "22px",

        fontWeight: "600"
    },




    infoGrid: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit,minmax(160px,1fr))",

        gap: "16px"
    },




    infoBlock: {

        display: "flex",

        flexDirection: "column",

        gap: "5px"
    },




    label: {

        color: "#64748b",

        fontSize: "12px",

        fontWeight: "700"
    },




    value: {

        color: "#1e293b",

        fontSize: "15px",

        fontWeight: "600"
    },




    footer: {

        display: "flex",

        gap: "20px",

        flexWrap: "wrap",

        paddingTop: "14px",

        borderTop: "1px solid #f1f5f9"
    },



    counter: {

        color: "#475569",

        fontSize: "14px",

        fontWeight: "600"
    }

};









function AssetCard({ asset }) {



    return (


        <Link

            to={`/asset/${asset.assetId}`}

            style={styles.card}

        >




            <div style={styles.header}>



                <h2 style={styles.nome}>


                    {asset.nome}


                </h2>




                <span style={styles.arrow}>


                    →


                </span>



            </div>








            <div style={styles.infoGrid}>





                <div style={styles.infoBlock}>


                    <span style={styles.label}>


                        Strada


                    </span>



                    <span style={styles.value}>


                        {asset.strada || "-"}


                    </span>


                </div>







                <div style={styles.infoBlock}>


                    <span style={styles.label}>


                        Gestore


                    </span>



                    <span style={styles.value}>


                        {asset.gestore || "-"}


                    </span>


                </div>








                <div style={styles.infoBlock}>


                    <span style={styles.label}>


                        Posizione


                    </span>



                    <span style={styles.value}>


                        {asset.posizione || "-"}


                    </span>


                </div>





            </div>










            <div style={styles.footer}>


    <span style={styles.counter}>


        {asset.numeroPiani || 0}

        {" "}

        Piani


    </span>





                <span style={styles.counter}>


        {asset.numeroElementi || 0}

                    {" "}

                    Elementi


    </span>





                <span style={styles.counter}>


        {asset.numeroIspezioni || 0}

                    {" "}

                    Ispezioni


    </span>



            </div>




        </Link>


    );

}




export default AssetCard;