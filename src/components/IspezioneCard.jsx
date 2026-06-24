import { Link }
    from "react-router-dom";








function IspezioneCard({ispezione}){



    return(


        <Link

            to={`/ispezione/${ispezione.ispezioneId}`}

            style={styles.card}

        >








            <div style={styles.header}>





                <h2 style={styles.nome}>


                    {ispezione.titoloIspezione}


                </h2>







                <span style={styles.arrow}>


                    →


                </span>






            </div>









            <div style={styles.infoGrid}>








                <Info


                    label="Data"


                    value={ispezione.dataIspezione}


                />









                <Info


                    label="Opera"


                    value={ispezione.assetNome}


                />










                <Info


                    label="Piano"


                    value={ispezione.codicePiano}


                />









                <Info


                    label="Stato"


                    value={ispezione.stato}


                />









            </div>









            <div style={styles.footer}>





                <span style={styles.counter}>


                    {ispezione.numeroProve || 0}


                    {" "}


                    Prove


                </span>





            </div>









        </Link>



    );


}










function Info({label,value}){


    return(


        <div style={styles.block}>





            <span style={styles.label}>


                {label}


            </span>








            <span style={styles.value}>


                {value || "-"}


            </span>






        </div>



    );


} const styles = {




    card: {

        backgroundColor:"#ffffff",

        border:"1px solid #e2e8f0",

        borderRadius:"18px",

        padding:"20px",

        textDecoration:"none",

        display:"flex",

        flexDirection:"column",

        gap:"18px",

        color:"#1e293b",

        boxShadow:

            "0 4px 12px rgba(15,23,42,0.05)"

    },









    header: {

        display:"flex",

        justifyContent:"space-between",

        alignItems:"center",

        gap:"15px"

    },










    nome: {

        margin:0,

        color:"#1e293b",

        fontSize:"22px",

        fontWeight:"700"

    },










    arrow: {

        color:"#64748b",

        fontSize:"22px",

        fontWeight:"600"

    },










    infoGrid: {

        display:"grid",

        gridTemplateColumns:

            "repeat(auto-fit,minmax(160px,1fr))",

        gap:"16px"

    },










    block: {

        display:"flex",

        flexDirection:"column",

        gap:"5px"

    },










    label: {

        color:"#64748b",

        fontSize:"12px",

        fontWeight:"700"

    },










    value: {

        color:"#1e293b",

        fontSize:"15px",

        fontWeight:"600"

    },











    footer: {

        borderTop:"1px solid #f1f5f9",

        paddingTop:"14px",

        display:"flex",

        justifyContent:"space-between",

        alignItems:"center"

    },










    counter: {

        color:"#475569",

        fontWeight:"700",

        fontSize:"14px"

    }




};









export default IspezioneCard;