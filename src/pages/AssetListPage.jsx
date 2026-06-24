import { useEffect, useState }
    from "react";

import { Link }
    from "react-router-dom";

import { getAssets }
    from "../api/api";

import MainLayout
    from "../layouts/MainLayout";

import AssetCard
    from "../components/AssetCard";





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









function AssetListPage() {



    const [assets, setAssets] =
        useState([]);



    const [search, setSearch] =
        useState("");







    useEffect(() => {


        loadAssets();


    }, []);







    async function loadAssets() {


        try {


            const data =
                await getAssets();



            setAssets(data);



        } catch(error) {


            console.error(
                "Errore caricamento opere:",
                error
            );

        }

    }








    const filteredAssets =


        assets.filter(asset =>


            asset.nome

                ?.toLowerCase()

                .includes(

                    search.toLowerCase()

                )


            ||

            asset.strada

                ?.toLowerCase()

                .includes(

                    search.toLowerCase()

                )


            ||

            asset.gestore

                ?.toLowerCase()

                .includes(

                    search.toLowerCase()

                )

        );











    return (


        <MainLayout>



            <div style={styles.container}>





                <div style={styles.header}>





                    <div style={styles.headerLeft}>



                        <h1 style={styles.title}>


                            Opere


                        </h1>




                        <p style={styles.subtitle}>


                            Gestione viadotti e infrastrutture


                        </p>




                    </div>






                    <Link

                        to="/nuovo-asset"

                        style={styles.addButton}

                    >


                        + Nuova Opera


                    </Link>





                </div>







                <input

                    value={search}

                    onChange={(e) =>

                        setSearch(
                            e.target.value
                        )

                    }

                    placeholder="Cerca opera per nome, strada o gestore..."

                    style={styles.searchBox}

                />








                <div style={styles.listContainer}>





                    {

                        filteredAssets.length === 0


                            ?


                            <div style={styles.emptyCard}>


                                Nessuna opera trovata


                            </div>



                            :



                            filteredAssets.map(asset => (



                                <AssetCard

                                    key={asset.assetId}

                                    asset={asset}

                                />



                            ))



                    }





                </div>






            </div>



        </MainLayout>


    );

}




export default AssetListPage;