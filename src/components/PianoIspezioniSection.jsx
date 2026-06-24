import { useState }
    from "react";


import {
    Link,
    useNavigate
}
    from "react-router-dom";





const styles = {


    card: {

        backgroundColor: "#ffffff",

        border: "1px solid #e2e8f0",

        borderRadius: "18px",

        padding: "22px",

        display: "flex",

        flexDirection: "column",

        gap: "18px"

    },



    header: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        cursor: "pointer",

        color: "#1e293b"

    },



    button: {

        backgroundColor: "#1e293b",

        color: "#ffffff",

        padding: "10px 14px",

        borderRadius: "10px",

        textDecoration: "none",

        fontWeight: "600"

    },



    filters: {

        display: "flex",

        flexWrap: "wrap",

        gap: "10px"

    },



    filterButton: {

        backgroundColor: "#ffffff",

        border: "1px solid #cbd5e1",

        borderRadius: "10px",

        padding: "8px 14px",

        cursor: "pointer",

        fontWeight: "600",

        color: "#1e293b"

    },



    filterActive: {

        backgroundColor: "#1e293b",

        color: "#ffffff",

        border: "1px solid #1e293b",

        borderRadius: "10px",

        padding: "8px 14px",

        cursor: "pointer",

        fontWeight: "600"

    },



    input: {

        height: "42px",

        borderRadius: "10px",

        border: "1px solid #cbd5e1",

        padding: "0 12px",

        outline: "none"

    },



    select: {

        height: "42px",

        borderRadius: "10px",

        border: "1px solid #cbd5e1",

        padding: "0 12px"

    },



    tableWrapper: {

        overflowX: "auto"

    },



    table: {

        width: "100%",

        minWidth: "600px",

        borderCollapse: "collapse"

    },

    label: {

        color: "#64748b",

        fontSize: "12px",

        fontWeight: "700"
    },



    th: {

        textAlign: "left",

        padding: "12px",

        borderBottom: "1px solid #e2e8f0",

        color: "#64748b"

    },



    td: {

        padding: "12px",

        borderBottom: "1px solid #f1f5f9",

        color: "#1e293b"

    },



    row: {

        cursor: "pointer"

    }


};









function PianoIspezioniSection({ piano }){


    const navigate =
        useNavigate();



    const [open,setOpen] =
        useState(false);



    const [statoFiltro,setStatoFiltro] =
        useState("Tutte");



    const [search,setSearch] =
        useState("");



    const [ordine,setOrdine] =
        useState("dataIspezione");








    const ispezioni =


        [...(piano.ispezioni || [])]


            .filter(i =>

                statoFiltro === "Tutte"

                ||

                i.stato === statoFiltro

            )



            .filter(i=>{


                const testo =

                    `${i.titoloIspezione}
                    ${i.dataIspezione}
                    ${i.stato}`

                        .toLowerCase();



                return testo.includes(

                    search.toLowerCase()

                );


            })



            .sort((a,b)=>{


                return String(

                    a[ordine] || ""

                )

                    .localeCompare(

                        String(

                            b[ordine] || ""

                        )

                    );


            });









    return(


        <div style={styles.card}>







            <div

                style={styles.header}

                onClick={()=>setOpen(!open)}

            >




                <h2>

                    {open ? "▼" : "▶"} Ispezioni

                </h2>








                {piano.stato !== "ARCHIVIATO" &&


                    <Link


                        to={`/piano/${piano.pianoId}/nuova-ispezione`}


                        style={styles.button}


                        onClick={(e)=>

                            e.stopPropagation()

                        }

                    >


                        + Nuova Ispezione


                    </Link>


                }




            </div>









            {open &&


                <>






                    <div style={styles.filters}>


                        {[

                            "Tutte",

                            "BOZZA",

                            "IN_CORSO",

                            "COMPLETATA",

                            "FIRMATA",

                            "ARCHIVIATA"


                        ].map(s=>(



                            <button


                                key={s}


                                onClick={()=>setStatoFiltro(s)}


                                style={

                                    statoFiltro === s

                                        ?

                                        styles.filterActive

                                        :

                                        styles.filterButton

                                }

                            >


                                {s}


                            </button>



                        ))}


                    </div>








                    <input


                        placeholder="Cerca ispezione..."


                        value={search}


                        onChange={(e)=>

                            setSearch(

                                e.target.value

                            )

                        }


                        style={styles.input}


                    />






                    <div style={styles.label}>

                        Ordina per:

                    </div>


                    <select


                        value={ordine}


                        onChange={(e)=>

                            setOrdine(

                                e.target.value

                            )

                        }


                        style={styles.select}


                    >



                        <option value="dataIspezione">

                            Ordina per data

                        </option>



                        <option value="titoloIspezione">

                            Ordina per titolo

                        </option>



                        <option value="stato">

                            Ordina per stato

                        </option>



                    </select>









                    <div style={styles.tableWrapper}>




                        <table style={styles.table}>




                            <thead>


                            <tr>


                                <th style={styles.th}>

                                    Titolo

                                </th>



                                <th style={styles.th}>

                                    Data

                                </th>



                                <th style={styles.th}>

                                    Stato

                                </th>


                            </tr>


                            </thead>







                            <tbody>


                            {


                                ispezioni.map(i=>(




                                    <tr


                                        key={i.ispezioneId}


                                        style={styles.row}


                                        onClick={()=>

                                            navigate(

                                                `/ispezione/${i.ispezioneId}`

                                            )

                                        }


                                    >




                                        <td style={styles.td}>

                                            {i.titoloIspezione}

                                        </td>




                                        <td style={styles.td}>


                                            {

                                                i.dataIspezione

                                                ||

                                                "-"

                                            }


                                        </td>





                                        <td style={styles.td}>

                                            {i.stato}

                                        </td>





                                    </tr>



                                ))


                            }


                            </tbody>



                        </table>




                    </div>





                </>

            }




        </div>


    );


}





export default PianoIspezioniSection;