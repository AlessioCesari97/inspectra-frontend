import { useState }
    from "react";

import {
    useNavigate,
    Link
}
    from "react-router-dom";

import MainLayout
    from "../layouts/MainLayout";

import {
    createAsset
}
    from "../api/api";





const styles = {

    container: {

        maxWidth: "900px",

        margin: "0 auto",

        display: "flex",

        flexDirection: "column",

        gap: "18px",

        paddingBottom: "120px"
    },


    backButton: {

        width: "fit-content",

        backgroundColor: "#ffffff",

        color: "#1e293b",

        padding: "10px 14px",

        borderRadius: "10px",

        textDecoration: "none",

        fontWeight: "600",

        border: "1px solid #e2e8f0"
    },


    card: {

        backgroundColor: "#ffffff",

        border: "1px solid #e2e8f0",

        borderRadius: "18px",

        padding: "22px",

        display: "flex",

        flexDirection: "column",

        gap: "20px"
    },


    title: {

        margin:0,

        color:"#1e293b"
    },


    subtitle: {

        color:"#64748b",

        margin:0
    },


    sectionTitle: {

        margin:"10px 0 0",

        color:"#1e293b"
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


    inputError: {

        border:"1px solid #dc2626"
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










function CreateAssetPage() {


    const navigate =
        useNavigate();



    const [asset,setAsset] =
        useState({

            nome:"",

            strada:"",

            gestore:"",

            posizione:"",

            note:""
        });



    const [errors,setErrors] =
        useState({});


    const [serverError,setServerError] =
        useState("");


    const [success,setSuccess] =
        useState("");


    const [loading,setLoading] =
        useState(false);







    function handleChange(e){


        setAsset({

            ...asset,

            [e.target.name]:

            e.target.value

        });



        setErrors({

            ...errors,

            [e.target.name]:""

        });



        setServerError("");

    }









    async function handleSubmit(e){


        e.preventDefault();



        const newErrors = {};




        if(!asset.nome.trim()){


            newErrors.nome =

                "Il nome del viadotto è obbligatorio";

        }



        if(!asset.strada.trim()){


            newErrors.strada =

                "La strada è obbligatoria";

        }



        if(!asset.gestore.trim()){


            newErrors.gestore =

                "Il gestore è obbligatorio";

        }




        if(!asset.posizione.trim()){


            newErrors.posizione =

                "La posizione è obbligatoria";

        }





        setErrors(newErrors);





        if(Object.keys(newErrors).length > 0){


            return;

        }









        try{


            setLoading(true);




            await createAsset(asset);




            setSuccess(

                "✅ Viadotto creato correttamente"

            );




            setTimeout(()=>{


                navigate("/assets");


            },2000);






        }catch(error){





            if(error.response?.status === 409){



                setServerError(

                    "❌ Esiste già un viadotto con questo nome e questa strada"

                );



            }else{



                setServerError(

                    "❌ Errore durante il salvataggio dell'opera"

                );



            }





        }finally{


            setLoading(false);


        }


    }












    return(


        <MainLayout>


            <div style={styles.container}>





                <Link

                    to="/assets"

                    style={styles.backButton}

                >

                    ← Torna alle Opere

                </Link>








                <form

                    onSubmit={handleSubmit}

                    style={styles.card}

                >



                    <div>


                        <h1 style={styles.title}>

                            Nuovo Viadotto

                        </h1>




                        <p style={styles.subtitle}>

                            Inserisci le informazioni dell'opera

                        </p>



                    </div>








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










                    <h3 style={styles.sectionTitle}>

                        Informazioni principali

                    </h3>








                    <div style={styles.grid}>




                        <Input

                            label="Nome viadotto *"

                            name="nome"

                            value={asset.nome}

                            error={errors.nome}

                            onChange={handleChange}

                        />







                        <Input

                            label="Strada *"

                            name="strada"

                            value={asset.strada}

                            error={errors.strada}

                            onChange={handleChange}

                        />








                        <Input

                            label="Gestore *"

                            name="gestore"

                            value={asset.gestore}

                            error={errors.gestore}

                            onChange={handleChange}

                        />



                    </div>











                    <h3 style={styles.sectionTitle}>

                        Localizzazione

                    </h3>








                    <Input

                        label="Posizione *"

                        name="posizione"

                        value={asset.posizione}

                        error={errors.posizione}

                        onChange={handleChange}

                    />









                    <div style={styles.group}>


                        <label style={styles.label}>


                            Note


                        </label>





                        <textarea

                            name="note"

                            value={asset.note}

                            onChange={handleChange}

                            style={styles.textarea}

                            placeholder="Note aggiuntive..."

                        />



                    </div>









                    <button

                        disabled={loading}

                        style={styles.button}

                    >



                        {loading

                            ?

                            "Salvataggio..."

                            :

                            "Crea Viadotto"

                        }



                    </button>





                </form>




            </div>



        </MainLayout>


    );

}











function Input({
                   label,
                   name,
                   value,
                   error,
                   onChange
               }){


    return(


        <div style={styles.group}>


            <label style={styles.label}>


                {label}


            </label>





            <input

                name={name}

                value={value}

                onChange={onChange}

                style={{

                    ...styles.input,

                    ...(error

                        ? styles.inputError

                        : {})

                }}

            />







            {error &&


                <p style={styles.error}>


                    {error}


                </p>

            }




        </div>


    );

}




export default CreateAssetPage;