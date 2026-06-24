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
    createProva
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

        backgroundColor:"#ffffff",

        color:"#1e293b",

        padding:"10px 14px",

        borderRadius:"10px",

        textDecoration:"none",

        fontWeight:"600",

        border:"1px solid #e2e8f0"

    },



    card: {

        backgroundColor:"#ffffff",

        border:"1px solid #e2e8f0",

        borderRadius:"18px",

        padding:"22px",

        display:"flex",

        flexDirection:"column",

        gap:"20px"

    },



    title: {

        margin:0,

        color:"#1e293b",

        fontSize:"30px",

        fontWeight:"700"

    },



    subtitle: {

        margin:0,

        color:"#64748b",

        fontSize:"14px"

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











function CreateProvaPage(){



    const navigate =
        useNavigate();





    const [prova,setProva] =
        useState({


            nomeProva:"",

            sigla:"",

            descrizione:"",

            noteGenerali:""


        });






    const [errors,setErrors] =
        useState({});



    const [serverError,setServerError] =
        useState("");



    const [success,setSuccess] =
        useState("");



    const [loading,setLoading] =
        useState(false);









    function handleChange(event){



        let value =
            event.target.value;





        if(event.target.name === "sigla"){


            value =
                value.toUpperCase();


        }






        setProva({


            ...prova,


            [event.target.name]:

            value


        });






        setErrors({


            ...errors,


            [event.target.name]:""


        });






        setServerError("");

        setSuccess("");



    }
    async function handleSubmit(event){



        event.preventDefault();






        const newErrors = {};






        if(!prova.nomeProva.trim()){



            newErrors.nomeProva =

                "Il nome della prova è obbligatorio";



        }






        if(!prova.sigla.trim()){



            newErrors.sigla =

                "La sigla è obbligatoria";



        }







        setErrors(newErrors);







        if(Object.keys(newErrors).length > 0){


            return;


        }









        try{



            setLoading(true);


            setServerError("");


            setSuccess("");







            await createProva(prova);








            setSuccess(

                "✅ Prova creata correttamente"

            );








            setTimeout(()=>{


                navigate("/prove");


            },1500);









        }catch(error){






            if(error.response?.status === 409){



                setServerError(

                    "❌ Prova già presente nel catalogo"

                );



            }else{



                setServerError(

                    "❌ Errore durante il salvataggio della prova"

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

                    to="/prove"

                    style={styles.backButton}

                >


                    ← Catalogo Prove


                </Link>









                <form

                    onSubmit={handleSubmit}

                    style={styles.card}

                >









                    <div>



                        <h1 style={styles.title}>


                            Nuova Prova


                        </h1>





                        <p style={styles.subtitle}>


                            Inserisci una nuova prova nel catalogo


                        </p>




                    </div>










                    {serverError &&


                        <div style={styles.serverError}>


                            {serverError}


                        </div>


                    }










                    <div style={styles.grid}>





                        <Input


                            label="Nome Prova *"


                            name="nomeProva"


                            value={prova.nomeProva}


                            error={errors.nomeProva}


                            onChange={handleChange}


                        />








                        <Input


                            label="Sigla *"


                            name="sigla"


                            value={prova.sigla}


                            error={errors.sigla}


                            onChange={handleChange}


                        />




                    </div>











                    <div style={styles.group}>




                        <label style={styles.label}>


                            Descrizione


                        </label>






                        <textarea


                            name="descrizione"


                            value={prova.descrizione}


                            onChange={handleChange}


                            style={styles.textarea}


                        />




                    </div>











                    <div style={styles.group}>




                        <label style={styles.label}>


                            Note Generali


                        </label>







                        <textarea


                            name="noteGenerali"


                            value={prova.noteGenerali}


                            onChange={handleChange}


                            style={styles.textarea}


                        />



                    </div>










                    <button


                        disabled={loading}


                        style={styles.button}


                    >



                        {

                            loading

                                ?

                                "Salvataggio..."

                                :

                                "Salva Prova"

                        }



                    </button>









                    {success &&


                        <div style={styles.success}>


                            {success}


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

                        ?

                        styles.inputError

                        :

                        {})


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








export default CreateProvaPage;