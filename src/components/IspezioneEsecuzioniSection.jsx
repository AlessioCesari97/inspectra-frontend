import {
    useEffect,
    useState
}
    from "react";


import {
    Link,
    useNavigate
}
    from "react-router-dom";


import {

    getEsecuzioniDisponibili,

    associaEsecuzioneIspezione

}
    from "../api/api";



function IspezioneEsecuzioniSection({

                                        ispezione,

                                        onIspezioneChanged

                                    }){


    const [search,setSearch] =
        useState("");


    const [stato,setStato] =
        useState("TUTTE");


    const [ordine,setOrdine] =
        useState("numero");


    const [disponibili,setDisponibili] =
        useState([]);


    const [success,setSuccess] =
        useState("");


    const [error,setError] =
        useState("");

    const [associandoId,setAssociandoId] =
        useState(null);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const puoGestireProve =

        ispezione.stato === "BOZZA"

        ||

        ispezione.stato === "IN_CORSO";



    useEffect(()=>{


        if(puoGestireProve){


            loadDisponibili();


        }else{


            setDisponibili([]);


        }


    },[

        ispezione.ispezioneId,

        ispezione.pianoId,

        ispezione.stato

    ]);



    async function loadDisponibili(){


        if(!ispezione.pianoId){


            setDisponibili([]);


            return;


        }


        try{


            const data =

                await getEsecuzioniDisponibili(

                    ispezione.pianoId

                );


            setDisponibili(data);


        }catch(error){


            console.error(error);


            setError(

                error.message

                ||

                "Errore durante il caricamento delle prove disponibili"

            );


        }


    }



    async function handleAssocia(id){


        try{


            setSuccess("");

            setError("");

            setAssociandoId(id);


            await associaEsecuzioneIspezione(

                id,

                ispezione.ispezioneId

            );


            setSuccess(

                "Prova associata correttamente"

            );


            /*
             * Ricarichiamo l'ispezione.
             *
             * Il DTO aggiornato conterrà
             * la nuova prova associata.
             */

            if(onIspezioneChanged){


                await onIspezioneChanged();


            }


            /*
             * Aggiorniamo anche
             * le prove disponibili.
             */

            await loadDisponibili();


        }catch(error){


            console.error(error);


            setError(

                error.message

                ||

                "Errore durante l'associazione della prova"

            );


        }finally{


            setAssociandoId(null);


        }


    }



    let prove =

        [...(ispezione.esecuzioni || [])];



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


        if (ordine === "sigla") {

            const siglaA =

                `${a.sigla || ""}${String(a.numero || "").padStart(3, "0")}`;

            const siglaB =

                `${b.sigla || ""}${String(b.numero || "").padStart(3, "0")}`;

            return siglaA.localeCompare(siglaB);

        }


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

                onClick={() => setOpen(!open)}

            >

                <h2 style={styles.title}>

                    {open ? "▼" : "▶"} Prove

                </h2>

                {

                    puoGestireProve &&

                    <Link

                        to={`/ispezione/${ispezione.ispezioneId}/nuova-esecuzione`}

                        style={styles.addButton}

                        onClick={(e)=>e.stopPropagation()}

                    >

                        + Nuova Prova

                    </Link>

                }

            </div>

            {open && (
                <>
            {

                success &&


                <div style={styles.successBox}>

                    {success}

                </div>

            }



            {

                error &&


                <div style={styles.errorBox}>

                    {error}

                </div>

            }


            <div style={styles.filters}>

                <input

                    placeholder="Cerca prova..."

                    value={search}

                    onChange={

                        e => setSearch(e.target.value)

                    }

                    style={styles.input}

                />

            </div>

            <div style={styles.label}>

                Ordina per:

            </div>

            <select

                value={ordine}

                onChange={

                    e => setOrdine(e.target.value)

                }

                style={styles.select}

            >

                <option value="sigla">

                    Ordina per sigla

                </option>

                <option value="nomeProva">

                    Ordina per prova

                </option>

                <option value="stato">

                    Ordina per stato

                </option>

            </select>



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

                                stato === s

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


                            <th style={styles.th}>

                                Sigla

                            </th>


                            <th style={styles.th}>

                                Numero

                            </th>


                            <th style={styles.th}>

                                Prova

                            </th>


                            <th style={styles.th}>

                                Elemento

                            </th>


                            <th style={styles.th}>

                                Campata

                            </th>


                            <th style={styles.th}>

                                Stato

                            </th>

                            <th style={styles.th}>

                                Azioni

                            </th>


                        </tr>


                        </thead>



                        <tbody>


                        {

                            prove.map(p=>(


                                <tr
                                    key={p.esecuzioneId}
                                    style={{
                                        ...styles.td,
                                        cursor: "pointer"
                                    }}
                                    onClick={() => navigate(`/esecuzione/${p.esecuzioneId}`)}
                                >


                                    <td style={styles.td}>

                                        {p.sigla}

                                    </td>


                                    <td style={styles.td}>

                                        {p.numero}

                                    </td>


                                    <td style={styles.td}>
                                        {p.nomeProva}
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

                                    <td style={styles.td}>

                                        <div style={styles.actions}>

                                            <button

                                                style={styles.actionButton}

                                                title="Segna come eseguita"

                                                onClick={(e) => {

                                                    e.stopPropagation();

                                                    alert("Qui inseriremo la conferma ESEGUITA");

                                                }}

                                            >

                                                ✔

                                            </button>


                                            <button

                                                style={styles.actionButton}

                                                title="Non eseguibile"

                                                onClick={(e) => {

                                                    e.stopPropagation();

                                                    navigate(

                                                        `/esecuzione/${p.esecuzioneId}/edit?azione=non_eseguibile`

                                                    );

                                                }}

                                            >

                                                ✖

                                            </button>


                                            <button

                                                style={styles.actionButton}

                                                title="Spostata"

                                                onClick={(e) => {

                                                    e.stopPropagation();

                                                    navigate(

                                                        `/esecuzione/${p.esecuzioneId}/edit?azione=spostata`

                                                    );

                                                }}

                                            >

                                                ↺

                                            </button>

                                        </div>

                                    </td>


                                </tr>


                            ))

                        }


                        </tbody>


                    </table>

            }



            {

                puoGestireProve&&


                <>


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

                                        disabled={

                                            associandoId !== null

                                        }

                                        style={

                                            associandoId !== null

                                                ?

                                                styles.disabledButton

                                                :

                                                styles.button

                                        }

                                    >

                                        {

                                            associandoId === p.esecuzioneId

                                                ?

                                                "Associazione..."

                                                :

                                                "Associa all'ispezione"

                                        }

                                    </button>


                                </div>


                            ))

                    }


                </>

            }
</>
)}
        </div>


    );



}



const styles = {


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
    label:{

        color:"#64748b",

        fontSize:"12px",

        fontWeight:"700"

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


    disabledButton:{

        backgroundColor:"#94a3b8",

        color:"#ffffff",

        border:"none",

        padding:"10px 15px",

        borderRadius:"10px",

        fontWeight:"700",

        cursor:"not-allowed"

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

    },


    successBox:{

        background:"#f0fdf4",

        border:"1px solid #bbf7d0",

        color:"#166534",

        padding:"12px 14px",

        borderRadius:"10px",

        fontWeight:"600"

    },


    errorBox:{

        background:"#fef2f2",

        border:"1px solid #fecaca",

        color:"#991b1b",

        padding:"12px 14px",

        borderRadius:"10px",

        fontWeight:"600"

    },

    actions:{

        display:"flex",

        gap:"8px",

        justifyContent:"center"

    },


    actionButton:{

        width:"34px",

        height:"34px",

        borderRadius:"50%",

        border:"1px solid #cbd5e1",

        background:"#ffffff",

        cursor:"pointer",

        fontWeight:"700",

        fontSize:"16px",

        transition:"0.2s"

    },


};


export default IspezioneEsecuzioniSection;