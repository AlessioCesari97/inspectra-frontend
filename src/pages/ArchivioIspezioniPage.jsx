import { useEffect, useState }
    from "react";


import { Link }
    from "react-router-dom";


import MainLayout
    from "../layouts/MainLayout";


import { getIspezioni }
    from "../api/api";








function ArchivioIspezioniPage(){



    const [ispezioni,setIspezioni] =
        useState([]);



    const [search,setSearch] =
        useState("");






    useEffect(()=>{


        loadIspezioni();


    },[]);








    async function loadIspezioni(){


        try{


            const data =
                await getIspezioni();




            setIspezioni(


                data.filter(

                    i => i.stato === "ARCHIVIATA"

                )


            );



        }catch(error){


            console.error(error);


        }


    }










    const filtered =



        ispezioni.filter(i => {




            const testo =


                `
                ${i.titoloIspezione}
                ${i.assetNome}
                ${i.codicePiano}
                ${i.stato}
                `

                    .toLowerCase();





            return testo.includes(

                search.toLowerCase()

            );


        });









    return(



        <MainLayout>





            <div style={styles.container}>








                <div style={styles.header}>





                    <div style={styles.headerLeft}>





                        <h1 style={styles.title}>


                            Archivio Ispezioni


                        </h1>






                        <p style={styles.subtitle}>


                            Storico delle ispezioni archiviate


                        </p>





                    </div>






                </div>












                <input



                    placeholder="Cerca ispezione..."


                    value={search}


                    onChange={

                        e => setSearch(e.target.value)

                    }


                    style={styles.searchBox}


                />













                <div style={styles.listContainer}>







                    {

                        filtered.length === 0



                            ?



                            <div style={styles.emptyCard}>


                                Nessuna ispezione archiviata


                            </div>






                            :






                            filtered.map(i => (







                                <Link



                                    key={i.ispezioneId}



                                    to={`/ispezione/${i.ispezioneId}`}



                                    style={styles.card}



                                >








                                    <div>



                                        <h2 style={styles.cardTitle}>


                                            {i.titoloIspezione}


                                        </h2>






                                        <p style={styles.text}>


                                            Opera: {i.assetNome || "-"}


                                        </p>





                                        <p style={styles.text}>


                                            Piano: {i.codicePiano || "-"}


                                        </p>






                                    </div>








                                    <span style={styles.badge}>


                                    {i.stato}


                                </span>







                                </Link>







                            ))

                    }








                </div>






            </div>






        </MainLayout>



    );



} const styles = {




    container:{


        display:"flex",

        flexDirection:"column",

        gap:"22px",

        maxWidth:"1200px",

        margin:"0 auto",

        paddingBottom:"120px"


    },









    header:{


        display:"flex",

        justifyContent:"space-between",

        alignItems:"center",

        gap:"20px",

        flexWrap:"wrap"


    },










    headerLeft:{


        display:"flex",

        flexDirection:"column",

        gap:"6px"


    },










    title:{


        fontSize:"32px",

        margin:0,

        color:"#1e293b",

        fontWeight:"700"


    },










    subtitle:{


        margin:0,

        color:"#64748b",

        fontSize:"14px"


    },











    searchBox:{


        backgroundColor:"#ffffff",

        border:"1px solid #e2e8f0",

        borderRadius:"14px",

        padding:"14px 16px",

        fontSize:"15px",

        outline:"none",

        color:"#1e293b"


    },











    listContainer:{


        display:"flex",

        flexDirection:"column",

        gap:"14px"


    },











    card:{


        backgroundColor:"#ffffff",

        border:"1px solid #e2e8f0",

        borderRadius:"16px",

        padding:"20px",

        textDecoration:"none",

        display:"flex",

        justifyContent:"space-between",

        alignItems:"center",

        gap:"20px",

        color:"#1e293b",

        boxShadow:

            "0 4px 12px rgba(15,23,42,0.05)"


    },










    cardTitle:{


        margin:"0 0 8px 0",

        fontSize:"20px",

        color:"#1e293b"


    },










    text:{


        margin:"4px 0",

        color:"#64748b",

        fontSize:"14px"


    },











    badge:{


        backgroundColor:"#f8fafc",

        border:"1px solid #cbd5e1",

        color:"#1e293b",

        padding:"8px 12px",

        borderRadius:"10px",

        fontWeight:"700",

        fontSize:"13px"


    },










    emptyCard:{


        backgroundColor:"#ffffff",

        border:"1px dashed #cbd5e1",

        borderRadius:"16px",

        padding:"30px",

        textAlign:"center",

        color:"#64748b",

        fontWeight:"600"


    }



};








export default ArchivioIspezioniPage;
