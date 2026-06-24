import {
    useEffect,
    useState
}
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

    createEsecuzione,

    getPianoById,

    getAssetById,

    getProve,

    getIspezioneById

}
    from "../api/api";









function CreateEsecuzionePage(){





    const navigate =
        useNavigate();




    const {

        pianoId,

        ispezioneId

    }
        =
        useParams();










    const [prove,setProve] =
        useState([]);




    const [elementi,setElementi] =
        useState([]);




    const [pianoNome,setPianoNome] =
        useState("");




    const [sigla,setSigla] =
        useState("");









    const [prova,setProva] =
        useState({




            numero:"",





            stato:

                ispezioneId

                    ?

                    "AGGIUNTA_IN_SITO"

                    :

                    "PREVISTA",







            puntoPrevisto:"",




            timestamp:"",




            note:"",








            fotoPiano1:"",


            fotoPiano2:"",


            fotoPiano3:"",




            fotoCantiere1:"",


            fotoCantiere2:"",








            pianoIndagine:{


                pianoId:

                    pianoId

                        ?

                        Number(pianoId)

                        :

                        null


            },








            prova:{


                provaId:""


            },








            elemento:{


                elementoId:""


            },








            ispezione:

                ispezioneId

                    ?

                    {

                        ispezioneId:

                            Number(ispezioneId)

                    }

                    :

                    null





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


    },[]);












    async function loadData(){





        try{





            let idPiano =
                pianoId;








            if(ispezioneId){






                const isp =


                    await getIspezioneById(


                        ispezioneId


                    );








                idPiano =

                    isp.pianoId;









                setProva(prev => ({


                    ...prev,



                    pianoIndagine:{


                        pianoId:

                        isp.pianoId


                    },




                    ispezione:{


                        ispezioneId:

                            Number(ispezioneId)


                    },




                    stato:

                        "AGGIUNTA_IN_SITO"




                }));






            }









            const piano =


                await getPianoById(


                    idPiano


                );








            setPianoNome(


                piano.codicePiano


            );









            if(piano.assetId){






                const asset =


                    await getAssetById(


                        piano.assetId


                    );







                setElementi(


                    asset.elementi || []


                );





            }









            const proveData =


                await getProve();








            setProve(


                proveData


            );








        }catch(error){





            console.error(error);





        }




    }     function handleChange(e){



        setProva({


            ...prova,


            [e.target.name]:

            e.target.value


        });






        setErrors({


            ...errors,


            [e.target.name]:""


        });






        setServerError("");



    }












    function handleProvaChange(e){





        const id =

            Number(

                e.target.value

            );









        const provaScelta =


            prove.find(

                p =>

                    p.provaId === id

            );








        setSigla(


            provaScelta

                ?

                provaScelta.sigla

                :

                ""


        );










        setProva({



            ...prova,



            prova:{


                provaId:id


            }




        });








        setErrors({


            ...errors,


            prova:""


        });




    }














    function handleElementoChange(e){







        setProva({




            ...prova,





            elemento:{


                elementoId:


                    Number(


                        e.target.value


                    )


            }





        });









        setErrors({


            ...errors,


            elemento:""


        });





    }














    async function handleSubmit(e){





        e.preventDefault();








        const newErrors = {};








        if(!prova.prova.provaId){



            newErrors.prova =


                "Seleziona tipologia prova";



        }










        if(!prova.numero){



            newErrors.numero =


                "Inserisci numero prova";



        }











        if(!prova.elemento.elementoId){



            newErrors.elemento =


                "Seleziona elemento";



        }











        if(!prova.puntoPrevisto.trim()){



            newErrors.puntoPrevisto =


                "Inserisci punto previsto";



        }











        if(prova.stato === "AGGIUNTA_IN_SITO"){







            if(!prova.ispezione){



                newErrors.ispezione =


                    "Ispezione non collegata";



            }








        }









        setErrors(

            newErrors

        );








        if(

            Object.keys(newErrors).length > 0

        ){



            return;



        }











        try{






            setLoading(true);








            await createEsecuzione(


                prova


            );









            setSuccess(


                "Prova creata correttamente"


            );









            setTimeout(()=>{







                navigate(



                    ispezioneId



                        ?



                        `/ispezione/${ispezioneId}`



                        :



                        `/piano/${pianoId}`




                );








            },700);









        }catch(error){








            console.error(error);








            setServerError(


                "Errore durante la creazione della prova"


            );








        }finally{







            setLoading(false);







        }







    }     return(


        <MainLayout>


            <div style={styles.container}>




                <Link

                    to={

                        ispezioneId

                            ?

                            `/ispezione/${ispezioneId}`

                            :

                            `/piano/${pianoId}`

                    }

                    style={styles.backButton}

                >


                    {

                        ispezioneId

                            ?

                            "← Torna all'ispezione"

                            :

                            "← Torna al piano"

                    }


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

                            Piano: {pianoNome}

                        </p>


                    </div>













                    {/* TIPOLOGIA */}



                    <div style={styles.group}>


                        <label style={styles.label}>

                            Tipologia prova *

                        </label>





                        <select

                            value={prova.prova.provaId}

                            onChange={handleProvaChange}

                            style={styles.input}

                        >



                            <option value="">

                                Seleziona tipologia

                            </option>






                            {

                                prove.map(p=>(


                                    <option

                                        key={p.provaId}

                                        value={p.provaId}

                                    >


                                        {p.nomeProva}


                                    </option>


                                ))

                            }





                        </select>






                        {errors.prova &&


                            <p style={styles.error}>

                                {errors.prova}

                            </p>

                        }



                    </div>













                    {/* CODICE */}



                    <div style={styles.group}>


                        <label style={styles.label}>


                            Codice prova *


                        </label>






                        <div style={styles.codeRow}>





                            <input

                                value={sigla}

                                disabled

                                placeholder="SIGLA"

                                style={styles.siglaInput}

                            />








                            <input


                                name="numero"

                                type="number"

                                placeholder="Numero"


                                value={prova.numero}


                                onChange={handleChange}


                                style={styles.numeroInput}


                            />






                        </div>







                        {errors.numero &&


                            <p style={styles.error}>

                                {errors.numero}

                            </p>


                        }





                    </div>













                    {/* STATO */}



                    <div style={styles.group}>


                        <label style={styles.label}>

                            Stato

                        </label>






                        <select


                            name="stato"


                            value={prova.stato}


                            onChange={handleChange}


                            style={styles.input}


                        >





                            <option value="PREVISTA">

                                Prevista

                            </option>





                            <option value="ESEGUITA">

                                Eseguita

                            </option>





                            <option value="NON_ESEGUIBILE">

                                Non eseguibile

                            </option>





                            <option value="SPOSTATA">

                                Spostata

                            </option>





                            <option value="AGGIUNTA_IN_SITO">

                                Aggiunta in sito

                            </option>





                        </select>



                    </div>












                    {/* ELEMENTO */}



                    <div style={styles.group}>


                        <label style={styles.label}>

                            Elemento *

                        </label>






                        <select


                            value={prova.elemento.elementoId}


                            onChange={handleElementoChange}


                            style={styles.input}

                        >




                            <option value="">

                                Seleziona elemento

                            </option>






                            {

                                elementi.map(e=>(



                                    <option

                                        key={e.elementoId}

                                        value={e.elementoId}

                                    >


                                        {e.codice}

                                        {" - Campata "}

                                        {e.campata}


                                    </option>



                                ))

                            }






                        </select>







                        {errors.elemento &&


                            <p style={styles.error}>

                                {errors.elemento}

                            </p>


                        }




                    </div>









                    <Input


                        label="Punto previsto *"


                        name="puntoPrevisto"


                        value={prova.puntoPrevisto}


                        onChange={handleChange}


                        error={errors.puntoPrevisto}


                    />


                    {/* NOTE */}


                    <div style={styles.group}>


                        <label style={styles.label}>

                            Note

                        </label>




                        <textarea


                            name="note"


                            value={prova.note}


                            onChange={handleChange}


                            style={styles.textarea}


                        />



                    </div>









                    {success &&


                        <p style={styles.success}>

                            {success}

                        </p>


                    }






                    {serverError &&


                        <p style={styles.error}>

                            {serverError}

                        </p>


                    }










                    <button


                        disabled={loading}


                        style={styles.button}


                    >



                        {

                            loading

                                ?

                                "Salvataggio..."

                                :

                                "Crea Prova"

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

                   onChange,

                   error

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










const styles = {




    container:{


        maxWidth:"900px",

        margin:"0 auto",

        display:"flex",

        flexDirection:"column",

        gap:"20px",

        paddingBottom:"120px"


    },







    card:{


        background:"#ffffff",

        padding:"25px",

        borderRadius:"18px",

        border:"1px solid #e2e8f0",

        boxShadow:
            "0 4px 12px rgba(15,23,42,0.05)",

        display:"flex",

        flexDirection:"column",

        gap:"18px"


    },







    title:{


        margin:0,

        fontSize:"32px",

        fontWeight:"700",

        color:"#1e293b"


    },







    subtitle:{


        margin:0,

        color:"#64748b",

        fontSize:"14px"


    },







    group:{


        display:"flex",

        flexDirection:"column",

        gap:"7px"


    },







    label:{


        fontWeight:"700",

        color:"#475569",

        fontSize:"14px"


    },








    input:{


        padding:"12px",

        borderRadius:"12px",

        border:"1px solid #cbd5e1",

        fontSize:"15px",

        outline:"none"


    },








    textarea:{


        padding:"12px",

        minHeight:"100px",

        borderRadius:"12px",

        border:"1px solid #cbd5e1",

        fontSize:"15px",

        outline:"none"


    },









    codeRow:{


        display:"flex",

        gap:"12px",

        alignItems:"center"


    },








    siglaInput:{


        width:"80px",

        padding:"10px",

        borderRadius:"10px",

        border:"1px solid #cbd5e1",

        background:"#f8fafc",

        color:"#1e293b",

        fontWeight:"700",

        textAlign:"center",

        fontSize:"14px"


    },








    numeroInput:{


        flex:1,

        padding:"12px",

        borderRadius:"12px",

        border:"1px solid #cbd5e1",

        fontSize:"16px",

        fontWeight:"700"


    },








    backButton:{


        width:"fit-content",

        background:"#ffffff",

        padding:"10px 14px",

        borderRadius:"10px",

        border:"1px solid #cbd5e1",

        textDecoration:"none",

        color:"#1e293b",

        fontWeight:"700"


    },









    button:{


        height:"50px",

        backgroundColor:"#1e293b",

        color:"#ffffff",

        border:"none",

        borderRadius:"12px",

        fontWeight:"700",

        fontSize:"15px",

        cursor:"pointer"


    },









    success:{


        color:"green",

        fontWeight:"700"


    },








    error:{


        color:"red",

        fontWeight:"700",

        margin:0


    }




};








export default CreateEsecuzionePage;