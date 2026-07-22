import { useEffect, useState, useRef } from "react";

import {
    useParams,
    useNavigate,
    Link
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
    getEsecuzioneById,
    updateEsecuzione,
    getIspezioni,
    getElementi
} from "../api/api";


function EditEsecuzionePage() {

    const { id } = useParams();

    const navigate = useNavigate();


    // =========================
    // DATI
    // =========================

    const [formData, setFormData] =
        useState(null);

    const [ispezioni, setIspezioni] =
        useState([]);

    const [elementi, setElementi] =
        useState([]);


    // =========================
    // STATO PAGINA
    // =========================

    const [errors, setErrors] =
        useState({});

    const [serverError, setServerError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [loadingData, setLoadingData] =
        useState(true);

    const [fotoPiano1File, setFotoPiano1File] = useState(null);

    const [fotoPiano2File, setFotoPiano2File] = useState(null);

    const [fotoPiano3File, setFotoPiano3File] = useState(null);

    const [fotoCantiere1File, setFotoCantiere1File] = useState(null);

    const [fotoCantiere2File, setFotoCantiere2File] = useState(null);

    const galleryPiano1Ref = useRef(null);
    const galleryPiano2Ref = useRef(null);
    const galleryPiano3Ref = useRef(null);

    const cameraPiano3Ref = useRef(null);

    const galleryCantiere1Ref = useRef(null);
    const galleryCantiere2Ref = useRef(null);

    const cameraCantiere1Ref = useRef(null);
    const cameraCantiere2Ref = useRef(null);

    const [previewFotoPiano1, setPreviewFotoPiano1] = useState(null);
    const [previewFotoPiano2, setPreviewFotoPiano2] = useState(null);
    const [previewFotoPiano3, setPreviewFotoPiano3] = useState(null);

    const [previewFotoCantiere1, setPreviewFotoCantiere1] = useState(null);
    const [previewFotoCantiere2, setPreviewFotoCantiere2] = useState(null);

    // =========================
    // CARICAMENTO
    // =========================

    useEffect(() => {

        loadData();

    }, [id]);


    async function loadData() {

        try {

            setLoadingData(true);

            setServerError("");


            const [
                esecuzione,
                ispezioniData,
                elementiData
            ] = await Promise.all([

                getEsecuzioneById(id),

                getIspezioni(),

                getElementi()

            ]);


            setIspezioni(
                ispezioniData || []
            );


            setElementi(
                elementiData || []
            );


            setFormData({

                esecuzioneId:
                esecuzione.esecuzioneId,


                numero:
                    esecuzione.numero ?? "",


                stato:
                esecuzione.stato,


                puntoPrevisto:
                    esecuzione.puntoPrevisto || "",


                note:
                    esecuzione.note || "",


                timestamp:

                    esecuzione.timestamp

                        ? esecuzione.timestamp.slice(0, 16)

                        : "",




                // GPS

                latitudine:
                    esecuzione.latitudine ?? "",

                longitudine:
                    esecuzione.longitudine ?? "",


                // RELAZIONI

                pianoIndagine: {

                    pianoId:
                    esecuzione.pianoId

                },


                prova: {

                    provaId:
                    esecuzione.provaId

                },


                elemento: {

                    elementoId:
                    esecuzione.elementoId

                },


                ispezione:

                    esecuzione.ispezioneId

                        ? {

                            ispezioneId:
                            esecuzione.ispezioneId

                        }

                        : null,


                spostatoElemento:

                    esecuzione.spostatoElementoId

                        ? {

                            elementoId:
                            esecuzione.spostatoElementoId

                        }

                        : null

            });

            setPreviewFotoPiano1(esecuzione.fotoPiano1);
            setPreviewFotoPiano2(esecuzione.fotoPiano2);
            setPreviewFotoPiano3(esecuzione.fotoPiano3);
            setPreviewFotoCantiere1(esecuzione.fotoCantiere1);
            setPreviewFotoCantiere2(esecuzione.fotoCantiere2);


        } catch (error) {

            console.error(error);


            setServerError(
                "❌ Errore durante il caricamento della prova"
            );


        } finally {

            setLoadingData(false);

        }

    }




    // =========================
    // CAMPI NORMALI
    // =========================

    function handleChange(e) {

        const {
            name,
            value
        } = e.target;


        setFormData(prev => ({

            ...prev,

            [name]: value

        }));


        clearError(name);

    }

    function handleImageChange(file, setFile, setPreview) {

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Seleziona un'immagine");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert("Immagine troppo grande");
            return;
        }

        setFile(file);

        setPreview(URL.createObjectURL(file));

    }



    function removeImage(setFile, setPreview, ...refs) {

        setFile(null);

        setPreview(null);

        refs.forEach(ref => {

            if (ref.current) {

                ref.current.value = "";

            }

        });

    }


    // =========================
    // CAMBIO STATO
    // =========================

    function handleStatoChange(e) {

        const nuovoStato =
            e.target.value;


        setFormData(prev => {

            const nuovo = {

                ...prev,

                stato:
                nuovoStato

            };


            // =========================
            // PREVISTA
            // =========================
            //
            // Ispezione opzionale.
            // Nessun timestamp.
            // Nessuna foto cantiere.
            // Nessun GPS.
            // Nessuno spostamento.
            //

            if (nuovoStato === "PREVISTA") {

                nuovo.timestamp = "";

                nuovo.fotoCantiere1 = "";

                nuovo.fotoCantiere2 = "";

                nuovo.latitudine = "";

                nuovo.longitudine = "";

                nuovo.spostatoElemento = null;

            }


            // =========================
            // AGGIUNTA IN SITO
            // =========================
            //
            // Ispezione obbligatoria.
            // Timestamp obbligatorio.
            // Note obbligatorie.
            // Foto piano disponibili.
            // Foto cantiere disponibili.
            // Nessun GPS.
            // Nessuno spostamento.
            //

            if (
                nuovoStato ===
                "AGGIUNTA_IN_SITO"
            ) {

                nuovo.latitudine = "";

                nuovo.longitudine = "";

                nuovo.spostatoElemento = null;

            }


            // =========================
            // ESEGUITA
            // =========================
            //
            // Ispezione obbligatoria.
            // Timestamp obbligatorio.
            // Note opzionali.
            // Foto piano disponibili.
            // Foto cantiere disponibili.
            // GPS opzionale.
            // Nessuno spostamento.
            //

            if (
                nuovoStato ===
                "ESEGUITA"
            ) {

                nuovo.spostatoElemento = null;

            }


            // =========================
            // NON ESEGUIBILE
            // =========================
            //
            // Ispezione obbligatoria.
            // Timestamp opzionale.
            // Note obbligatorie.
            // Foto piano disponibili.
            // Nessuna foto cantiere.
            // Nessun GPS.
            // Nessuno spostamento.
            //

            if (
                nuovoStato ===
                "NON_ESEGUIBILE"
            ) {

                nuovo.fotoCantiere1 = "";

                nuovo.fotoCantiere2 = "";

                nuovo.latitudine = "";

                nuovo.longitudine = "";

                nuovo.spostatoElemento = null;

            }


            // =========================
            // SPOSTATA
            // =========================
            //
            // Mantiene elemento origine.
            // Destinazione obbligatoria.
            // Note obbligatorie.
            // Nessuna ispezione.
            // Nessun timestamp.
            // Nessuna foto cantiere.
            // Nessun GPS.
            //

            if (
                nuovoStato ===
                "SPOSTATA"
            ) {

                nuovo.ispezione = null;

                nuovo.timestamp = "";

                nuovo.fotoCantiere1 = "";

                nuovo.fotoCantiere2 = "";

                nuovo.latitudine = "";

                nuovo.longitudine = "";

            }


            return nuovo;

        });


        setErrors({});

        setServerError("");

    }


    // =========================
    // ISPEZIONE
    // =========================

    function handleIspezioneChange(e) {

        const value =
            e.target.value;


        setFormData(prev => ({

            ...prev,

            ispezione:

                value

                    ? {

                        ispezioneId:
                            Number(value)

                    }

                    : null

        }));


        clearError("ispezione");

    }


    // =========================
    // ELEMENTO DESTINAZIONE
    // =========================

    function handleElementoSpostatoChange(e) {

        const value =
            e.target.value;


        setFormData(prev => ({

            ...prev,

            spostatoElemento:

                value

                    ? {

                        elementoId:
                            Number(value)

                    }

                    : null

        }));


        clearError("spostatoElemento");

    }


    // =========================
    // PULIZIA ERRORE
    // =========================

    function clearError(name) {

        setErrors(prev => ({

            ...prev,

            [name]: ""

        }));


        setServerError("");

    }


    // =========================
    // VALIDAZIONE
    // =========================

    function validate() {

        const newErrors = {};


        // =========================
        // CAMPI COMUNI
        // =========================


        if (
            !formData.numero

            ||

            Number(formData.numero) <= 0
        ) {

            newErrors.numero =
                "Inserisci un numero prova valido";

        }


        if (
            !formData.puntoPrevisto.trim()
        ) {

            newErrors.puntoPrevisto =
                "Il punto previsto è obbligatorio";

        }


        // =========================
        // AGGIUNTA IN SITO
        // =========================


        if (
            formData.stato ===
            "AGGIUNTA_IN_SITO"
        ) {

            if (
                !formData
                    .ispezione
                    ?.ispezioneId
            ) {

                newErrors.ispezione =
                    "L'ispezione è obbligatoria";

            }


            if (!formData.timestamp) {

                newErrors.timestamp =
                    "Il timestamp è obbligatorio";

            }


            if (!formData.note.trim()) {

                newErrors.note =
                    "Le note sono obbligatorie";

            }

        }


        // =========================
        // ESEGUITA
        // =========================


        if (
            formData.stato ===
            "ESEGUITA"
        ) {

            if (
                !formData
                    .ispezione
                    ?.ispezioneId
            ) {

                newErrors.ispezione =
                    "L'ispezione è obbligatoria";

            }


            if (!formData.timestamp) {

                newErrors.timestamp =
                    "Il timestamp è obbligatorio";

            }

        }


        // =========================
        // NON ESEGUIBILE
        // =========================


        if (
            formData.stato ===
            "NON_ESEGUIBILE"
        ) {

            if (
                !formData
                    .ispezione
                    ?.ispezioneId
            ) {

                newErrors.ispezione =
                    "L'ispezione è obbligatoria";

            }


            if (!formData.note.trim()) {

                newErrors.note =
                    "Il motivo della mancata esecuzione è obbligatorio";

            }

        }


        // =========================
        // SPOSTATA
        // =========================


        if (
            formData.stato ===
            "SPOSTATA"
        ) {

            if (!formData.note.trim()) {

                newErrors.note =
                    "Le note sono obbligatorie";

            }


            if (
                !formData
                    .spostatoElemento
                    ?.elementoId
            ) {

                newErrors.spostatoElemento =
                    "Seleziona l'elemento di destinazione";

            }


            if (
                formData
                    .spostatoElemento
                    ?.elementoId

                ===

                formData
                    .elemento
                    .elementoId
            ) {

                newErrors.spostatoElemento =
                    "L'elemento di destinazione deve essere diverso da quello di origine";

            }

        }


        return newErrors;

    }


    // =========================
    // SUBMIT
    // =========================

    async function handleSubmit(e) {

        e.preventDefault();


        const newErrors =
            validate();


        setErrors(
            newErrors
        );


        setSuccess("");

        setServerError("");


        if (
            Object.keys(newErrors).length > 0
        ) {

            return;

        }


        try {

            setLoading(true);


            const payload = {

                numero:
                    Number(formData.numero),


                stato:
                formData.stato,


                puntoPrevisto:
                formData.puntoPrevisto,


                note:
                formData.note,


                timestamp:

                    formData.timestamp

                        ? formData.timestamp

                        : null,


                // FOTO PIANO

                fotoPiano1:
                formData.fotoPiano1,

                fotoPiano2:
                formData.fotoPiano2,

                fotoPiano3:
                formData.fotoPiano3,


                // FOTO CANTIERE

                fotoCantiere1:
                formData.fotoCantiere1,

                fotoCantiere2:
                formData.fotoCantiere2,


                // GPS

                latitudine:

                    formData.latitudine !== ""

                        ? Number(formData.latitudine)

                        : null,


                longitudine:

                    formData.longitudine !== ""

                        ? Number(formData.longitudine)

                        : null,


                // RELAZIONI

                pianoIndagine:
                formData.pianoIndagine,


                prova:
                formData.prova,


                elemento:
                formData.elemento,


                ispezione:
                formData.ispezione,


                spostatoElemento:
                formData.spostatoElemento

            };


            await updateEsecuzione(

                id,

                payload,

                fotoPiano1File,

                fotoPiano2File,

                fotoPiano3File,

                fotoCantiere1File,

                fotoCantiere2File

            );


            setSuccess(

                "✅ Prova modificata correttamente"

            );


            setTimeout(() => {

                navigate(

                    `/esecuzione/${formData.esecuzioneId}`

                );

            }, 1000);


        } catch (error) {

            console.error(error);


            setServerError(

                "❌ Errore durante la modifica della prova"

            );


        } finally {

            setLoading(false);

        }

    }


    // =========================
    // CARICAMENTO
    // =========================

    if (loadingData) {

        return (

            <MainLayout>

                <div style={styles.loading}>

                    Caricamento...

                </div>

            </MainLayout>

        );

    }


    if (!formData) {

        return (

            <MainLayout>

                <div style={styles.serverError}>

                    {serverError || "Prova non disponibile"}

                </div>

            </MainLayout>

        );

    }


    // =========================
    // STATO CORRENTE
    // =========================

    const isPrevista =
        formData.stato === "PREVISTA";


    const isAggiuntaInSito =
        formData.stato === "AGGIUNTA_IN_SITO";


    const isEseguita =
        formData.stato === "ESEGUITA";


    const isNonEseguibile =
        formData.stato === "NON_ESEGUIBILE";


    const isSpostata =
        formData.stato === "SPOSTATA";


    // =========================
    // VISIBILITÀ
    // =========================


    const mostraIspezione =

        isPrevista

        ||

        isAggiuntaInSito

        ||

        isEseguita

        ||

        isNonEseguibile;


    const ispezioneObbligatoria =

        isAggiuntaInSito

        ||

        isEseguita

        ||

        isNonEseguibile;


    const mostraTimestamp =

        isAggiuntaInSito

        ||

        isEseguita

        ||

        isNonEseguibile;


    const timestampObbligatorio =

        isAggiuntaInSito

        ||

        isEseguita;


    const mostraFotoCantiere =

        isAggiuntaInSito

        ||

        isEseguita;


    const mostraGps =
        isEseguita;


    const noteObbligatorie =

        isAggiuntaInSito

        ||

        isNonEseguibile

        ||

        isSpostata;


    // =========================
    // ELEMENTO ORIGINE
    // =========================

    const elementoOrigine =

        elementi.find(

            elemento =>

                elemento.elementoId

                ===

                formData.elemento.elementoId

        );


    // =========================
    // RENDER
    // =========================

    return (

        <MainLayout>


            <div style={styles.container}>


                <Link

                    style={styles.backButton}

                    to={
                        `/esecuzione/${formData.esecuzioneId}`
                    }

                >

                    ← Torna alla prova

                </Link>


                <form

                    style={styles.card}

                    onSubmit={handleSubmit}

                >


                    {/* HEADER */}


                    <div>

                        <h1 style={styles.title}>

                            Modifica prova

                        </h1>


                        <p style={styles.subtitle}>

                            Aggiorna i dati e lo stato della prova.

                        </p>

                    </div>


                    {/* ========================= */}
                    {/* DATI DELLA PROVA */}
                    {/* ========================= */}


                    <SectionTitle>

                        Dati della prova

                    </SectionTitle>


                    <div style={styles.grid}>


                        <div style={styles.group}>

                            <label style={styles.label}>

                                Numero prova *

                            </label>


                            <input

                                style={styles.input}

                                type="number"

                                min="1"

                                name="numero"

                                value={
                                    formData.numero
                                }

                                onChange={
                                    handleChange
                                }

                            />


                            <FieldError
                                message={errors.numero}
                            />

                        </div>


                        <div style={styles.group}>

                            <label style={styles.label}>

                                Stato *

                            </label>


                            <select

                                style={styles.input}

                                value={
                                    formData.stato
                                }

                                onChange={
                                    handleStatoChange
                                }

                            >

                                <option value="PREVISTA">

                                    Prevista

                                </option>


                                <option value="AGGIUNTA_IN_SITO">

                                    Aggiunta in sito

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

                            </select>

                        </div>

                    </div>


                    {/* ELEMENTO ORIGINE */}


                    <div style={styles.group}>

                        <label style={styles.label}>

                            {

                                isSpostata

                                    ? "Elemento di origine"

                                    : "Elemento"

                            }

                        </label>


                        <input

                            style={styles.readOnlyInput}

                            value={

                                elementoOrigine

                                    ? `${elementoOrigine.codice} - Campata ${elementoOrigine.campata}`

                                    : `Elemento ${formData.elemento.elementoId}`

                            }

                            disabled

                        />

                    </div>


                    {/* PUNTO PREVISTO */}


                    <InputField

                        label="Punto previsto *"

                        name="puntoPrevisto"

                        value={
                            formData.puntoPrevisto
                        }

                        onChange={
                            handleChange
                        }

                        error={
                            errors.puntoPrevisto
                        }

                    />


                    {/* ========================= */}
                    {/* SPOSTAMENTO */}
                    {/* ========================= */}


                    {
                        isSpostata && (

                            <>

                                <SectionTitle>

                                    Spostamento della prova

                                </SectionTitle>


                                <div style={styles.moveGrid}>


                                    <div style={styles.group}>

                                        <label style={styles.label}>

                                            Da elemento

                                        </label>


                                        <input

                                            style={styles.readOnlyInput}

                                            value={

                                                elementoOrigine

                                                    ? `${elementoOrigine.codice} - Campata ${elementoOrigine.campata}`

                                                    : "Elemento origine"

                                            }

                                            disabled

                                        />

                                    </div>


                                    <div style={styles.arrow}>

                                        →

                                    </div>


                                    <div style={styles.group}>

                                        <label style={styles.label}>

                                            A elemento *

                                        </label>


                                        <select

                                            style={styles.input}

                                            value={

                                                formData
                                                    .spostatoElemento
                                                    ?.elementoId

                                                ||

                                                ""

                                            }

                                            onChange={
                                                handleElementoSpostatoChange
                                            }

                                        >

                                            <option value="">

                                                Seleziona destinazione

                                            </option>


                                            {
                                                elementi.map(elemento => (

                                                    <option

                                                        key={
                                                            elemento.elementoId
                                                        }

                                                        value={
                                                            elemento.elementoId
                                                        }

                                                    >

                                                        {elemento.codice}

                                                        {" - Campata "}

                                                        {elemento.campata}

                                                    </option>

                                                ))
                                            }

                                        </select>


                                        <FieldError

                                            message={
                                                errors.spostatoElemento
                                            }

                                        />

                                    </div>

                                </div>

                            </>

                        )
                    }


                    {/* ========================= */}
                    {/* ISPEZIONE */}
                    {/* ========================= */}


                    {
                        mostraIspezione && (

                            <>

                                <SectionTitle>

                                    Ispezione

                                </SectionTitle>


                                <div style={styles.group}>

                                    <label style={styles.label}>

                                        {

                                            ispezioneObbligatoria

                                                ? "Ispezione associata *"

                                                : "Ispezione associata"

                                        }

                                    </label>


                                    <select

                                        style={styles.input}

                                        value={

                                            formData
                                                .ispezione
                                                ?.ispezioneId

                                            ||

                                            ""

                                        }

                                        onChange={
                                            handleIspezioneChange
                                        }

                                    >

                                        <option value="">

                                            Nessuna ispezione selezionata

                                        </option>


                                        {
                                            ispezioni.map(ispezione => (

                                                <option

                                                    key={
                                                        ispezione.ispezioneId
                                                    }

                                                    value={
                                                        ispezione.ispezioneId
                                                    }

                                                >

                                                    {
                                                        ispezione.titoloIspezione
                                                    }

                                                </option>

                                            ))
                                        }

                                    </select>


                                    <FieldError
                                        message={errors.ispezione}
                                    />

                                </div>

                            </>

                        )
                    }


                    {/* ========================= */}
                    {/* TIMESTAMP */}
                    {/* ========================= */}


                    {
                        mostraTimestamp && (

                            <>

                                <SectionTitle>

                                    Dati temporali

                                </SectionTitle>


                                <InputField

                                    label={

                                        timestampObbligatorio

                                            ? "Timestamp esecuzione *"

                                            : "Timestamp esecuzione"

                                    }

                                    name="timestamp"

                                    type="datetime-local"

                                    value={
                                        formData.timestamp
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    error={
                                        errors.timestamp
                                    }

                                />

                            </>

                        )
                    }


                    {/* ========================= */}
                    {/* FOTO PIANO */}
                    {/* ========================= */}


                    <SectionTitle>

                        Foto della prova

                    </SectionTitle>


                    <p style={styles.helperText}>

                        Immagini previste dal piano di indagine.

                    </p>


                    <div style={styles.grid}>


                        <div style={styles.group}>

                            <label style={styles.label}>
                                Foto piano 1
                            </label>

                            <input
                                ref={galleryPiano1Ref}
                                type="file"
                                accept="image/*"
                                style={styles.hiddenInput}
                                onChange={(e)=>

                                    handleImageChange(

                                        e.target.files[0],

                                        setFotoPiano1File,

                                        setPreviewFotoPiano1

                                    )

                                }
                            />

                            <button
                                type="button"
                                style={styles.imageButton}
                                onClick={()=>galleryPiano1Ref.current.click()}
                            >
                                Seleziona immagine
                            </button>

                            {
                                previewFotoPiano1 &&

                                <div style={styles.previewContainer}>

                                    <img
                                        src={previewFotoPiano1}
                                        alt=""
                                        style={styles.previewImage}
                                    />

                                    <button
                                        type="button"
                                        style={styles.removeImageButton}
                                        onClick={()=>removeImage(
                                            setFotoPiano1File,
                                            setPreviewFotoPiano1,
                                            galleryPiano1Ref
                                        )}
                                    >
                                        Rimuovi
                                    </button>

                                </div>
                            }

                        </div>


                        <div style={styles.group}>

                            <label style={styles.label}>
                                Foto sezione
                            </label>

                            <div style={styles.imageActions}>

                                <button
                                    type="button"
                                    style={styles.imageButton}
                                    onClick={() => galleryPiano2Ref.current.click()}
                                >
                                    Seleziona immagine
                                </button>

                            </div>

                            <input
                                ref={galleryPiano2Ref}
                                type="file"
                                accept="image/*"
                                style={styles.hiddenInput}
                                onChange={(e) =>
                                    handleImageChange(
                                        e.target.files[0],
                                        setFotoPiano2File,
                                        setPreviewFotoPiano2
                                    )
                                }
                            />

                            {fotoPiano2File && (

                                <div style={styles.selectedFile}>

                                    {fotoPiano2File.name}

                                </div>

                            )}

                            {previewFotoPiano2 && (

                                <div style={styles.previewContainer}>

                                    <img
                                        src={previewFotoPiano2}
                                        alt="Foto sezione"
                                        style={styles.previewImage}
                                    />

                                    <button
                                        type="button"
                                        style={styles.removeImageButton}
                                        onClick={() =>
                                            removeImage(
                                                setFotoPiano2File,
                                                setPreviewFotoPiano2,
                                                galleryPiano2Ref
                                            )
                                        }
                                    >
                                        Rimuovi immagine
                                    </button>

                                </div>

                            )}

                        </div>


                        <div style={styles.group}>

                            <label style={styles.label}>
                                Foto realistica
                            </label>

                            <div style={styles.imageActions}>

                                <button
                                    type="button"
                                    style={styles.imageButton}
                                    onClick={() => galleryPiano3Ref.current.click()}
                                >
                                    Seleziona immagine
                                </button>

                                <button
                                    type="button"
                                    style={styles.imageButton}
                                    onClick={() => cameraPiano3Ref.current.click()}
                                >
                                    Scatta foto
                                </button>

                            </div>

                            <input
                                ref={galleryPiano3Ref}
                                type="file"
                                accept="image/*"
                                style={styles.hiddenInput}
                                onChange={(e)=>
                                    handleImageChange(
                                        e.target.files[0],
                                        setFotoPiano3File,
                                        setPreviewFotoPiano3
                                    )
                                }
                            />

                            <input
                                ref={cameraPiano3Ref}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                style={styles.hiddenInput}
                                onChange={(e)=>
                                    handleImageChange(
                                        e.target.files[0],
                                        setFotoPiano3File,
                                        setPreviewFotoPiano3
                                    )
                                }
                            />

                            {fotoPiano3File && (

                                <div style={styles.selectedFile}>

                                    {fotoPiano3File.name}

                                </div>

                            )}

                            {previewFotoPiano3 && (

                                <div style={styles.previewContainer}>

                                    <img
                                        src={previewFotoPiano3}
                                        alt="Foto realistica"
                                        style={styles.previewImage}
                                    />

                                    <button
                                        type="button"
                                        style={styles.removeImageButton}
                                        onClick={()=>
                                            removeImage(
                                                setFotoPiano3File,
                                                setPreviewFotoPiano3,
                                                galleryPiano3Ref,
                                                cameraPiano3Ref
                                            )
                                        }
                                    >
                                        Rimuovi immagine
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>


                    {/* ========================= */}
                    {/* FOTO CANTIERE */}
                    {/* ========================= */}


                    {
                        mostraFotoCantiere && (

                            <>

                                <SectionTitle>

                                    Foto di cantiere

                                </SectionTitle>


                                <div style={styles.grid}>


                                    <div style={styles.group}>

                                        <label style={styles.label}>
                                            Foto cantiere 1
                                        </label>

                                        <div style={styles.imageActions}>

                                            <button
                                                type="button"
                                                style={styles.imageButton}
                                                onClick={() => galleryCantiere1Ref.current.click()}
                                            >
                                                Seleziona immagine
                                            </button>

                                            <button
                                                type="button"
                                                style={styles.imageButton}
                                                onClick={() => cameraCantiere1Ref.current.click()}
                                            >
                                                Scatta foto
                                            </button>

                                        </div>

                                        <input
                                            ref={galleryCantiere1Ref}
                                            type="file"
                                            accept="image/*"
                                            style={styles.hiddenInput}
                                            onChange={(e)=>
                                                handleImageChange(
                                                    e.target.files[0],
                                                    setFotoCantiere1File,
                                                    setPreviewFotoCantiere1
                                                )
                                            }
                                        />

                                        <input
                                            ref={cameraCantiere1Ref}
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            style={styles.hiddenInput}
                                            onChange={(e)=>
                                                handleImageChange(
                                                    e.target.files[0],
                                                    setFotoCantiere1File,
                                                    setPreviewFotoCantiere1
                                                )
                                            }
                                        />

                                        {fotoCantiere1File && (

                                            <div style={styles.selectedFile}>

                                                {fotoCantiere1File.name}

                                            </div>

                                        )}

                                        {previewFotoCantiere1 && (

                                            <div style={styles.previewContainer}>

                                                <img
                                                    src={previewFotoCantiere1}
                                                    alt="Foto cantiere 1"
                                                    style={styles.previewImage}
                                                />

                                                <button
                                                    type="button"
                                                    style={styles.removeImageButton}
                                                    onClick={()=>
                                                        removeImage(
                                                            setFotoCantiere1File,
                                                            setPreviewFotoCantiere1,
                                                            galleryCantiere1Ref,
                                                            cameraCantiere1Ref
                                                        )
                                                    }
                                                >
                                                    Rimuovi immagine
                                                </button>

                                            </div>

                                        )}

                                    </div>

                                    <div style={styles.group}>

                                        <label style={styles.label}>
                                            Foto cantiere 2
                                        </label>

                                        <div style={styles.imageActions}>

                                            <button
                                                type="button"
                                                style={styles.imageButton}
                                                onClick={() => galleryCantiere2Ref.current.click()}
                                            >
                                                Seleziona immagine
                                            </button>

                                            <button
                                                type="button"
                                                style={styles.imageButton}
                                                onClick={() => cameraCantiere2Ref.current.click()}
                                            >
                                                Scatta foto
                                            </button>

                                        </div>

                                        <input
                                            ref={galleryCantiere2Ref}
                                            type="file"
                                            accept="image/*"
                                            style={styles.hiddenInput}
                                            onChange={(e)=>
                                                handleImageChange(
                                                    e.target.files[0],
                                                    setFotoCantiere2File,
                                                    setPreviewFotoCantiere2
                                                )
                                            }
                                        />

                                        <input
                                            ref={cameraCantiere2Ref}
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            style={styles.hiddenInput}
                                            onChange={(e)=>
                                                handleImageChange(
                                                    e.target.files[0],
                                                    setFotoCantiere2File,
                                                    setPreviewFotoCantiere2
                                                )
                                            }
                                        />

                                        {fotoCantiere2File && (

                                            <div style={styles.selectedFile}>

                                                {fotoCantiere2File.name}

                                            </div>

                                        )}

                                        {previewFotoCantiere2 && (

                                            <div style={styles.previewContainer}>

                                                <img
                                                    src={previewFotoCantiere2}
                                                    alt="Foto cantiere 2"
                                                    style={styles.previewImage}
                                                />

                                                <button
                                                    type="button"
                                                    style={styles.removeImageButton}
                                                    onClick={()=>
                                                        removeImage(
                                                            setFotoCantiere2File,
                                                            setPreviewFotoCantiere2,
                                                            galleryCantiere2Ref,
                                                            cameraCantiere2Ref
                                                        )
                                                    }
                                                >
                                                    Rimuovi immagine
                                                </button>

                                            </div>

                                        )}

                                    </div>


                                </div>

                            </>

                        )
                    }


                    {/* ========================= */}
                    {/* GPS */}
                    {/* ========================= */}


                    {
                        mostraGps && (

                            <>

                                <SectionTitle>

                                    Posizione GPS

                                </SectionTitle>


                                <p style={styles.helperText}>

                                    Coordinate opzionali del punto di esecuzione.

                                </p>


                                <div style={styles.grid}>


                                    <InputField

                                        label="Latitudine"

                                        name="latitudine"

                                        type="number"

                                        value={
                                            formData.latitudine
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    />


                                    <InputField

                                        label="Longitudine"

                                        name="longitudine"

                                        type="number"

                                        value={
                                            formData.longitudine
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    />

                                </div>

                            </>

                        )
                    }


                    {/* ========================= */}
                    {/* NOTE */}
                    {/* ========================= */}


                    <SectionTitle>

                        Note

                    </SectionTitle>


                    <div style={styles.group}>

                        <label style={styles.label}>

                            {

                                isNonEseguibile

                                    ? "Motivo della mancata esecuzione *"

                                    : noteObbligatorie

                                        ? "Note *"

                                        : "Note"

                            }

                        </label>


                        <textarea

                            style={styles.textarea}

                            name="note"

                            value={
                                formData.note
                            }

                            onChange={
                                handleChange
                            }

                        />


                        <FieldError
                            message={errors.note}
                        />

                    </div>


                    {/* ========================= */}
                    {/* BUTTON */}
                    {/* ========================= */}


                    <button

                        type="submit"

                        style={styles.button}

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Salvataggio..."

                                : "Salva modifiche"

                        }

                    </button>


                    {/* ========================= */}
                    {/* MESSAGGI */}
                    {/* ========================= */}


                    {
                        success && (

                            <div style={styles.success}>

                                {success}

                            </div>

                        )
                    }


                    {
                        serverError && (

                            <div style={styles.serverError}>

                                {serverError}

                            </div>

                        )
                    }


                </form>


            </div>


        </MainLayout>

    );

}


// =========================
// SECTION TITLE
// =========================

function SectionTitle({
                          children
                      }) {

    return (

        <div style={styles.sectionHeader}>

            <h2 style={styles.sectionTitle}>

                {children}

            </h2>

        </div>

    );

}


// =========================
// INPUT FIELD
// =========================

function InputField({

                        label,
                        name,
                        value,
                        onChange,
                        error,
                        type = "text"

                    }) {

    return (

        <div style={styles.group}>

            <label style={styles.label}>

                {label}

            </label>


            <input

                style={styles.input}

                type={type}

                name={name}

                value={value}

                onChange={onChange}

                step={
                    type === "number"
                        ? "any"
                        : undefined
                }

            />


            <FieldError
                message={error}
            />

        </div>

    );

}


// =========================
// FIELD ERROR
// =========================

function FieldError({
                        message
                    }) {

    if (!message) {

        return null;

    }


    return (

        <p style={styles.fieldError}>

            {message}

        </p>

    );

}


// =========================
// STYLES
// =========================

const styles = {

    container: {

        maxWidth: "900px",

        margin: "0 auto",

        display: "flex",

        flexDirection: "column",

        gap: "18px",

        paddingBottom: "120px"

    },


    card: {

        background: "#ffffff",

        padding: "24px",

        borderRadius: "18px",

        border: "1px solid #e2e8f0",

        boxShadow:
            "0 4px 12px rgba(15,23,42,0.05)",

        display: "flex",

        flexDirection: "column",

        gap: "20px"

    },


    backButton: {

        width: "fit-content",

        backgroundColor: "#ffffff",

        color: "#1e293b",

        padding: "10px 14px",

        borderRadius: "10px",

        textDecoration: "none",

        border: "1px solid #e2e8f0",

        fontWeight: "600"

    },


    title: {

        margin: 0,

        fontSize: "32px",

        fontWeight: "700",

        color: "#1e293b"

    },


    subtitle: {

        marginTop: "6px",

        marginBottom: 0,

        color: "#64748b"

    },


    sectionHeader: {

        borderBottom:
            "1px solid #e2e8f0",

        paddingBottom: "8px",

        marginTop: "4px"

    },


    sectionTitle: {

        margin: 0,

        color: "#334155",

        fontSize: "16px",

        fontWeight: "700"

    },


    helperText: {

        margin: "-10px 0 0 0",

        color: "#64748b",

        fontSize: "13px"

    },


    grid: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",

        gap: "18px"

    },


    moveGrid: {

        display: "grid",

        gridTemplateColumns:
            "1fr auto 1fr",

        alignItems: "end",

        gap: "16px"

    },


    arrow: {

        paddingBottom: "14px",

        fontSize: "24px",

        fontWeight: "700",

        color: "#64748b"

    },


    group: {

        display: "flex",

        flexDirection: "column",

        gap: "8px"

    },


    label: {

        fontWeight: "700",

        color: "#475569",

        fontSize: "13px"

    },


    input: {

        height: "48px",

        padding: "0 14px",

        borderRadius: "10px",

        border: "1px solid #cbd5e1",

        boxSizing: "border-box",

        width: "100%",

        background: "#ffffff",

        outline: "none"

    },


    readOnlyInput: {

        height: "48px",

        padding: "0 14px",

        borderRadius: "10px",

        border: "1px solid #cbd5e1",

        boxSizing: "border-box",

        width: "100%",

        background: "#f8fafc",

        color: "#475569"

    },


    textarea: {

        padding: "14px",

        minHeight: "130px",

        borderRadius: "10px",

        border: "1px solid #cbd5e1",

        boxSizing: "border-box",

        width: "100%",

        resize: "vertical"

    },


    button: {

        height: "50px",

        borderRadius: "10px",

        border: "none",

        backgroundColor: "#1e293b",

        color: "#ffffff",

        fontWeight: "700",

        cursor: "pointer",

        fontSize: "15px"

    },


    success: {

        background: "#dcfce7",

        color: "#166534",

        padding: "12px",

        borderRadius: "10px",

        fontWeight: "600"

    },

    preview: {

        width: "100%",

        maxHeight: "220px",

        objectFit: "cover",

        borderRadius: "10px",

        border: "1px solid #cbd5e1",

        marginBottom: "10px"

    },

    imageActions: {

        display: "grid",

            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",

            gap: "12px"

    },

    imageButton: {

        height: "48px",

            borderRadius: "10px",

            border: "1px solid #cbd5e1",

            background: "#ffffff",

            cursor: "pointer",

            fontWeight: "600"

    },

    hiddenInput: {

        display: "none"

    },

    selectedFile: {

        padding: "10px",

            border: "1px solid #e2e8f0",

            borderRadius: "10px",

            background: "#f8fafc",

            fontSize: "14px",

            color: "#475569"

    },

    previewContainer: {

        display: "flex",

            flexDirection: "column",

            gap: "12px"

    },

    previewImage: {

        width: "100%",

            maxHeight: "260px",

            objectFit: "cover",

            borderRadius: "10px",

            border: "1px solid #cbd5e1"

    },

    removeImageButton: {

        height: "42px",

            borderRadius: "10px",

            border: "1px solid #ef4444",

            background: "#ffffff",

            color: "#dc2626",

            cursor: "pointer",

            fontWeight: "600"

    },


    serverError: {

        background: "#fee2e2",

        color: "#991b1b",

        padding: "12px",

        borderRadius: "10px",

        fontWeight: "600"

    },


    fieldError: {

        color: "#dc2626",

        fontSize: "13px",

        margin: 0

    },


    loading: {

        padding: "30px",

        color: "#64748b"

    }

};


export default EditEsecuzionePage;