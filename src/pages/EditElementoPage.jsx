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

    getElementoById,

    updateElemento,

    getTipiElemento,

    createTipoElemento

}
    from "../api/api";







function EditElementoPage(){



    const { id } =
        useParams();



    const navigate =
        useNavigate();





    const [tipi,setTipi] =
        useState([]);




    const [nuovoTipo,setNuovoTipo] =
        useState("");





    const [formData,setFormData] =
        useState({

            codice:"",

            campata:"",

            lato:"EST",

            tipoElementoId:"",

            descrizione:"",

            foto:"",

            latitudine:"",

            longitudine:"",

            assetId:""

        });





    const [errors,setErrors] =
        useState({});



    const [success,setSuccess] =
        useState("");



    const [serverError,setServerError] =
        useState("");



    const [loading,setLoading] =
        useState(false);








    useEffect(()=>{


        loadData();


    },[id]);









    async function loadData(){


        try{


            const tipiData =
                await getTipiElemento();



            setTipi(tipiData);






            const elemento =
                await getElementoById(id);







            setFormData({


                codice:
                    elemento.codice || "",


                campata:
                    elemento.campata || "",


                lato:
                    elemento.lato || "EST",


                tipoElementoId:
                    elemento.tipoElementoId || "",


                descrizione:
                    elemento.descrizione || "",


                foto:
                    elemento.foto || "",


                latitudine:
                    elemento.latitudine || "",


                longitudine:
                    elemento.longitudine || "",


                assetId:
                elemento.assetId


            });




        }catch(error){


            console.error(error);


        }


    }









    function handleChange(event){



        let value =
            event.target.value;




        if(

            event.target.name === "codice"

            ||

            event.target.name === "campata"

        ){


            value =
                value.toUpperCase();


        }






        setFormData({


            ...formData,


            [event.target.name]:

            value


        });






        setErrors({


            ...errors,


            [event.target.name]:""


        });



    }     async function aggiungiTipoElemento(){



        if(nuovoTipo.trim() === ""){


            return;


        }






        try{



            const tipoCreato =

                await createTipoElemento({


                    nome:

                        nuovoTipo

                            .trim()

                            .toUpperCase()


                });








            setTipi([


                ...tipi,


                tipoCreato


            ]);








            setFormData({



                ...formData,



                tipoElementoId:


                tipoCreato.tipoElementoId



            });







            setNuovoTipo("");





        }catch{



            setServerError(

                "❌ Impossibile creare il tipo elemento"

            );


        }



    }















    async function handleSubmit(event){



        event.preventDefault();





        const newErrors = {};






        if(!formData.codice.trim()){



            newErrors.codice =

                "Il codice elemento è obbligatorio";


        }







        if(!formData.campata.trim()){



            newErrors.campata =

                "La campata è obbligatoria";


        }








        if(!formData.tipoElementoId){



            newErrors.tipoElementoId =

                "Seleziona un tipo elemento";


        }








        setErrors(newErrors);






        if(Object.keys(newErrors).length > 0){


            return;


        }









        const body = {


            codice:

            formData.codice,


            campata:

            formData.campata,


            lato:

            formData.lato,


            descrizione:

            formData.descrizione,


            foto:

            formData.foto,



            latitudine:

                formData.latitudine === ""

                    ?

                    null

                    :

                    Number(

                        formData.latitudine

                    ),



            longitudine:

                formData.longitudine === ""

                    ?

                    null

                    :

                    Number(

                        formData.longitudine

                    ),



            tipo:{


                tipoElementoId:

                    Number(

                        formData.tipoElementoId

                    )


            },



            asset:{


                assetId:

                    Number(

                        formData.assetId

                    )


            }


        };










        try{



            setLoading(true);






            await updateElemento(


                id,


                body


            );








            setSuccess(


                "✅ Elemento aggiornato correttamente"


            );








            setTimeout(()=>{



                navigate(


                    `/elemento/${id}`


                );



            },1200);








        }catch{



            setServerError(


                "❌ Errore durante la modifica dell'elemento"


            );



        }finally{



            setLoading(false);



        }



    }














    return(



        <MainLayout>




            <div style={styles.container}>







                <Link


                    to={`/elemento/${id}`}


                    style={styles.backButton}


                >


                    ← Torna all'Elemento



                </Link>









                <form


                    onSubmit={handleSubmit}


                    style={styles.card}


                >








                    <div>




                        <h1 style={styles.title}>


                            Modifica Elemento


                        </h1>





                        <p style={styles.subtitle}>


                            Aggiorna i dati dell'elemento strutturale


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


                            label="Codice elemento *"


                            name="codice"


                            value={formData.codice}


                            error={errors.codice}


                            onChange={handleChange}


                        />








                        <Input


                            label="Campata *"


                            name="campata"


                            value={formData.campata}


                            error={errors.campata}


                            onChange={handleChange}


                        />






                    </div>                      <div style={styles.group}>


                    <label style={styles.label}>

                        Tipo elemento *

                    </label>



                    <select

                        name="tipoElementoId"

                        value={formData.tipoElementoId}

                        onChange={handleChange}

                        style={styles.input}

                    >


                        <option value="">

                            Seleziona tipo

                        </option>



                        {tipi.map(t => (


                            <option

                                key={t.tipoElementoId}

                                value={t.tipoElementoId}

                            >


                                {t.nome}


                            </option>


                        ))}



                    </select>


                </div>









                    <div style={styles.group}>


                        <label style={styles.label}>

                            Nuovo tipo elemento

                        </label>



                        <input

                            value={nuovoTipo}

                            onChange={(e)=>

                                setNuovoTipo(

                                    e.target.value.toUpperCase()

                                )

                            }

                            style={styles.input}

                        />



                        <button

                            type="button"

                            onClick={aggiungiTipoElemento}

                            style={styles.smallButton}

                        >


                            + Aggiungi Tipo


                        </button>



                    </div>









                    <h3 style={styles.sectionTitle}>

                        Lato

                    </h3>




                    <select

                        name="lato"

                        value={formData.lato}

                        onChange={handleChange}

                        style={styles.input}

                    >


                        <option value="EST">

                            EST

                        </option>


                        <option value="OVEST">

                            OVEST

                        </option>


                        <option value="CARREGGIATA_UNICA">

                            CARREGGIATA UNICA

                        </option>


                    </select>










                    <h3 style={styles.sectionTitle}>


                        Dettagli


                    </h3>




                    <textarea

                        name="descrizione"

                        value={formData.descrizione}

                        onChange={handleChange}

                        style={styles.textarea}

                    />







                    <Input

                        label="Foto"

                        name="foto"

                        value={formData.foto}

                        onChange={handleChange}

                    />









                    <h3 style={styles.sectionTitle}>


                        Posizione


                    </h3>





                    <div style={styles.grid}>


                        <Input

                            label="Latitudine"

                            name="latitudine"

                            value={formData.latitudine}

                            onChange={handleChange}

                        />



                        <Input

                            label="Longitudine"

                            name="longitudine"

                            value={formData.longitudine}

                            onChange={handleChange}

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

                                "Salva Elemento"

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

                    ...(error ? styles.inputError : {})

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










const styles = {


    container:{

        maxWidth:"900px",

        margin:"0 auto",

        display:"flex",

        flexDirection:"column",

        gap:"18px",

        paddingBottom:"120px"

    },



    backButton:{

        width:"fit-content",

        background:"#ffffff",

        color:"#1e293b",

        padding:"10px 14px",

        borderRadius:"10px",

        border:"1px solid #e2e8f0",

        textDecoration:"none",

        fontWeight:"600"

    },



    card:{

        background:"#ffffff",

        border:"1px solid #e2e8f0",

        borderRadius:"18px",

        padding:"22px",

        display:"flex",

        flexDirection:"column",

        gap:"20px"

    },



    title:{

        margin:0,

        color:"#1e293b"

    },



    subtitle:{

        color:"#64748b"

    },



    sectionTitle:{

        color:"#1e293b"

    },



    grid:{

        display:"grid",

        gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",

        gap:"18px"

    },



    group:{

        display:"flex",

        flexDirection:"column",

        gap:"8px"

    },



    label:{

        color:"#475569",

        fontWeight:"700",

        fontSize:"13px"

    },



    input:{

        height:"48px",

        borderRadius:"10px",

        border:"1px solid #cbd5e1",

        padding:"0 14px"

    },



    inputError:{

        border:"1px solid #dc2626"

    },



    textarea:{

        minHeight:"120px",

        borderRadius:"12px",

        border:"1px solid #cbd5e1",

        padding:"14px"

    },



    error:{

        color:"#dc2626"

    },



    success:{

        background:"#dcfce7",

        color:"#166534",

        padding:"12px",

        borderRadius:"10px"

    },



    serverError:{

        background:"#fee2e2",

        color:"#991b1b",

        padding:"12px",

        borderRadius:"10px"

    },



    button:{

        height:"50px",

        background:"#1e293b",

        color:"#ffffff",

        border:"none",

        borderRadius:"10px",

        fontWeight:"700"

    },



    smallButton:{

        height:"45px",

        background:"#475569",

        color:"#ffffff",

        border:"none",

        borderRadius:"10px"

    }


};




export default EditElementoPage;