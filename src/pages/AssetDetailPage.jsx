import { useEffect, useState }
    from "react";

import {
    useParams,
    Link,
    useNavigate
}
    from "react-router-dom";

import MainLayout
    from "../layouts/MainLayout";

import { getAssetById }
    from "../api/api";





const styles = {


    container: {

        maxWidth: "1200px",

        margin: "0 auto",

        display: "flex",

        flexDirection: "column",

        gap: "20px",

        paddingBottom: "120px"
    },



    card: {

        backgroundColor: "#ffffff",

        border: "1px solid #e2e8f0",

        borderRadius: "18px",

        padding: "22px",

        display: "flex",

        flexDirection: "column",

        gap: "18px",

        boxShadow:
            "0 4px 12px rgba(15,23,42,0.04)"
    },



    top: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        gap: "15px",

        flexWrap: "wrap"
    },



    title: {

        margin: 0,

        fontSize: "32px",

        color: "#1e293b",

        fontWeight: "700"
    },



    subtitle: {

        margin: 0,

        color: "#64748b"
    },



    button: {

        backgroundColor: "#1e293b",

        color: "white",

        padding: "11px 16px",

        borderRadius: "10px",

        textDecoration: "none",

        border: "none",

        cursor: "pointer",

        fontWeight: "600"
    },



    secondaryButton: {

        backgroundColor: "#ffffff",

        color: "#1e293b",

        padding: "10px 14px",

        borderRadius: "10px",

        border: "1px solid #cbd5e1",

        textDecoration: "none",

        cursor: "pointer",

        fontWeight: "600"
    },



    sectionTitle: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        cursor: "pointer",

        flexWrap: "wrap",

        gap: "12px"
    },



    grid: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",

        gap: "14px"
    },



    infoBox: {

        backgroundColor: "#f8fafc",

        border: "1px solid #e2e8f0",

        borderRadius: "12px",

        padding: "14px"
    },



    label: {

        color: "#64748b",

        fontSize: "12px",

        fontWeight: "700"
    },



    value: {

        marginTop: "6px",

        color: "#1e293b",

        fontWeight: "600"
    },



    mapBox: {

        height: "220px",

        backgroundColor: "#f8fafc",

        border: "1px dashed #cbd5e1",

        borderRadius: "16px",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        color: "#64748b",

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

        borderRadius: "999px",

        padding: "8px 14px",

        cursor: "pointer",

        fontWeight:"600"
    },



    filterActive: {

        backgroundColor: "#1e293b",

        color: "#ffffff",

        border: "1px solid #1e293b",

        borderRadius: "999px",

        padding: "8px 14px",

        cursor: "pointer",

        fontWeight:"600"
    },



    input: {

        padding: "12px",

        borderRadius: "10px",

        border: "1px solid #cbd5e1"
    },



    tableWrapper: {

        overflowX: "auto"
    },



    table: {

        width: "100%",

        borderCollapse: "collapse"
    },



    th: {

        textAlign: "left",

        padding: "12px",

        color: "#64748b",

        borderBottom: "1px solid #e2e8f0"
    },



    td: {

        padding: "12px",

        borderBottom: "1px solid #f1f5f9"
    },



    row: {

        cursor: "pointer"
    }

};







function AssetDetailPage() {


    const { id } =
        useParams();


    const navigate =
        useNavigate();



    const [asset,setAsset] =
        useState(null);



    const [showElementi,setShowElementi] =
        useState(false);


    const [showPiani,setShowPiani] =
        useState(false);


    const [showIspezioni,setShowIspezioni] =
        useState(false);





    const [tipoElemento,setTipoElemento] =
        useState("TUTTI");


    const [ordineElemento,setOrdineElemento] =
        useState("campata");


    const [searchElemento,setSearchElemento] =
        useState("");




    const [vistaPiani,setVistaPiani] =
        useState("TUTTI");


    const [searchPiano,setSearchPiano] =
        useState("");




    const [statoIspezione,setStatoIspezione] =
        useState("TUTTE");


    const [searchIspezione,setSearchIspezione] =
        useState("");




    const [ordinePiano,setOrdinePiano] =
        useState("codicePiano");



    const [ordineIspezione,setOrdineIspezione] =
        useState("dataIspezione");





    useEffect(() => {


        loadAsset();


    }, [id]);





    async function loadAsset() {


        try {


            const data =
                await getAssetById(id);


            setAsset(data);



        } catch(error) {


            console.error(error);


        }

    }





    if(!asset) {


        return (

            <MainLayout>

                Caricamento...

            </MainLayout>

        );

    }






    const tipiElemento = [

        "TUTTI",

        ...new Set(

            (asset.elementi || [])

                .map(e => e.tipoElementoNome)

                .filter(Boolean)

        )

    ];





    const elementiFiltrati =

        (asset.elementi || [])


            .filter(e =>

                tipoElemento === "TUTTI"

                ||

                e.tipoElementoNome === tipoElemento

            )


            .filter(e => {


                const testo =

                    `
        ${e.codice}
        ${e.tipoElementoNome}
        ${e.campata}
        ${e.lato}
        `

                        .toLowerCase();



                return testo.includes(

                    searchElemento.toLowerCase()

                );


            })


            .sort((a,b) =>

                (a[ordineElemento] || "")

                    .localeCompare(

                        b[ordineElemento] || ""

                    )

            );





    const pianiFiltrati =


        (asset.piani || [])


            .filter(p =>

                vistaPiani === "TUTTI"

                ||

                p.stato === vistaPiani

            )


            .filter(p => {


                const testo =

                    `
        ${p.codicePiano}
        ${p.revisione}
        ${p.data}
        ${p.stato}
        ${p.assetNome}
        `

                        .toLowerCase();



                return testo.includes(

                    searchPiano.toLowerCase()

                );


            })



            .sort((a,b)=>


                String(a[ordinePiano] || "")

                    .localeCompare(

                        String(b[ordinePiano] || "")

                    )

            );






    const ispezioniFiltrate =


        (asset.ispezioni || [])


            .filter(i =>

                statoIspezione === "TUTTE"

                ||

                i.stato === statoIspezione

            )

            .filter(i => {


                const testo =

                    `
        ${i.titoloIspezione}
        ${i.dataIspezione}
        ${i.stato}
        `

                        .toLowerCase();



                return testo.includes(

                    searchIspezione.toLowerCase()

                );


            })

            .sort((a,b)=>


                String(a[ordineIspezione] || "")

                    .localeCompare(

                        String(b[ordineIspezione] || "")

                    )

            );

    return (


        <MainLayout>


            <div style={styles.container}>





                <Link
                    to="/assets"
                    style={styles.secondaryButton}
                >

                    ← Opere

                </Link>








                {/* INFO OPERA */}


                <div style={styles.card}>


                    <div style={styles.top}>


                        <div>


                            <h1 style={styles.title}>

                                {asset.nome}

                            </h1>



                            <p style={styles.subtitle}>

                                Dettaglio opera

                            </p>


                        </div>





                        <Link

                            to={`/asset/${asset.assetId}/edit`}

                            style={styles.secondaryButton}

                        >

                            Modifica

                        </Link>



                    </div>







                    <div style={styles.grid}>


                        <Info
                            label="Strada"
                            value={asset.strada}
                        />



                        <Info
                            label="Gestore"
                            value={asset.gestore}
                        />


                    </div>






                    <div>


                        <h3>
                            Note
                        </h3>



                        <p>

                            {asset.note ||

                                "Nessuna nota presente"}

                        </p>


                    </div>







                    <h3>
                        Posizione
                    </h3>




                    <div style={styles.mapBox}>


                        {asset.posizione ||

                            "Mappa disponibile prossimamente"}


                    </div>




                </div>












                {/* ELEMENTI */}



                <div style={styles.card}>


                    <div

                        style={styles.sectionTitle}

                        onClick={() =>
                            setShowElementi(
                                !showElementi
                            )
                        }

                    >


                        <h2>

                            {showElementi ? "▼" : "▶"}

                            {" "}

                            Elementi

                        </h2>




                        <Link

                            to={`/asset/${asset.assetId}/nuovo-elemento`}

                            style={styles.button}

                            onClick={(e)=>

                                e.stopPropagation()

                            }

                        >


                            + Nuovo Elemento


                        </Link>


                    </div>








                    {showElementi && (


                        <>



                            <div style={styles.filters}>


                                {tipiElemento.map(t => (


                                    <button

                                        key={t}


                                        onClick={() =>

                                            setTipoElemento(t)

                                        }


                                        style={

                                            tipoElemento === t

                                                ?

                                                styles.filterActive

                                                :

                                                styles.filterButton

                                        }

                                    >


                                        {t.toUpperCase()}


                                    </button>


                                ))}


                            </div>








                            <input

                                placeholder="Cerca elemento..."

                                value={searchElemento}

                                onChange={(e)=>

                                    setSearchElemento(

                                        e.target.value

                                    )

                                }

                                style={styles.input}

                            />




                            <div style={styles.label}>

                                Ordina per:

                            </div>



                            <select

                                value={ordineElemento}

                                onChange={(e)=>

                                    setOrdineElemento(

                                        e.target.value

                                    )

                                }

                                style={styles.input}

                            >


                                <option value="campata">

                                    Campata

                                </option>



                                <option value="codice">

                                    Codice

                                </option>



                                <option value="tipoElementoNome">

                                    Tipo

                                </option>



                                <option value="lato">

                                    Lato

                                </option>


                            </select>









                            <Table

                                headers={[

                                    "Codice",

                                    "Tipo",

                                    "Campata",

                                    "Lato"

                                ]}


                                rows={


                                    elementiFiltrati.map(e => ({

                                        link:

                                            `/elemento/${e.elementoId}`,

                                        values:[

                                            e.codice,

                                            e.tipoElementoNome,

                                            e.campata,

                                            e.lato

                                        ]

                                    }))


                                }


                                navigate={navigate}

                            />



                        </>

                    )}


                </div>









                {/* PIANI */}



                <div style={styles.card}>


                    <div

                        style={styles.sectionTitle}

                        onClick={() =>

                            setShowPiani(

                                !showPiani

                            )

                        }

                    >



                        <h2>

                            {showPiani ? "▼" : "▶"}

                            {" "}

                            Piani Indagine

                        </h2>




                        <Link

                            to={`/asset/${asset.assetId}/nuovo-piano`}

                            style={styles.button}

                            onClick={(e)=>

                                e.stopPropagation()

                            }

                        >

                            + Nuovo Piano

                        </Link>


                    </div>







                    {showPiani && (


                        <>




                            <div style={styles.filters}>


                                {[

                                    "TUTTI",

                                    "ATTIVO",

                                    "COMPLETATO",

                                    "ARCHIVIATO"


                                ].map(v => (


                                    <button

                                        key={v}

                                        onClick={() =>

                                            setVistaPiani(v)

                                        }


                                        style={

                                            vistaPiani === v

                                                ?

                                                styles.filterActive

                                                :

                                                styles.filterButton

                                        }

                                    >


                                        {v}


                                    </button>



                                ))}



                            </div>







                            <input

                                placeholder="Cerca piano..."

                                value={searchPiano}

                                onChange={(e)=>

                                    setSearchPiano(

                                        e.target.value

                                    )

                                }

                                style={styles.input}

                            />




                            <div style={styles.label}>

                                Ordina per:

                            </div>

                            <select

                                value={ordinePiano}

                                onChange={(e)=>

                                    setOrdinePiano(

                                        e.target.value

                                    )

                                }

                                style={styles.input}

                            >


                                <option value="codicePiano">

                                    Codice

                                </option>


                                <option value="data">

                                    Data

                                </option>


                                <option value="revisione">

                                    Revisione

                                </option>


                                <option value="stato">

                                    Stato

                                </option>


                            </select>




                            <Table

                                headers={[

                                    "Codice",

                                    "Revisione",

                                    "Data",

                                    "Stato"

                                ]}



                                rows={


                                    pianiFiltrati.map(p => ({

                                        link:

                                            `/piano/${p.pianoId}`,


                                        state:{

                                            fromAsset: asset.assetId

                                        },


                                        values:[

                                            p.codicePiano,

                                            p.revisione,

                                            p.data,

                                            p.stato

                                        ]

                                    }))


                                }



                                navigate={navigate}

                            />



                        </>

                    )}


                </div>
                {/* ISPEZIONI */}



                <div style={styles.card}>


                    <div

                        style={styles.sectionTitle}

                        onClick={() =>

                            setShowIspezioni(

                                !showIspezioni

                            )

                        }

                    >



                        <h2>

                            {showIspezioni ? "▼" : "▶"}

                            {" "}

                            Ispezioni

                        </h2>





                        <Link

                            to={`/asset/${asset.assetId}/nuova-ispezione`}

                            style={styles.button}

                            onClick={(e)=>

                                e.stopPropagation()

                            }

                        >


                            + Nuova Ispezione


                        </Link>



                    </div>








                    {showIspezioni && (


                        <>





                            <div style={styles.filters}>


                                {[

                                    "TUTTE",

                                    "BOZZA",

                                    "IN_CORSO",

                                    "COMPLETATA",

                                    "FIRMATA",

                                    "ARCHIVIATA"


                                ].map(s => (



                                    <button

                                        key={s}


                                        onClick={() =>

                                            setStatoIspezione(s)

                                        }


                                        style={

                                            statoIspezione === s

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

                                value={searchIspezione}


                                onChange={(e)=>

                                    setSearchIspezione(

                                        e.target.value

                                    )

                                }


                                style={styles.input}

                            />




                            <div style={styles.label}>

                                Ordina per:

                            </div>



                            <select

                                value={ordineIspezione}

                                onChange={(e)=>

                                    setOrdineIspezione(

                                        e.target.value

                                    )

                                }

                                style={styles.input}

                            >


                                <option value="dataIspezione">

                                    Data

                                </option>



                                <option value="titoloIspezione">

                                    Titolo

                                </option>



                                <option value="stato">

                                    Stato

                                </option>


                            </select>


                            <Table


                                headers={[

                                    "Titolo",

                                    "Data",

                                    "Stato"

                                ]}



                                rows={


                                    ispezioniFiltrate.map(i => ({

                                        link:

                                            `/ispezione/${i.ispezioneId}`,



                                        values:[


                                            i.titoloIspezione,


                                            i.dataIspezione,


                                            i.stato


                                        ]

                                    }))


                                }



                                navigate={navigate}

                            />



                        </>

                    )}




                </div>






            </div>



        </MainLayout>


    );

}









function Info({ label, value }) {



    return (


        <div style={styles.infoBox}>


            <div style={styles.label}>


                {label}


            </div>





            <div style={styles.value}>


                {value || "-"}


            </div>



        </div>


    );

}









function Table({ headers, rows, navigate }) {



    return (



        <div style={styles.tableWrapper}>



            <table style={styles.table}>




                <thead>


                <tr>



                    {headers.map(h => (



                        <th

                            key={h}

                            style={styles.th}

                        >


                            {h}


                        </th>



                    ))}



                </tr>


                </thead>








                <tbody>



                {rows.length === 0 && (



                    <tr>


                        <td

                            colSpan={headers.length}

                            style={styles.td}

                        >


                            Nessun elemento presente


                        </td>


                    </tr>



                )}









                {rows.map((row,index) => (



                    <tr

                        key={index}


                        style={styles.row}


                        onClick={() =>

                            navigate(

                                row.link,

                                {
                                    state:
                                    row.state
                                }

                            )



                        }

                    >






                        {row.values.map((value,i) => (



                            <td

                                key={i}

                                style={styles.td}

                            >



                                {value || "-"}



                            </td>



                        ))}




                    </tr>




                ))}



                </tbody>





            </table>




        </div>



    );

}






export default AssetDetailPage;