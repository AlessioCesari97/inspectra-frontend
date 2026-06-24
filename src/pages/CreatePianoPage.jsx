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
    createPiano,
    getAssets
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





    card: {

        background:"#ffffff",
        border:"1px solid #e2e8f0",
        borderRadius:"18px",
        padding:"22px",
        display:"flex",
        flexDirection:"column",
        gap:"20px"

    },

    backButton:{


        display:"inline-block",

        width:"fit-content",

        marginBottom:"20px",


        backgroundColor:"#ffffff",

        color:"#1e293b",

        padding:"10px 14px",

        borderRadius:"10px",

        textDecoration:"none",

        border:"1px solid #e2e8f0",

        fontWeight:"600"


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
        outline:"none",
        background:"#ffffff"

    },


    textarea: {

        minHeight:"130px",
        borderRadius:"12px",
        border:"1px solid #cbd5e1",
        padding:"14px",
        resize:"vertical"

    },


    error: {

        color:"#dc2626",
        fontSize:"13px",
        margin:0

    },


    success: {

        background:"#dcfce7",
        color:"#166534",
        padding:"12px",
        borderRadius:"10px",
        fontWeight:"600"

    },


    serverError: {

        background:"#fee2e2",
        color:"#991b1b",
        padding:"12px",
        borderRadius:"10px",
        fontWeight:"600"

    },


    button: {

        height:"50px",
        background:"#1e293b",
        color:"white",
        border:"none",
        borderRadius:"10px",
        cursor:"pointer",
        fontWeight:"700"

    }


};









function CreatePianoPage(){



    const navigate =
        useNavigate();



    const { assetId } =
        useParams();






    const [assets,setAssets] =
        useState([]);





    const [piano,setPiano] =
        useState(() => ({


            codicePiano:"",


            revisione:"",


            data:"",


            descrizione:"",



            redatto:"",


            verificato:"",


            approvato:"",



            allegato:"",



            asset:

                assetId

                    ?

                    {

                        assetId:

                            Number(assetId)

                    }

                    :

                    {

                        assetId:""

                    }


        }));






    const [errors,setErrors] =
        useState({});


    const [success,setSuccess] =
        useState("");


    const [serverError,setServerError] =
        useState("");


    const [loading,setLoading] =
        useState(false);















    useEffect(()=>{


        async function load(){


            try{


                const data =
                    await getAssets();



                setAssets(data);



            }catch(error){


                console.error(error);


            }


        }



        load();



    },[]);









    function handleChange(e){



        setPiano({


            ...piano,


            [e.target.name]:

            e.target.value


        });




        setErrors({


            ...errors,


            [e.target.name]:""


        });




        setServerError("");



    }










    function handleAssetChange(e){



        setPiano({



            ...piano,



            asset:{


                assetId:Number(e.target.value)


            }



        });





        setErrors({


            ...errors,


            asset:""


        });




    }










    async function handleSubmit(e){



        e.preventDefault();





        const newErrors = {};





        if(!piano.codicePiano.trim()){



            newErrors.codicePiano =

                "Il codice piano è obbligatorio";



        }






        if(!piano.asset.assetId){



            newErrors.asset =

                "Seleziona un'opera";



        }






        setErrors(newErrors);





        if(Object.keys(newErrors).length>0){


            return;


        }








        try{



            setLoading(true);





            await createPiano(piano);






            setSuccess(

                "✅ Piano creato correttamente"

            );








            setTimeout(()=>{



                if(assetId){



                    navigate(

                        `/asset/${assetId}`

                    );



                }else{



                    navigate(

                        "/piani"

                    );



                }



            },1000);








        }catch(error){



            setServerError(

                "❌ Errore durante il salvataggio"

            );




        }finally{



            setLoading(false);



        }



    }










    return(


        <MainLayout>



            <div style={styles.container}>







                <Link


                    to={

                        assetId

                            ?

                            `/asset/${assetId}`

                            :

                            "/piani"

                    }


                    style={styles.backButton}

                >


                    ← Indietro


                </Link>








                <form

                    onSubmit={handleSubmit}

                    style={styles.card}

                >







                    <div>



                        <h1 style={styles.title}>


                            Nuovo Piano Indagine


                        </h1>




                        <p style={styles.subtitle}>


                            Inserisci le informazioni del piano


                        </p>



                    </div>








                    {!assetId &&


                        <div style={styles.group}>


                            <label style={styles.label}>

                                Opera collegata *

                            </label>




                            <select

                                value={piano.asset.assetId}

                                onChange={handleAssetChange}

                                style={styles.input}

                            >



                                <option value="">

                                    Seleziona opera

                                </option>





                                {assets.map(a=>(



                                    <option

                                        key={a.assetId}

                                        value={a.assetId}

                                    >


                                        {a.nome}


                                    </option>



                                ))}




                            </select>



                        </div>


                    }










                    <div style={styles.grid}>



                        <Input

                            label="Codice Piano *"

                            name="codicePiano"

                            value={piano.codicePiano}

                            error={errors.codicePiano}

                            onChange={handleChange}

                        />





                        <Input

                            label="Revisione"

                            name="revisione"

                            value={piano.revisione}

                            onChange={handleChange}

                        />





                        <Input

                            label="Data"

                            type="date"

                            name="data"

                            value={piano.data}

                            onChange={handleChange}

                        />



                    </div>









                    <div style={styles.group}>


                        <label style={styles.label}>

                            Descrizione

                        </label>



                        <textarea

                            name="descrizione"

                            value={piano.descrizione}

                            onChange={handleChange}

                            style={styles.textarea}

                        />



                    </div>


                    <Input

                        label="Redatto"

                        name="redatto"

                        value={piano.redatto}

                        onChange={handleChange}

                    />



                    <Input

                        label="Verificato"

                        name="verificato"

                        value={piano.verificato}

                        onChange={handleChange}

                    />



                    <Input

                        label="Approvato"

                        name="approvato"

                        value={piano.approvato}

                        onChange={handleChange}

                    />








                    <button

                        disabled={loading}

                        style={styles.button}

                    >


                        {loading

                            ?

                            "Salvataggio..."

                            :

                            "Crea Piano"

                        }


                    </button>








                    {success &&


                        <div style={styles.success}>

                            {success}

                        </div>


                    }







                    {serverError &&


                        <div style={styles.serverError}>

                            {serverError}

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





export default CreatePianoPage;