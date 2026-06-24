import {
    Routes,
    Route
}
    from "react-router-dom";


import HomePage
    from "./pages/HomePage";


import AssetListPage
    from "./pages/AssetListPage";


import AssetDetailPage
    from "./pages/AssetDetailPage";


import CreateAssetPage
    from "./pages/CreateAssetPage";

import CreateEsecuzionePage
    from "./pages/CreateEsecuzionePage";


import EditAssetPage
    from "./pages/EditAssetPage";


import PianiListPage
    from "./pages/PianiListPage";


import PianoDetailPage
    from "./pages/PianoDetailPage";


import CreatePianoPage
    from "./pages/CreatePianoPage";



import IspezioniListPage
    from "./pages/IspezioniListPage";


import IspezioneDetailPage
    from "./pages/IspezioneDetailPage";


import CreateIspezionePage
    from "./pages/CreateIspezionePage";



import EsecuzioneDetailPage
    from "./pages/EsecuzioneDetailPage";



import ProveListPage
    from "./pages/ProveListPage";


import ProvaDetailPage
    from "./pages/ProvaDetailPage";


import CreateProvaPage
    from "./pages/CreateProvaPage";


import EditProvaPage
    from "./pages/EditProvaPage";



import CreateElementoPage
    from "./pages/CreateElementoPage";


import ElementoDetailPage
    from "./pages/ElementoDetailPage";

import EditEsecuzionePage
    from "./pages/EditEsecuzionePage";

import EditPianoPage
    from "./pages/EditPianoPage";

import EditIspezionePage
    from "./pages/EditIspezionePage";

import EditElementoPage
    from "./pages/EditElementoPage";

import ArchivioIspezioniPage
    from "./pages/ArchivioIspezioniPage";



function App() {


    return (


        <Routes>



            {/* HOME */}

            <Route
                path="/"
                element={<HomePage />}
            />



            {/* ASSET */}

            <Route
                path="/assets"
                element={<AssetListPage />}
            />


            <Route
                path="/asset/:id"
                element={<AssetDetailPage />}
            />


            <Route
                path="/nuovo-asset"
                element={<CreateAssetPage />}
            />


            <Route
                path="/asset/:id/edit"
                element={<EditAssetPage />}
            />




            {/* PIANI INDAGINE */}


            <Route

                path="/piani"

                element={<PianiListPage />}

            />




            <Route

                path="/piano/:id"

                element={<PianoDetailPage />}

            />




            <Route

                path="/nuovo-piano"

                element={<CreatePianoPage />}

            />




            <Route

                path="/asset/:assetId/nuovo-piano"

                element={<CreatePianoPage />}

            />



            <Route

                path="/piani/:pianoId/edit"

                element={<EditPianoPage />}

            />


            {/* ISPEZIONI */}

            <Route
                path="/ispezioni"
                element={<IspezioniListPage />}
            />


            <Route
                path="/ispezione/:id"
                element={<IspezioneDetailPage />}
            />


            <Route
                path="/nuova-ispezione"
                element={<CreateIspezionePage />}
            />


            <Route
                path="/asset/:assetId/nuova-ispezione"
                element={<CreateIspezionePage />}
            />

            <Route

                path="/piano/:pianoId/nuova-ispezione"

                element={<CreateIspezionePage />}

            />


            <Route

                path="/ispezione/:id/edit"

                element={<EditIspezionePage />}

            />

            <Route

                path="/archivio-ispezioni"

                element={<ArchivioIspezioniPage />}

            />
            <Route

                path="/ispezione/:ispezioneId/nuova-esecuzione"

                element={<CreateEsecuzionePage />}

            />




            {/* ESECUZIONI */}



            <Route
                path="/esecuzione/:id"
                element={<EsecuzioneDetailPage />}
            />

            <Route

                path="/piano/:pianoId/nuova-esecuzione"

                element={<CreateEsecuzionePage />}

            />

            <Route

                path="/esecuzione/:id/edit"

                element={<EditEsecuzionePage />}

            />




            {/* PROVE */}

            <Route
                path="/prove"
                element={<ProveListPage />}
            />


            <Route
                path="/prova/:id"
                element={<ProvaDetailPage />}
            />


            <Route
                path="/nuova-prova"
                element={<CreateProvaPage />}
            />


            <Route
                path="/prova/:id/edit"
                element={<EditProvaPage />}
            />



            {/* ELEMENTI */}

            <Route

                path="/asset/:assetId/nuovo-elemento"

                element={<CreateElementoPage />}

            />
            <Route

                path="/elemento/:id"

                element={<ElementoDetailPage />}

            />

            <Route

                path="/elemento/:id/edit"

                element={<EditElementoPage />}

            />



        </Routes>


    );

}


export default App;