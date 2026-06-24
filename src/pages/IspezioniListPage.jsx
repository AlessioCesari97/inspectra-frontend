import { useEffect, useState }
    from "react";


import { Link }
    from "react-router-dom";


import MainLayout
    from "../layouts/MainLayout";


import { getIspezioni }
    from "../api/api";


import IspezioneCard
    from "../components/IspezioneCard";








const styles = {


    container: {

        display:"flex",

        flexDirection:"column",

        gap:"22px",

        maxWidth:"1200px",

        margin:"0 auto",

        paddingBottom:"120px"

    },




    header: {

        display:"flex",

        justifyContent:"space-between",

        alignItems:"center",

        gap:"20px",

        flexWrap:"wrap"

    },




    headerLeft: {

        display:"flex",

        flexDirection:"column",

        gap:"6px"

    },





    title: {

        fontSize:"32px",

        margin:0,

        color:"#1e293b",

        fontWeight:"700"

    },




    subtitle: {

        margin:0,

        color:"#64748b",

        fontSize:"14px"

    },





    addButton: {

        backgroundColor:"#1e293b",

        color:"#ffffff",

        padding:"12px 18px",

        borderRadius:"12px",

        textDecoration:"none",

        fontWeight:"700",

        fontSize:"14px"

    },






    searchBox: {

        backgroundColor:"#ffffff",

        border:"1px solid #e2e8f0",

        borderRadius:"14px",

        padding:"14px 16px",

        fontSize:"15px",

        outline:"none"

    },






    listContainer: {

        display:"flex",

        flexDirection:"column",

        gap:"14px"

    },






    emptyCard: {

        backgroundColor:"#ffffff",

        border:"1px dashed #cbd5e1",

        borderRadius:"16px",

        padding:"30px",

        textAlign:"center",

        color:"#64748b",

        fontWeight:"600"

    }



};









function IspezioniListPage(){



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




            const visibili =

                data.filter(

                    i =>

                        i.stato !== "ARCHIVIATA"

                );




            setIspezioni(

                visibili

            );



        }catch(error){



            console.error(

                "Errore caricamento ispezioni",

                error

            );



        }



    }









    const filteredIspezioni =



        ispezioni.filter(i =>



            i.titoloIspezione

                ?.toLowerCase()

                .includes(

                    search.toLowerCase()

                )


            ||



            i.assetNome

                ?.toLowerCase()

                .includes(

                    search.toLowerCase()

                )


            ||



            i.stato

                ?.toLowerCase()

                .includes(

                    search.toLowerCase()

                )



        );









    return(



        <MainLayout>





            <div style={styles.container}>







                <div style={styles.header}>







                    <div style={styles.headerLeft}>



                        <h1 style={styles.title}>


                            Ispezioni


                        </h1>





                        <p style={styles.subtitle}>


                            Gestione ispezioni operative


                        </p>




                    </div>










                    <Link

                        to="/nuova-ispezione"

                        style={styles.addButton}

                    >


                        + Nuova Ispezione


                    </Link>







                </div>










                <input


                    value={search}


                    onChange={

                        e =>

                            setSearch(

                                e.target.value

                            )

                    }


                    placeholder="Cerca ispezione per titolo, opera o stato..."


                    style={styles.searchBox}


                />









                <div style={styles.listContainer}>





                    {


                        filteredIspezioni.length === 0


                            ?


                            <div style={styles.emptyCard}>


                                Nessuna ispezione trovata


                            </div>



                            :



                            filteredIspezioni.map(

                                ispezione => (



                                    <IspezioneCard


                                        key={ispezione.ispezioneId}


                                        ispezione={ispezione}


                                    />



                                )

                            )



                    }






                </div>







            </div>





        </MainLayout>



    );


}






export default IspezioniListPage;