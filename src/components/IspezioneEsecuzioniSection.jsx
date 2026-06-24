import {
    useEffect,
    useState
}
    from "react";


import { Link }
    from "react-router-dom";


import {

    getEsecuzioniDisponibili,

    associaEsecuzioneIspezione

}
    from "../api/api";









function IspezioneEsecuzioniSection({ispezione}){





    const [search,setSearch] =
        useState("");



    const [stato,setStato] =
        useState("TUTTE");



    const [ordine,setOrdine] =
        useState("numero");



    const [disponibili,setDisponibili] =
        useState([]);










    useEffect(()=>{


        loadDisponibili();


    },[ispezione]);











    async function loadDisponibili(){



        if(!ispezione.pianoId){


            return;


        }






        try{



            const data =


                await getEsecuzioniDisponibili(


                    ispezione.pianoId


                );





            setDisponibili(

                data

            );





        }catch(error){


            console.error(error);


        }




    }













    async function handleAssocia(id){



        try{



            await associaEsecuzioneIspezione(


                id,


                ispezione.ispezioneId


            );







            window.location.reload();






        }catch(error){



            console.error(error);



        }




    }












    let prove =

        ispezione.esecuzioni || [];








    prove = prove.filter(p => {




        const testo =


            (

                (p.sigla || "")

                +

                (p.numero || "")

                +

                (p.nomeProva || "")

                +

                (p.codiceElemento || "")

                +

                (p.campata || "")

            )


                .toLowerCase();







        return (



            testo.includes(


                search.toLowerCase()


            )



            &&




            (


                stato === "TUTTE"


                ||


                p.stato === stato



            )



        );



    });









    prove.sort((a,b)=>{





        if(ordine==="numero"){



            return (a.numero || 0)

                -

                (b.numero || 0);



        }







        return String(

            a[ordine] || ""

        )

            .localeCompare(

                String(

                    b[ordine] || ""

                )

            );




    });     return(



        <div style={styles.card}>








            <div style={styles.header}>






                <div>


                    <h2 style={styles.title}>

                        Prove

                    </h2>




                    <p style={styles.subtitle}>

                        Prove associate all'ispezione

                    </p>


                </div>








                <Link

                    to={`/ispezione/${ispezione.ispezioneId}/nuova-esecuzione`}

                    style={styles.addButton}

                >


                    + Nuova Prova


                </Link>






            </div>









            <div style={styles.filters}>






                <input


                    placeholder="Cerca prova..."


                    value={search}


                    onChange={

                        e => setSearch(e.target.value)

                    }


                    style={styles.input}


                />









                <select


                    value={ordine}


                    onChange={

                        e => setOrdine(e.target.value)

                    }


                    style={styles.select}


                >



                    <option value="numero">

                        Numero prova

                    </option>



                    <option value="nomeProva">

                        Nome prova

                    </option>



                    <option value="codiceElemento">

                        Elemento

                    </option>



                    <option value="stato">

                        Stato

                    </option>



                </select>







            </div>










            <div style={styles.stateButtons}>





                {

                    [

                        "TUTTE",

                        "PREVISTA",

                        "ESEGUITA",

                        "NON_ESEGUIBILE",

                        "SPOSTATA",

                        "AGGIUNTA_IN_SITO"


                    ].map(s=>(




                        <button


                            key={s}


                            onClick={()=>setStato(s)}


                            style={

                                stato===s

                                    ?

                                    styles.activeState

                                    :

                                    styles.stateButton

                            }


                        >


                            {s}


                        </button>




                    ))

                }




            </div>











            {

                prove.length === 0


                    ?


                    <div style={styles.empty}>


                        Nessuna prova associata


                    </div>





                    :





                    <table style={styles.table}>





                        <thead>


                        <tr>


                            <th style={styles.th}>Sigla</th>


                            <th style={styles.th}>Numero</th>


                            <th style={styles.th}>Prova</th>


                            <th style={styles.th}>Elemento</th>


                            <th style={styles.th}>Campata</th>


                            <th style={styles.th}>Stato</th>


                        </tr>


                        </thead>









                        <tbody>


                        {


                            prove.map(p=>(




                                <tr key={p.esecuzioneId}>






                                    <td style={styles.td}>


                                        {p.sigla}


                                    </td>






                                    <td style={styles.td}>


                                        {p.numero}


                                    </td>








                                    <td style={styles.td}>




                                        <Link


                                            to={`/esecuzione/${p.esecuzioneId}`}


                                            style={styles.link}


                                        >


                                            {p.nomeProva}


                                        </Link>




                                    </td>








                                    <td style={styles.td}>


                                        {p.codiceElemento || "-"}


                                    </td>







                                    <td style={styles.td}>


                                        {p.campata || "-"}


                                    </td>








                                    <td style={styles.td}>


                                        {p.stato}


                                    </td>






                                </tr>




                            ))

                        }


                        </tbody>





                    </table>


            }













            <h2 style={styles.title}>


                Prove disponibili del piano


            </h2>










            {


                disponibili.length === 0


                    ?


                    <div style={styles.empty}>


                        Nessuna prova disponibile


                    </div>





                    :





                    disponibili.map(p=>(




                        <div

                            key={p.esecuzioneId}

                            style={styles.available}

                        >







                            <div>





                                <div style={styles.value}>



                                    {p.sigla}


                                    {" "}


                                    {p.numero}


                                    {" - "}


                                    {p.nomeProva}



                                </div>








                                <div style={styles.smallText}>



                                    Elemento:


                                    {" "}


                                    {p.codiceElemento || "-"}




                                    {" | Campata: "}




                                    {p.campata || "-"}




                                    {" | Stato: "}




                                    {p.stato}



                                </div>






                            </div>









                            <button


                                onClick={()=>handleAssocia(

                                    p.esecuzioneId

                                )}


                                style={styles.button}


                            >


                                Associa all'ispezione


                            </button>








                        </div>





                    ))


            }









        </div>




    );



} const styles = {





    card:{

        backgroundColor:"#ffffff",

        padding:"22px",

        borderRadius:"18px",

        border:"1px solid #e2e8f0",

        display:"flex",

        flexDirection:"column",

        gap:"18px",

        boxShadow:
            "0 4px 12px rgba(15,23,42,0.05)"

    },










    header:{

        display:"flex",

        justifyContent:"space-between",

        alignItems:"center",

        flexWrap:"wrap",

        gap:"15px"

    },










    title:{

        margin:0,

        color:"#1e293b",

        fontWeight:"700"

    },









    subtitle:{

        margin:"6px 0 0 0",

        color:"#64748b",

        fontSize:"14px"

    },










    addButton:{

        backgroundColor:"#1e293b",

        color:"#ffffff",

        padding:"12px 18px",

        borderRadius:"12px",

        textDecoration:"none",

        fontWeight:"700"

    },











    filters:{

        display:"flex",

        gap:"14px",

        flexWrap:"wrap"

    },











    input:{

        flex:1,

        minWidth:"250px",

        padding:"14px",

        borderRadius:"14px",

        border:"1px solid #e2e8f0",

        outline:"none"

    },










    select:{

        padding:"14px",

        borderRadius:"14px",

        border:"1px solid #e2e8f0",

        outline:"none"

    },










    stateButtons:{

        display:"flex",

        gap:"10px",

        flexWrap:"wrap"

    },











    stateButton:{

        background:"#ffffff",

        border:"1px solid #cbd5e1",

        borderRadius:"999px",

        padding:"9px 15px",

        fontWeight:"700",

        cursor:"pointer"

    },










    activeState:{

        background:"#1e293b",

        color:"#ffffff",

        border:"1px solid #1e293b",

        borderRadius:"999px",

        padding:"9px 15px",

        fontWeight:"700",

        cursor:"pointer"

    },










    table:{

        width:"100%",

        borderCollapse:"collapse",

        tableLayout:"fixed"

    },











    th:{

        textAlign:"left",

        padding:"12px",

        borderBottom:"1px solid #e2e8f0",

        color:"#64748b",

        fontSize:"13px",

        fontWeight:"700"

    },











    td:{

        padding:"12px",

        borderBottom:"1px solid #f1f5f9",

        color:"#1e293b",

        fontWeight:"600",

        wordBreak:"break-word"

    },











    link:{

        color:"#1e293b",

        textDecoration:"none",

        fontWeight:"700"

    },










    empty:{

        padding:"20px",

        background:"#f8fafc",

        border:"1px dashed #cbd5e1",

        borderRadius:"12px",

        textAlign:"center",

        color:"#64748b",

        fontWeight:"600"

    },











    available:{

        background:"#f8fafc",

        border:"1px solid #e2e8f0",

        borderRadius:"12px",

        padding:"15px",

        display:"flex",

        justifyContent:"space-between",

        alignItems:"center",

        gap:"15px",

        flexWrap:"wrap"

    },










    button:{

        backgroundColor:"#1e293b",

        color:"#ffffff",

        border:"none",

        padding:"10px 15px",

        borderRadius:"10px",

        fontWeight:"700",

        cursor:"pointer"

    },










    value:{

        color:"#1e293b",

        fontWeight:"700",

        fontSize:"15px"

    },










    smallText:{

        marginTop:"6px",

        color:"#64748b",

        fontSize:"13px",

        fontWeight:"600"

    }








};








export default IspezioneEsecuzioniSection;