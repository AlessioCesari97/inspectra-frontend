import { useEffect, useState }
    from "react";


import { Link }
    from "react-router-dom";


import MainLayout
    from "../layouts/MainLayout";


import PianoCard
    from "../components/PianoCard";


import { getPiani }
    from "../api/api";






const styles = {


    container: {

        display: "flex",

        flexDirection: "column",

        gap: "22px",

        maxWidth: "1200px",

        margin: "0 auto",

        paddingBottom: "120px"

    },





    header: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        gap: "20px",

        flexWrap: "wrap"

    },





    headerLeft: {

        display: "flex",

        flexDirection: "column",

        gap: "6px"

    },





    title: {

        fontSize: "32px",

        margin: 0,

        color: "#1e293b",

        fontWeight: "700"

    },





    subtitle: {

        margin: 0,

        color: "#64748b",

        fontSize: "14px"

    },





    addButton: {

        backgroundColor: "#1e293b",

        color: "#ffffff",

        padding: "12px 18px",

        borderRadius: "12px",

        textDecoration: "none",

        fontWeight: "700",

        fontSize: "14px",

        border: "1px solid #334155"

    },





    searchBox: {


        backgroundColor: "#ffffff",

        border: "1px solid #e2e8f0",

        borderRadius: "14px",

        padding: "14px 16px",

        fontSize: "15px",

        outline: "none"

    },





    listContainer: {

        display: "flex",

        flexDirection: "column",

        gap: "14px"

    },





    emptyCard: {


        backgroundColor: "#ffffff",

        border: "1px dashed #cbd5e1",

        borderRadius: "16px",

        padding: "30px",

        textAlign: "center",

        color: "#64748b",

        fontWeight: "600"

    }


};










function PianiListPage(){



    const [piani,setPiani] =
        useState([]);



    const [search,setSearch] =
        useState("");








    useEffect(()=>{


        loadPiani();


    },[]);









    async function loadPiani(){


        try{


            const data =
                await getPiani();



            setPiani(data);




        }catch(error){


            console.error(

                "Errore caricamento piani:",

                error

            );


        }


    }











    const filteredPiani =


        piani.filter(piano =>



            piano.codicePiano

                ?.toLowerCase()

                .includes(

                    search.toLowerCase()

                )



            ||



            piano.assetNome

                ?.toLowerCase()

                .includes(

                    search.toLowerCase()

                )



            ||



            piano.stato

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


                            Piani Indagine


                        </h1>





                        <p style={styles.subtitle}>


                            Gestione dei piani collegati alle opere


                        </p>




                    </div>








                    <Link

                        to="/nuovo-piano"

                        style={styles.addButton}

                    >


                        + Nuovo Piano


                    </Link>






                </div>









                <input


                    value={search}


                    onChange={(e)=>

                        setSearch(

                            e.target.value

                        )

                    }


                    placeholder="Cerca piano, opera o stato..."


                    style={styles.searchBox}


                />










                <div style={styles.listContainer}>





                    {

                        filteredPiani.length === 0


                            ?



                            <div style={styles.emptyCard}>


                                Nessun piano trovato


                            </div>




                            :





                            filteredPiani.map(piano => (




                                <PianoCard


                                    key={piano.pianoId}


                                    piano={piano}


                                />



                            ))


                    }





                </div>







            </div>




        </MainLayout>


    );


}




export default PianiListPage;