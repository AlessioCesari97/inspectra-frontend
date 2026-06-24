import { useEffect, useState }
    from "react";


import {
    useParams,
    useNavigate,
    Link
}
    from "react-router-dom";


import MainLayout
    from "../layouts/MainLayout";


import {

    getEsecuzioneById,
    updateEsecuzione,
    getIspezioni,
    getElementi

}
    from "../api/api";









const styles = {


    card: {

        background:"#ffffff",
        padding:"25px",
        borderRadius:"18px",
        border:"1px solid #e2e8f0",
        boxShadow:"0 4px 12px rgba(15,23,42,0.05)",
        display:"flex",
        flexDirection:"column",
        gap:"15px"

    },



    header: {

        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:"20px"

    },



    title: {

        margin:0,

        fontSize:"32px",

        fontWeight:"700",

        color:"#1e293b"

    },



    label: {

        fontWeight:"700",
        color:"#475569",
        fontSize:"14px"

    },



    input: {

        padding:"10px",
        borderRadius:"10px",
        border:"1px solid #cbd5e1"

    },



    textarea: {

        padding:"10px",
        minHeight:"90px",
        borderRadius:"10px",
        border:"1px solid #cbd5e1"

    },



    backButton: {

        width:"fit-content",

        backgroundColor:"#ffffff",

        color:"#1e293b",

        padding:"10px 14px",

        borderRadius:"10px",

        textDecoration:"none",

        border:"1px solid #e2e8f0",

        fontWeight:"600"

    },



    button:{

        height:"50px",

        borderRadius:"10px",

        border:"none",

        backgroundColor:"#1e293b",

        color:"#ffffff",

        fontWeight:"700",

        cursor:"pointer",

        fontSize:"15px"

    },



    success: {

        color:"green",
        fontWeight:"700"

    },



    error: {

        color:"red",
        fontWeight:"700"

    }


};










function EditEsecuzionePage(){



    const { id } =
        useParams();



    const navigate =
        useNavigate();





    const [formData,setFormData] =
        useState(null);


    const [ispezioni,setIspezioni] =
        useState([]);


    const [elementi,setElementi] =
        useState([]);



    const [error,setError] =
        useState("");


    const [success,setSuccess] =
        useState("");







    useEffect(()=>{


        loadData();


    },[]);








    async function loadData(){


        try{


            const e =
                await getEsecuzioneById(id);



            setIspezioni(

                await getIspezioni()

            );



            setElementi(

                await getElementi()

            );







            setFormData({


                esecuzioneId:
                e.esecuzioneId,


                numero:
                    e.numero || "",


                stato:
                e.stato,


                puntoPrevisto:
                    e.puntoPrevisto || "",


                note:
                    e.note || "",


                timestamp:
                    e.timestamp || "",




                fotoPiano1:
                    e.fotoPiano1 || "",


                fotoPiano2:
                    e.fotoPiano2 || "",


                fotoPiano3:
                    e.fotoPiano3 || "",




                fotoCantiere1:
                    e.fotoCantiere1 || "",


                fotoCantiere2:
                    e.fotoCantiere2 || "",




                latitudine:
                    e.latitudine || "",


                longitudine:
                    e.longitudine || "",





                pianoIndagine:{

                    pianoId:e.pianoId

                },


                prova:{

                    provaId:e.provaId

                },


                elemento:{

                    elementoId:e.elementoId

                },





                ispezione:


                    e.ispezioneId

                        ?

                        {

                            ispezioneId:e.ispezioneId

                        }

                        :

                        null,






                spostatoElemento:


                    e.spostatoElementoId

                        ?

                        {

                            elementoId:e.spostatoElementoId

                        }

                        :

                        null


            });



        }catch(err){


            console.error(err);

            setError(
                "Errore caricamento dati"
            );


        }


    }     function handleChange(e){


        const { name,value } =
            e.target;





        if(name === "stato"){


            let nuovo = {


                ...formData,


                stato:value


            };







            if(value === "PREVISTA"){


                nuovo.timestamp = "";


                nuovo.fotoCantiere1 = "";


                nuovo.fotoCantiere2 = "";


                nuovo.latitudine = "";


                nuovo.longitudine = "";


                nuovo.spostatoElemento = null;


            }









            if(value === "NON_ESEGUIBILE"){


                nuovo.fotoCantiere1 = "";


                nuovo.fotoCantiere2 = "";


                nuovo.latitudine = "";


                nuovo.longitudine = "";


                nuovo.spostatoElemento = null;


            }









            if(value === "SPOSTATA"){


                nuovo.fotoCantiere1 = "";


                nuovo.fotoCantiere2 = "";


                nuovo.latitudine = "";


                nuovo.longitudine = "";


            }









            if(

                value === "ESEGUITA"

                ||

                value === "AGGIUNTA_IN_SITO"

            ){


                nuovo.spostatoElemento = null;


            }









            setFormData(nuovo);


            return;


        }









        setFormData({


            ...formData,


            [name]:value


        });


    }













    function handleIspezioneChange(e){



        const value =
            e.target.value;




        setFormData({



            ...formData,



            ispezione:


                value

                    ?

                    {

                        ispezioneId:Number(value)

                    }

                    :

                    null


        });



    }












    function handleElementoSpostatoChange(e){



        const value =
            e.target.value;





        setFormData({


            ...formData,


            spostatoElemento:


                value

                    ?

                    {

                        elementoId:Number(value)

                    }

                    :

                    null



        });



    }














    async function handleSubmit(e){



        e.preventDefault();



        setError("");

        setSuccess("");









        if(

            [

                "ESEGUITA",

                "AGGIUNTA_IN_SITO",

                "NON_ESEGUIBILE",

                "SPOSTATA"

            ].includes(formData.stato)


            &&


            !formData.ispezione

        ){



            setError(

                "Seleziona una ispezione"

            );



            return;


        }










        if(

            [

                "ESEGUITA",

                "AGGIUNTA_IN_SITO",

                "NON_ESEGUIBILE",

                "SPOSTATA"

            ].includes(formData.stato)


            &&


            !formData.timestamp

        ){



            setError(

                "Inserisci la data di esecuzione"

            );



            return;


        }










        if(

            [

                "AGGIUNTA_IN_SITO",

                "NON_ESEGUIBILE",

                "SPOSTATA"

            ].includes(formData.stato)


            &&


            !formData.note.trim()

        ){



            setError(

                "Inserisci le note obbligatorie"

            );



            return;


        }









        if(

            formData.stato === "SPOSTATA"

            &&

            !formData.spostatoElemento

        ){



            setError(

                "Seleziona elemento destinazione"

            );



            return;


        }









        try{



            const esecuzioneDaSalvare = {




                numero:

                    Number(formData.numero),



                stato:

                formData.stato,



                puntoPrevisto:

                formData.puntoPrevisto,



                note:

                formData.note,




                timestamp:

                    formData.timestamp || null,





                fotoPiano1:

                formData.fotoPiano1,


                fotoPiano2:

                formData.fotoPiano2,


                fotoPiano3:

                formData.fotoPiano3,






                fotoCantiere1:

                formData.fotoCantiere1,


                fotoCantiere2:

                formData.fotoCantiere2,






                latitudine:

                    formData.latitudine || null,


                longitudine:

                    formData.longitudine || null,






                pianoIndagine:

                formData.pianoIndagine,



                prova:

                formData.prova,



                elemento:

                formData.elemento,





                ispezione:

                formData.ispezione,



                spostatoElemento:

                formData.spostatoElemento


            };









            await updateEsecuzione(


                formData.esecuzioneId,


                esecuzioneDaSalvare


            );










            setSuccess(

                "Prova salvata correttamente"

            );









            setTimeout(()=>{


                navigate(

                    `/esecuzione/${formData.esecuzioneId}`

                );


            },700);









        }catch(err){



            console.error(err);



            setError(

                "Errore durante il salvataggio"

            );



        }



    }     if(!formData){


        return(


            <MainLayout>


                Caricamento...


            </MainLayout>


        );


    }









    const mostraData =


        [

            "ESEGUITA",

            "AGGIUNTA_IN_SITO",

            "NON_ESEGUIBILE",

            "SPOSTATA"


        ].includes(

            formData.stato

        );










    const mostraCantiere =


        [

            "ESEGUITA",

            "AGGIUNTA_IN_SITO"


        ].includes(

            formData.stato

        );










    const mostraGps =


        [

            "ESEGUITA",

            "AGGIUNTA_IN_SITO"


        ].includes(

            formData.stato

        );









    const mostraSpostata =


        formData.stato === "SPOSTATA";









    const noteObbligatorie =


        [

            "AGGIUNTA_IN_SITO",

            "NON_ESEGUIBILE",

            "SPOSTATA"


        ].includes(

            formData.stato

        );











    return(



        <MainLayout>






            <div style={styles.header}>



                <Link

                    style={styles.backButton}

                    to={`/esecuzione/${formData.esecuzioneId}`}

                >


                    ← Torna alla prova


                </Link>





                <h1 style={styles.title}>


                    Modifica prova


                </h1>





            </div>











            {error &&


                <p style={styles.error}>


                    {error}


                </p>


            }








            {success &&


                <p style={styles.success}>


                    {success}


                </p>


            }









            <form

                style={styles.card}

                onSubmit={handleSubmit}

            >









                <label style={styles.label}>

                    Stato

                </label>





                <select

                    style={styles.input}

                    name="stato"

                    value={formData.stato}

                    onChange={handleChange}

                >


                    <option value="PREVISTA">
                        Prevista
                    </option>


                    <option value="ESEGUITA">
                        Eseguita
                    </option>


                    <option value="AGGIUNTA_IN_SITO">
                        Aggiunta in sito
                    </option>


                    <option value="NON_ESEGUIBILE">
                        Non eseguibile
                    </option>


                    <option value="SPOSTATA">
                        Spostata
                    </option>


                </select>









                <label style={styles.label}>

                    Numero prova

                </label>


                <input

                    style={styles.input}

                    name="numero"

                    value={formData.numero}

                    onChange={handleChange}

                />










                <label style={styles.label}>

                    Punto previsto

                </label>



                <input

                    style={styles.input}

                    name="puntoPrevisto"

                    value={formData.puntoPrevisto}

                    onChange={handleChange}

                />










                {mostraData &&


                    <>


                        <label style={styles.label}>


                            Data esecuzione *


                        </label>



                        <input

                            style={styles.input}

                            type="datetime-local"

                            name="timestamp"

                            value={formData.timestamp}

                            onChange={handleChange}

                        />


                    </>


                }











                <label style={styles.label}>


                    {

                        noteObbligatorie

                            ?

                            "Note *"

                            :

                            "Note"

                    }


                </label>





                <textarea

                    style={styles.textarea}

                    name="note"

                    value={formData.note}

                    onChange={handleChange}

                />











                <label style={styles.label}>


                    {

                        formData.stato !== "PREVISTA"

                            ?

                            "Ispezione associata *"

                            :

                            "Ispezione associata"

                    }


                </label>





                <select

                    style={styles.input}

                    value={

                        formData.ispezione?.ispezioneId || ""

                    }

                    onChange={handleIspezioneChange}

                >



                    <option value="">

                        Nessuna

                    </option>






                    {ispezioni.map(i=>(


                        <option

                            key={i.ispezioneId}

                            value={i.ispezioneId}

                        >


                            {i.titoloIspezione}


                        </option>


                    ))}



                </select>









                {mostraSpostata &&


                    <>


                        <label style={styles.label}>


                            Spostata su elemento *


                        </label>




                        <select

                            style={styles.input}

                            value={

                                formData.spostatoElemento?.elementoId || ""

                            }

                            onChange={handleElementoSpostatoChange}

                        >


                            <option value="">

                                Seleziona elemento

                            </option>





                            {elementi.map(el=>(


                                <option

                                    key={el.elementoId}

                                    value={el.elementoId}

                                >


                                    {el.codice} - {el.campata}


                                </option>


                            ))}



                        </select>


                    </>


                }










                {mostraGps &&


                    <>


                        <label style={styles.label}>

                            Posizione GPS

                        </label>



                        <input

                            style={styles.input}

                            name="latitudine"

                            placeholder="Latitudine"

                            value={formData.latitudine}

                            onChange={handleChange}

                        />



                        <input

                            style={styles.input}

                            name="longitudine"

                            placeholder="Longitudine"

                            value={formData.longitudine}

                            onChange={handleChange}

                        />


                    </>


                }











                <label style={styles.label}>


                    Foto piano


                </label>




                <input

                    style={styles.input}

                    name="fotoPiano1"

                    value={formData.fotoPiano1}

                    onChange={handleChange}

                />



                <input

                    style={styles.input}

                    name="fotoPiano2"

                    value={formData.fotoPiano2}

                    onChange={handleChange}

                />









                {mostraCantiere &&


                    <>


                        <label style={styles.label}>


                            Foto cantiere


                        </label>



                        <input

                            style={styles.input}

                            name="fotoCantiere1"

                            value={formData.fotoCantiere1}

                            onChange={handleChange}

                        />


                    </>


                }










                <button

                    style={styles.button}

                >


                    Salva prova


                </button>








            </form>





        </MainLayout>



    );


}



export default EditEsecuzionePage;