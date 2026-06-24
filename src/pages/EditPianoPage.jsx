import { useState, useEffect }
    from "react";

import {
    useNavigate,
    useParams,
    Link
}
    from "react-router-dom";


import MainLayout
    from "../layouts/MainLayout";


import {
    getPianoById,
    updatePiano
}
    from "../api/api";






const styles = {


    container: {

        maxWidth:"900px",
        margin:"0 auto",
        display:"flex",
        flexDirection:"column",
        gap:"18px",
        paddingBottom:"120px"

    },


    backButton: {

        width:"fit-content",
        background:"#ffffff",
        color:"#1e293b",
        padding:"10px 14px",
        borderRadius:"10px",
        textDecoration:"none",
        fontWeight:"600",
        border:"1px solid #e2e8f0"

    },


    card: {

        background:"#ffffff",
        border:"1px solid #e2e8f0",
        borderRadius:"18px",
        padding:"22px",
        display:"flex",
        flexDirection:"column",
        gap:"20px"

    },


    title: {

        margin:0,
        color:"#1e293b"

    },


    subtitle: {

        margin:0,
        color:"#64748b"

    },


    grid: {

        display:"grid",

        gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",

        gap:"18px"

    },


    group: {

        display:"flex",
        flexDirection:"column",
        gap:"8px"

    },


    label: {

        fontSize:"13px",
        fontWeight:"700",
        color:"#475569"

    },


    input: {

        height:"48px",
        borderRadius:"10px",
        border:"1px solid #cbd5e1",
        padding:"0 14px",
        outline:"none"

    },


    textarea: {

        minHeight:"130px",
        borderRadius:"12px",
        border:"1px solid #cbd5e1",
        padding:"14px",
        resize:"vertical"

    },


    button: {

        height:"50px",
        background:"#1e293b",
        color:"white",
        border:"none",
        borderRadius:"10px",
        cursor:"pointer",
        fontWeight:"700"

    },


    success: {

        background:"#dcfce7",
        color:"#166534",
        padding:"12px",
        borderRadius:"10px",
        fontWeight:"600"

    },


    errorBox: {

        background:"#fee2e2",
        color:"#991b1b",
        padding:"12px",
        borderRadius:"10px",
        fontWeight:"600"

    },


    error:{

        color:"#dc2626",
        fontSize:"13px",
        margin:0

    }

};










function EditPianoPage(){



    const { pianoId } =
        useParams();



    const navigate =
        useNavigate();





    const [piano,setPiano] =
        useState(null);



    const [loading,setLoading] =
        useState(false);



    const [success,setSuccess] =
        useState("");



    const [error,setError] =
        useState("");



    const [fieldErrors,setFieldErrors] =
        useState({});








    useEffect(()=>{


        async function load(){


            try{


                const data =
                    await getPianoById(pianoId);



                setPiano(data);



            }catch(error){


                setError(

                    "❌ Errore caricamento piano"

                );


            }


        }


        load();


    },[pianoId]);










    function handleChange(e){



        setPiano({


            ...piano,


            [e.target.name]:

            e.target.value


        });




        setFieldErrors({

            ...fieldErrors,

            [e.target.name]:""

        });



        setError("");


    }








    async function handleSubmit(e){



        e.preventDefault();




        const errors = {};




        if(!piano.codicePiano.trim()){



            errors.codicePiano =

                "Il codice piano è obbligatorio";



        }





        setFieldErrors(errors);





        if(Object.keys(errors).length>0){


            return;


        }









        const pianoDaSalvare = {



            codicePiano:

            piano.codicePiano,



            revisione:

            piano.revisione,



            data:

            piano.data,



            descrizione:

            piano.descrizione,



            redatto:

            piano.redatto,



            verificato:

            piano.verificato,



            approvato:

            piano.approvato,



            allegato:

            piano.allegato



        };











        try{



            setLoading(true);





            await updatePiano(

                pianoId,

                pianoDaSalvare

            );








            setSuccess(

                "✅ Piano modificato correttamente"

            );








            setTimeout(()=>{



                navigate(

                    `/piano/${pianoId}`

                );



            },1000);








        }catch(error){





            console.error(error);




            setError(

                "❌ Errore durante la modifica"

            );





        }finally{



            setLoading(false);



        }



    }












    if(!piano){


        return(

            <MainLayout>

                Caricamento...

            </MainLayout>

        );

    }










    const archiviato =

        piano.stato === "ARCHIVIATO";










    return(


        <MainLayout>



            <div style={styles.container}>





                <Link

                    to={`/piano/${pianoId}`}

                    style={styles.backButton}

                >

                    ← Torna al Piano

                </Link>










                <form

                    onSubmit={handleSubmit}

                    style={styles.card}

                >






                    <div>


                        <h1 style={styles.title}>

                            Modifica Piano

                        </h1>



                        <p style={styles.subtitle}>

                            Aggiorna le informazioni del piano

                        </p>


                    </div>








                    {archiviato &&


                        <div style={styles.errorBox}>

                            Piano archiviato: modifica non consentita

                        </div>


                    }








                    <div style={styles.grid}>



                        <Input

                            label="Codice Piano *"

                            name="codicePiano"

                            value={piano.codicePiano}

                            disabled={archiviato}

                            error={fieldErrors.codicePiano}

                            onChange={handleChange}

                        />




                        <Input

                            label="Revisione"

                            name="revisione"

                            value={piano.revisione || ""}

                            disabled={archiviato}

                            onChange={handleChange}

                        />





                        <Input

                            label="Data"

                            type="date"

                            name="data"

                            value={piano.data || ""}

                            disabled={archiviato}

                            onChange={handleChange}

                        />



                    </div>









                    <div style={styles.group}>


                        <label style={styles.label}>

                            Descrizione

                        </label>



                        <textarea

                            name="descrizione"

                            value={piano.descrizione || ""}

                            disabled={archiviato}

                            onChange={handleChange}

                            style={styles.textarea}

                        />


                    </div>









                    <div style={styles.grid}>


                        <Input
                            label="Redatto"
                            name="redatto"
                            value={piano.redatto || ""}
                            disabled={archiviato}
                            onChange={handleChange}
                        />



                        <Input
                            label="Verificato"
                            name="verificato"
                            value={piano.verificato || ""}
                            disabled={archiviato}
                            onChange={handleChange}
                        />



                        <Input
                            label="Approvato"
                            name="approvato"
                            value={piano.approvato || ""}
                            disabled={archiviato}
                            onChange={handleChange}
                        />


                    </div>








                    <Input

                        label="Allegato"

                        name="allegato"

                        value={piano.allegato || ""}

                        disabled={archiviato}

                        onChange={handleChange}

                    />









                    {!archiviato &&


                        <button

                            disabled={loading}

                            style={styles.button}

                        >


                            {

                                loading

                                    ?

                                    "Salvataggio..."

                                    :

                                    "Salva modifiche"

                            }


                        </button>


                    }








                    {success &&


                        <div style={styles.success}>

                            {success}

                        </div>


                    }






                    {error &&


                        <div style={styles.errorBox}>

                            {error}

                        </div>


                    }




                </form>



            </div>


        </MainLayout>


    );


}










function Input({

                   label,
                   name,
                   value,
                   onChange,
                   error,
                   disabled,
                   type="text"

               }){


    return(


        <div style={styles.group}>


            <label style={styles.label}>

                {label}

            </label>



            <input

                type={type}

                name={name}

                value={value}

                disabled={disabled}

                onChange={onChange}

                style={styles.input}

            />



            {error &&


                <p style={styles.error}>

                    {error}

                </p>


            }


        </div>


    );


}




export default EditPianoPage;