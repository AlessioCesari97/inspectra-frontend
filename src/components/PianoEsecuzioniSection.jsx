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


    label: {

        color: "#64748b",

        fontSize: "12px",

        fontWeight: "700"
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

        minWidth: "800px",

        borderCollapse: "collapse"

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









function PianoEsecuzioniSection({ piano }){


    const navigate =
        useNavigate();



    const [open,setOpen] =
        useState(false);



    const [provaFiltro,setProvaFiltro] =
        useState("Tutte");



    const [statoFiltro,setStatoFiltro] =
        useState("Tutte");



    const [search,setSearch] =
        useState("");



    const [ordine,setOrdine] =
        useState("numero");








    const prove = [

        "Tutte",

        ...new Set(

            (piano.esecuzioni || [])

                .map(e => e.nomeProva)

                .filter(Boolean)

        )

    ];








    const esecuzioni =


        [...(piano.esecuzioni || [])]


            .filter(e =>

                provaFiltro === "Tutte"

                ||

                e.nomeProva === provaFiltro

            )



            .filter(e =>

                statoFiltro === "Tutte"

                ||

                e.stato === statoFiltro

            )



            .filter(e => {


                const testo =

                    `${e.numero}
                    ${e.nomeProva}
                    ${e.sigla}
                    ${e.codiceElemento}
                    ${e.campata}
                    ${e.titoloIspezione}
                    ${e.stato}`

                        .toLowerCase();



                return testo.includes(

                    search.toLowerCase()

                );


            })



            .sort((a,b)=>{


                if(ordine === "numero"){


                    return (a.numero || 0)

                        -

                        (b.numero || 0);

                }



                return String(a[ordine] || "")

                    .localeCompare(

                        String(b[ordine] || "")

                    );


            });









    return(


        <div style={styles.card}>






            <div

                style={styles.header}

                onClick={()=>setOpen(!open)}

            >


                <h2>

                    {open ? "▼" : "▶"} Prove

                </h2>







                {piano.stato !== "ARCHIVIATO" &&


                    <Link

                        to={`/piano/${piano.pianoId}/nuova-esecuzione`}

                        style={styles.button}

                        onClick={(e)=>e.stopPropagation()}

                    >

                        + Nuova Prova

                    </Link>


                }


            </div>








            {open &&

                <>

                    <div style={styles.filters}>


                        {prove.map(p=>(


                            <button

                                key={p}

                                onClick={()=>setProvaFiltro(p)}

                                style={

                                    provaFiltro === p

                                        ? styles.filterActive

                                        : styles.filterButton

                                }

                            >

                                {p}

                            </button>


                        ))}


                    </div>









                    <div style={styles.filters}>


                        {[

                            "Tutte",

                            "PREVISTA",

                            "ESEGUITA",

                            "NON_ESEGUIBILE",

                            "SPOSTATA",

                            "AGGIUNTA_IN_SITO"


                        ].map(s=>(


                            <button

                                key={s}

                                onClick={()=>setStatoFiltro(s)}

                                style={

                                    statoFiltro === s

                                        ? styles.filterActive

                                        : styles.filterButton

                                }

                            >

                                {s}

                            </button>


                        ))}


                    </div>








                    <input

                        placeholder="Cerca prova..."

                        value={search}

                        onChange={e=>setSearch(e.target.value)}

                        style={styles.input}

                    />



                    <div style={styles.label}>

                        Ordina per:

                    </div>



                    <select

                        value={ordine}

                        onChange={e=>setOrdine(e.target.value)}

                        style={styles.select}

                    >


                        <option value="numero">
                            Ordina per numero
                        </option>


                        <option value="nomeProva">
                            Ordina per prova
                        </option>


                        <option value="stato">
                            Ordina per stato
                        </option>


                    </select>








                    <div style={styles.tableWrapper}>


                        <table style={styles.table}>


                            <thead>

                            <tr>

                                <th style={styles.th}>Sigla</th>

                                <th style={styles.th}>Numero</th>

                                <th style={styles.th}>Prova</th>

                                <th style={styles.th}>Elemento</th>

                                <th style={styles.th}>Campata</th>

                                <th style={styles.th}>Ispezione</th>

                                <th style={styles.th}>Stato</th>

                            </tr>

                            </thead>



                            <tbody>


                            {esecuzioni.map(e=>(


                                <tr

                                    key={e.esecuzioneId}

                                    style={styles.row}

                                    onClick={()=>

                                        navigate(

                                            `/esecuzione/${e.esecuzioneId}`

                                        )

                                    }

                                >

                                    <td style={styles.td}>{e.sigla}</td>

                                    <td style={styles.td}>{e.numero}</td>

                                    <td style={styles.td}>{e.nomeProva}</td>

                                    <td style={styles.td}>{e.codiceElemento || "-"}</td>

                                    <td style={styles.td}>{e.campata || "-"}</td>

                                    <td style={styles.td}>{e.titoloIspezione || "-"}</td>

                                    <td style={styles.td}>{e.stato}</td>


                                </tr>


                            ))}


                            </tbody>


                        </table>


                    </div>



                </>

            }


        </div>


    );


}




export default PianoEsecuzioniSection;