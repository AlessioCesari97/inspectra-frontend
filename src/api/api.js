const BASE_URL =
    "https://inspectra-backend-gw9h.onrender.com";




// =========================
// FUNZIONE GENERALE
// =========================

async function request(url, options = {}){


    const response =
        await fetch(
            BASE_URL + url,
            options
        );




    if(!response.ok){



        const message =
            await response.text();




        const error =
            new Error(

                message

            );




        error.status =
            response.status;




        throw error;



    }




    if(response.status === 204){


        return null;


    }




    return response.json();


}











// =========================
// ASSET
// =========================


export function getAssets(){


    return request(
        "/assets"
    );


}





export function getAssetById(id){


    return request(

        `/assets/${id}`

    );


}






export function createAsset(asset){


    return request(

        "/assets",

        {

            method:"POST",


            headers:{

                "Content-Type":
                    "application/json"

            },


            body:
                JSON.stringify(asset)

        }

    );


}






export function updateAsset(id,asset){



    return request(


        `/assets/${id}`,


        {

            method:"PUT",


            headers:{

                "Content-Type":
                    "application/json"

            },



            body:

                JSON.stringify(asset)


        }


    );



}











// =========================
// PIANI INDAGINE
// =========================


export function getPiani(){


    return request(

        "/piani-indagine"

    );


}






export function getPianoById(id){


    return request(

        `/piani-indagine/${id}`

    );


}







export function createPiano(piano){



    return request(

        "/piani-indagine",


        {

            method:"POST",


            headers:{

                "Content-Type":
                    "application/json"

            },



            body:

                JSON.stringify(piano)


        }


    );



}


export function updatePiano(id,piano){


    return request(

        `/piani-indagine/${id}`,

        {

            method:"PUT",


            headers:{

                "Content-Type":"application/json"

            },


            body:

                JSON.stringify(piano)

        }

    );


}

export function archiviaPiano(id){


    return request(

        `/piani-indagine/${id}/archivia`,

        {

            method:"PUT"

        }

    );


}









// =========================
// ISPEZIONI
// =========================



export function getIspezioni(){


    return request(

        "/ispezioni"

    );


}






export function getIspezioneById(id){


    return request(

        `/ispezioni/${id}`

    );


}








export function createIspezione(ispezione){



    return request(

        "/ispezioni",


        {

            method:"POST",


            headers:{

                "Content-Type":
                    "application/json"

            },



            body:

                JSON.stringify(ispezione)


        }


    );
}
export function updateIspezione(id,ispezione){


    return request(

        `/ispezioni/${id}`,

        {

            method:"PUT",


            headers:{

                "Content-Type":
                    "application/json"

            },


            body:

                JSON.stringify(ispezione)

        }

    );

}
// =========================
// PROVE
// =========================


export function getProve(){


    return request(

        "/prove"

    );


}







export function getProvaById(id){



    return request(

        `/prove/${id}`

    );



}







export function createProva(prova){



    return request(

        "/prove",


        {

            method:"POST",


            headers:{

                "Content-Type":
                    "application/json"

            },



            body:

                JSON.stringify(prova)


        }


    );



}








export function updateProva(id,prova){



    return request(

        `/prove/${id}`,

        {

            method:"PUT",


            headers:{

                "Content-Type":
                    "application/json"

            },



            body:

                JSON.stringify(prova)


        }


    );



}












// =========================
// ESECUZIONI
// =========================



export function getEsecuzioni(){



    return request(

        "/esecuzioni"

    );



}



// =========================
// ESEGUI PROVA
// =========================

export function eseguiEsecuzione(id){

    return request(

        `/esecuzioni/${id}/esegui`,

        {

            method:"PUT"

        }

    );

}






export function getEsecuzioneById(id){



    return request(

        `/esecuzioni/${id}`

    );



}








export function createEsecuzione(

    esecuzione,

    fotoPiano1 = null,

    fotoPiano2 = null,

    fotoPiano3 = null,

    fotoCantiere1 = null,

    fotoCantiere2 = null

) {

    const formData = new FormData();


    const esecuzioneBlob = new Blob(

        [JSON.stringify(esecuzione)],

        {
            type: "application/json"
        }

    );


    formData.append(
        "esecuzione",
        esecuzioneBlob
    );


    if (fotoPiano1) {

        formData.append(
            "fotoPiano1",
            fotoPiano1
        );

    }


    if (fotoPiano2) {

        formData.append(
            "fotoPiano2",
            fotoPiano2
        );

    }


    if (fotoPiano3) {

        formData.append(
            "fotoPiano3",
            fotoPiano3
        );

    }


    if (fotoCantiere1) {

        formData.append(
            "fotoCantiere1",
            fotoCantiere1
        );

    }


    if (fotoCantiere2) {

        formData.append(
            "fotoCantiere2",
            fotoCantiere2
        );

    }


    return request(

        "/esecuzioni",

        {

            method: "POST",

            body: formData

        }

    );

}








export function updateEsecuzione(

    id,

    esecuzione,

    fotoPiano1 = null,

    fotoPiano2 = null,

    fotoPiano3 = null,

    fotoCantiere1 = null,

    fotoCantiere2 = null

) {

    const formData = new FormData();


    const esecuzioneBlob = new Blob(

        [JSON.stringify(esecuzione)],

        {

            type: "application/json"

        }

    );


    formData.append(

        "esecuzione",

        esecuzioneBlob

    );


    if (fotoPiano1) {

        formData.append(

            "fotoPiano1",

            fotoPiano1

        );

    }


    if (fotoPiano2) {

        formData.append(

            "fotoPiano2",

            fotoPiano2

        );

    }


    if (fotoPiano3) {

        formData.append(

            "fotoPiano3",

            fotoPiano3

        );

    }


    if (fotoCantiere1) {

        formData.append(

            "fotoCantiere1",

            fotoCantiere1

        );

    }


    if (fotoCantiere2) {

        formData.append(

            "fotoCantiere2",

            fotoCantiere2

        );

    }


    return request(

        `/esecuzioni/${id}`,

        {

            method: "PUT",

            body: formData

        }

    );

}
// =========================
// PROVE DISPONIBILI PIANO
// =========================


export function getEsecuzioniDisponibili(pianoId){



    return request(

        `/esecuzioni/piano/${pianoId}/disponibili`

    );



}









// =========================
// ASSOCIA PROVA A ISPEZIONE
// =========================


export function associaEsecuzioneIspezione(

    esecuzioneId,

    ispezioneId

){



    return request(

        `/esecuzioni/${esecuzioneId}/associa-ispezione/${ispezioneId}`,

        {

            method:"PUT"

        }

    );



}











// =========================
// TIPI ELEMENTO
// =========================


export function getTipiElemento(){



    return request(

        "/tipi-elemento"

    );



}








export function createTipoElemento(tipo){



    return request(

        "/tipi-elemento",


        {

            method:"POST",


            headers:{

                "Content-Type":
                    "application/json"

            },


            body:

                JSON.stringify(tipo)

        }


    );



}











// =========================
// ELEMENTI
// =========================



export function getElementoById(id){



    return request(

        `/elementi/${id}`

    );



}








// =========================
// CREA ELEMENTO
// =========================

export function createElemento(elemento, immagine = null) {

    const formData = new FormData();


    // Parte JSON.
    // Deve essere application/json perché il backend usa:
    // @RequestPart("elemento") Elemento elemento

    const elementoBlob = new Blob(

        [JSON.stringify(elemento)],

        {
            type: "application/json"
        }

    );


    formData.append(
        "elemento",
        elementoBlob
    );


    // Immagine opzionale

    if (immagine) {

        formData.append(
            "immagine",
            immagine
        );

    }


    return request(

        "/elementi",

        {
            method: "POST",

            body: formData
        }

    );

}








export function getElementi(){



    return request(

        "/elementi"

    );



}

// =========================
// MODIFICA ELEMENTO
// =========================

export function updateElemento(
    id,
    elemento,
    immagine = null
) {

    const formData = new FormData();


    const elementoBlob = new Blob(

        [JSON.stringify(elemento)],

        {
            type: "application/json"
        }

    );


    formData.append(
        "elemento",
        elementoBlob
    );


    if (immagine) {

        formData.append(
            "immagine",
            immagine
        );

    }


    return request(

        `/elementi/${id}`,

        {
            method: "PUT",

            body: formData
        }

    );

}