import { useEffect, useState }
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

    createIspezione,

    getAssets,

    getAssetById

}
    from "../api/api";









function CreateIspezionePage(){



    const navigate =
        useNavigate();



    const { assetId } =
        useParams();







    const [assets,setAssets] =
        useState([]);



    const [assetNome,setAssetNome] =
        useState("");



    const [piani,setPiani] =
        useState([]);







    const [error,setError] =
        useState("");



    const [success,setSuccess] =
        useState("");








    const [ispezione,setIspezione] =
        useState({



            titoloIspezione:"",



            dataIspezione:"",






            operatoreProve:"",



            ingegnere:"",



            referenteConcessionaria:"",






            annotazioniAggiuntive:"",





            stato:"BOZZA",




            createdBy:"",







            asset:{


                assetId:

                    assetId || ""


            },






            pianoIndagine:{


                pianoId:""


            }



        });












    useEffect(()=>{



        loadData();



    },[]);














    async function loadData(){





        try{







            if(assetId){






                const asset =


                    await getAssetById(

                        assetId

                    );







                setAssetNome(

                    asset.nome

                );







                setPiani(

                    asset.piani || []

                );








            }else{







                const data =


                    await getAssets();








                setAssets(

                    data

                );






            }









        }catch(error){






            console.error(error);






        }





    }













    async function handleAssetChange(event){






        const id =


            event.target.value;








        setIspezione({




            ...ispezione,







            asset:{



                assetId:id



            },







            pianoIndagine:{



                pianoId:""



            }






        });










        if(id){






            const asset =


                await getAssetById(

                    id

                );








            setPiani(


                asset.piani || []


            );








        }else{







            setPiani([]);







        }






    }












    function handlePianoChange(event){







        setIspezione({






            ...ispezione,








            pianoIndagine:{





                pianoId:


                event.target.value






            }






        });






    }     function handleChange(event){



        setIspezione({



            ...ispezione,



            [event.target.name]:

            event.target.value



        });





        setError("");



    }













    async function handleSubmit(event){





        event.preventDefault();







        setError("");


        setSuccess("");








        try{








            await createIspezione(



                ispezione



            );









            setSuccess(


                "✅ Ispezione creata correttamente"


            );









            setTimeout(()=>{






                navigate(


                    "/ispezioni"


                );






            },1000);









        }catch(error){








            console.error(error);









            setError(


                "❌ Impossibile creare l'ispezione. Controlla i campi obbligatori."


            );








        }






    }

















    return(




        <MainLayout>






            <div style={styles.container}>









                <Link


                    to="/ispezioni"


                    style={styles.backButton}


                >




                    ← Ispezioni





                </Link>













                <div style={styles.headerCard}>







                    <h1 style={styles.title}>




                        Nuova Ispezione





                    </h1>









                    <p style={styles.subtitle}>





                        Stato iniziale: BOZZA






                    </p>







                </div>














                <form



                    onSubmit={handleSubmit}



                    style={styles.formCard}



                >







                    {


                        error &&




                        <div style={styles.errorBox}>





                            {error}





                        </div>



                    }









                    {


                        success &&




                        <div style={styles.successBox}>





                            {success}





                        </div>



                    }                    {

                    !assetId

                        ?

                        <select


                            required


                            value={ispezione.asset.assetId}


                            onChange={handleAssetChange}


                            style={styles.input}


                        >



                            <option value="">


                                Seleziona Opera


                            </option>







                            {assets.map((a)=>(




                                <option


                                    key={a.assetId}


                                    value={a.assetId}


                                >



                                    {a.nome}




                                </option>




                            ))}





                        </select>





                        :




                        <input


                            disabled


                            value={assetNome}


                            style={styles.input}


                        />



                }









                    <select



                        value={ispezione.pianoIndagine.pianoId}



                        onChange={handlePianoChange}



                        style={styles.input}



                    >





                        <option value="">



                            Seleziona Piano Indagine



                        </option>








                        {piani.map((p)=>(




                            <option


                                key={p.pianoId}


                                value={p.pianoId}


                            >




                                {p.codicePiano}




                            </option>





                        ))}






                    </select>












                    <input



                        required



                        name="titoloIspezione"



                        placeholder="Titolo Ispezione *"



                        value={ispezione.titoloIspezione}



                        onChange={handleChange}



                        style={styles.input}



                    />









                    <input




                        type="date"



                        name="dataIspezione"



                        value={ispezione.dataIspezione}



                        onChange={handleChange}



                        style={styles.input}



                    />










                    <input



                        name="createdBy"



                        placeholder="Creato da"



                        value={ispezione.createdBy}



                        onChange={handleChange}



                        style={styles.input}



                    />









                    <input



                        name="operatoreProve"



                        placeholder="Operatore prove"



                        value={ispezione.operatoreProve}



                        onChange={handleChange}



                        style={styles.input}



                    />










                    <input



                        name="ingegnere"



                        placeholder="Ingegnere"



                        value={ispezione.ingegnere}



                        onChange={handleChange}



                        style={styles.input}



                    />










                    <input



                        name="referenteConcessionaria"



                        placeholder="Referente concessionaria"



                        value={ispezione.referenteConcessionaria}



                        onChange={handleChange}



                        style={styles.input}



                    />











                    <textarea



                        name="annotazioniAggiuntive"



                        placeholder="Annotazioni"



                        value={ispezione.annotazioniAggiuntive}



                        onChange={handleChange}



                        style={styles.textarea}



                    />












                    <button



                        type="submit"



                        style={styles.button}



                    >




                        Salva Ispezione





                    </button>









                </form>







            </div>






        </MainLayout>




    );



} const styles = {




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


        backgroundColor:"#ffffff",


        color:"#1e293b",


        padding:"10px 14px",


        borderRadius:"10px",


        border:"1px solid #e2e8f0",


        textDecoration:"none",


        fontWeight:"600"


    },










    headerCard:{


        backgroundColor:"#ffffff",


        padding:"22px",


        borderRadius:"18px",


        border:"1px solid #e2e8f0",


        display:"flex",


        flexDirection:"column",


        gap:"6px"


    },










    title:{


        margin:0,


        color:"#1e293b",


        fontSize:"30px",


        fontWeight:"700"


    },










    subtitle:{


        margin:0,


        color:"#64748b",


        fontSize:"14px"


    },











    formCard:{


        backgroundColor:"#ffffff",


        padding:"22px",


        borderRadius:"18px",


        border:"1px solid #e2e8f0",


        display:"flex",


        flexDirection:"column",


        gap:"16px",


        boxShadow:

            "0 4px 12px rgba(15,23,42,0.05)"


    },










    input:{


        height:"48px",


        padding:"0 14px",


        borderRadius:"10px",


        border:"1px solid #cbd5e1",


        fontSize:"14px",


        outline:"none",


        color:"#1e293b",


        backgroundColor:"#ffffff"


    },










    textarea:{


        minHeight:"120px",


        padding:"14px",


        borderRadius:"12px",


        border:"1px solid #cbd5e1",


        resize:"vertical",


        outline:"none",


        fontSize:"14px",


        color:"#1e293b"


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










    errorBox:{


        backgroundColor:"#fee2e2",


        color:"#991b1b",


        padding:"12px 14px",


        borderRadius:"10px",


        fontWeight:"600",


        border:"1px solid #fecaca"


    },










    successBox:{


        backgroundColor:"#dcfce7",


        color:"#166534",


        padding:"12px 14px",


        borderRadius:"10px",


        fontWeight:"600",


        border:"1px solid #bbf7d0"


    }



};







export default CreateIspezionePage;