import { useEffect, useState } from "react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
    createEsecuzione,
    getAssetById,
    getIspezioneById,
    getPianoById,
    getProve
} from "../api/api";


function CreateEsecuzionePage() {

    const navigate = useNavigate();

    const {
        pianoId,
        ispezioneId
    } = useParams();


    // =========================
    // DATI CARICATI
    // =========================

    const [prove, setProve] = useState([]);

    const [elementi, setElementi] = useState([]);

    const [ispezioni, setIspezioni] = useState([]);

    const [pianoNome, setPianoNome] = useState("");

    const [sigla, setSigla] = useState("");


    // =========================
    // STATO PAGINA
    // =========================

    const [errors, setErrors] = useState({});

    const [success, setSuccess] = useState("");

    const [serverError, setServerError] = useState("");

    const [loading, setLoading] = useState(false);

    const [loadingData, setLoadingData] = useState(true);


    // =========================
    // FORM
    // =========================

    const [esecuzione, setEsecuzione] = useState(() => ({

        numero: "",

        stato:
            ispezioneId
                ? "AGGIUNTA_IN_SITO"
                : "PREVISTA",

        puntoPrevisto: "",

        timestamp: "",

        note: "",


        // FOTO DEL PIANO

        fotoPiano1: "",

        fotoPiano2: "",

        fotoPiano3: "",


        // FOTO DI CANTIERE

        fotoCantiere1: "",

        fotoCantiere2: "",


        // GPS

        latitudine: "",

        longitudine: "",


        // RELAZIONI

        pianoIndagine: {

            pianoId:
                pianoId
                    ? Number(pianoId)
                    : null

        },


        prova: {

            provaId: ""

        },


        elemento: {

            elementoId: ""

        },


        ispezione:

            ispezioneId

                ? {

                    ispezioneId:
                        Number(ispezioneId)

                }

                : null,


        spostatoElemento: null

    }));


    // =========================
    // CARICAMENTO DATI
    // =========================

    useEffect(() => {

        loadData();

    }, [pianoId, ispezioneId]);


    async function loadData() {

        try {

            setLoadingData(true);

            setServerError("");


            let idPiano = pianoId;


            // =========================
            // ARRIVO DA ISPEZIONE
            // =========================

            if (ispezioneId) {

                const ispezione =
                    await getIspezioneById(
                        ispezioneId
                    );


                idPiano = ispezione.pianoId;


                setIspezioni([
                    ispezione
                ]);


                setEsecuzione(prev => ({

                    ...prev,

                    stato:
                        "AGGIUNTA_IN_SITO",

                    pianoIndagine: {

                        pianoId:
                            Number(ispezione.pianoId)

                    },

                    ispezione: {

                        ispezioneId:
                            Number(ispezioneId)

                    }

                }));

            }


            if (!idPiano) {

                throw new Error(
                    "Piano di indagine non disponibile"
                );

            }


            // =========================
            // PIANO
            // =========================

            const piano =
                await getPianoById(
                    idPiano
                );


            setPianoNome(
                piano.codicePiano
            );


            setEsecuzione(prev => ({

                ...prev,

                pianoIndagine: {

                    pianoId:
                        Number(idPiano)

                }

            }));


            // =========================
            // ELEMENTI DELL'ASSET
            // =========================

            if (piano.assetId) {

                const asset =
                    await getAssetById(
                        piano.assetId
                    );


                setElementi(
                    asset.elementi || []
                );

            }


            // =========================
            // TIPOLOGIE DI PROVA
            // =========================

            const proveData =
                await getProve();


            setProve(
                proveData || []
            );


        } catch (error) {

            console.error(error);


            setServerError(

                "❌ Errore durante il caricamento dei dati"

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


        setEsecuzione(prev => ({

            ...prev,

            [name]: value

        }));


        setErrors(prev => ({

            ...prev,

            [name]: ""

        }));


        setServerError("");

    }


    // =========================
    // CAMBIO STATO
    // =========================

    function handleStatoChange(e) {

        const nuovoStato =
            e.target.value;


        setEsecuzione(prev => ({

            ...prev,

            stato:
            nuovoStato,


            timestamp:

                nuovoStato === "AGGIUNTA_IN_SITO"

                ||

                nuovoStato === "ESEGUITA"

                ||

                nuovoStato === "NON_ESEGUIBILE"

                    ? prev.timestamp

                    : "",


            latitudine:

                nuovoStato === "ESEGUITA"

                    ? prev.latitudine

                    : "",


            longitudine:

                nuovoStato === "ESEGUITA"

                    ? prev.longitudine

                    : "",


            fotoCantiere1:

                nuovoStato === "AGGIUNTA_IN_SITO"

                ||

                nuovoStato === "ESEGUITA"

                    ? prev.fotoCantiere1

                    : "",


            fotoCantiere2:

                nuovoStato === "AGGIUNTA_IN_SITO"

                ||

                nuovoStato === "ESEGUITA"

                    ? prev.fotoCantiere2

                    : "",


            spostatoElemento:

                nuovoStato === "SPOSTATA"

                    ? prev.spostatoElemento

                    : null

        }));


        setErrors({});

        setServerError("");

    }


    // =========================
    // PROVA
    // =========================

    function handleProvaChange(e) {

        const value = e.target.value;


        const id = value
            ? Number(value)
            : "";


        const provaScelta =
            prove.find(
                prova =>
                    prova.provaId === id
            );


        setSigla(
            provaScelta?.sigla || ""
        );


        setEsecuzione(prev => ({

            ...prev,

            prova: {

                provaId: id

            }

        }));


        clearError("prova");

    }


    // =========================
    // ELEMENTO ORIGINE
    // =========================

    function handleElementoChange(e) {

        const value = e.target.value;


        setEsecuzione(prev => ({

            ...prev,

            elemento: {

                elementoId:
                    value
                        ? Number(value)
                        : ""

            }

        }));


        clearError("elemento");

    }


    // =========================
    // ISPEZIONE
    // =========================

    function handleIspezioneChange(e) {

        const value = e.target.value;


        setEsecuzione(prev => ({

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

    function handleSpostatoElementoChange(e) {

        const value = e.target.value;


        setEsecuzione(prev => ({

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


        // CAMPI COMUNI


        if (!esecuzione.prova.provaId) {

            newErrors.prova =
                "Seleziona la tipologia di prova";

        }


        if (
            !esecuzione.numero

            ||

            Number(esecuzione.numero) <= 0
        ) {

            newErrors.numero =
                "Inserisci un numero prova valido";

        }


        if (!esecuzione.elemento.elementoId) {

            newErrors.elemento =
                "Seleziona l'elemento";

        }


        if (!esecuzione.puntoPrevisto.trim()) {

            newErrors.puntoPrevisto =
                "Il punto previsto è obbligatorio";

        }


        // AGGIUNTA IN SITO


        if (
            esecuzione.stato ===
            "AGGIUNTA_IN_SITO"
        ) {

            if (!esecuzione.ispezione?.ispezioneId) {

                newErrors.ispezione =
                    "L'ispezione è obbligatoria";

            }


            if (!esecuzione.timestamp) {

                newErrors.timestamp =
                    "Il timestamp è obbligatorio";

            }


            if (!esecuzione.note.trim()) {

                newErrors.note =
                    "Le note sono obbligatorie";

            }

        }


        // ESEGUITA


        if (
            esecuzione.stato ===
            "ESEGUITA"
        ) {

            if (!esecuzione.ispezione?.ispezioneId) {

                newErrors.ispezione =
                    "L'ispezione è obbligatoria";

            }


            if (!esecuzione.timestamp) {

                newErrors.timestamp =
                    "Il timestamp è obbligatorio";

            }

        }


        // NON ESEGUIBILE


        if (
            esecuzione.stato ===
            "NON_ESEGUIBILE"
        ) {

            if (!esecuzione.ispezione?.ispezioneId) {

                newErrors.ispezione =
                    "L'ispezione è obbligatoria";

            }


            if (!esecuzione.note.trim()) {

                newErrors.note =
                    "Il motivo della mancata esecuzione è obbligatorio";

            }

        }


        // SPOSTATA


        if (
            esecuzione.stato ===
            "SPOSTATA"
        ) {

            if (!esecuzione.note.trim()) {

                newErrors.note =
                    "Le note sono obbligatorie";

            }


            if (
                !esecuzione
                    .spostatoElemento
                    ?.elementoId
            ) {

                newErrors.spostatoElemento =
                    "Seleziona l'elemento di destinazione";

            }


            if (
                esecuzione
                    .spostatoElemento
                    ?.elementoId

                ===

                esecuzione
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


        if (
            Object.keys(newErrors).length > 0
        ) {

            return;

        }


        try {

            setLoading(true);

            setSuccess("");

            setServerError("");


            const payload = {

                ...esecuzione,


                numero:
                    Number(esecuzione.numero),


                timestamp:

                    esecuzione.timestamp

                        ? esecuzione.timestamp

                        : null,


                latitudine:

                    esecuzione.latitudine !== ""

                        ? Number(esecuzione.latitudine)

                        : null,


                longitudine:

                    esecuzione.longitudine !== ""

                        ? Number(esecuzione.longitudine)

                        : null

            };


            await createEsecuzione(
                payload
            );


            setSuccess(

                "✅ Prova creata correttamente"

            );


            setTimeout(() => {

                navigate(

                    ispezioneId

                        ? `/ispezione/${ispezioneId}`

                        : `/piano/${
                            esecuzione
                                .pianoIndagine
                                .pianoId
                        }`

                );

            }, 1000);


        } catch (error) {

            console.error(error);


            setServerError(

                "❌ Errore durante il salvataggio della prova"

            );

        } finally {

            setLoading(false);

        }

    }


    // =========================
    // VISIBILITÀ
    // =========================

    const isPrevista =
        esecuzione.stato === "PREVISTA";


    const isAggiuntaInSito =
        esecuzione.stato === "AGGIUNTA_IN_SITO";


    const isEseguita =
        esecuzione.stato === "ESEGUITA";


    const isNonEseguibile =
        esecuzione.stato === "NON_ESEGUIBILE";


    const isSpostata =
        esecuzione.stato === "SPOSTATA";


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
    // RENDER
    // =========================

    return (

        <MainLayout>


            <div style={styles.container}>


                <Link

                    to={
                        ispezioneId

                            ? `/ispezione/${ispezioneId}`

                            : `/piano/${pianoId}`
                    }

                    style={styles.backButton}

                >

                    {
                        ispezioneId

                            ? "← Torna all'ispezione"

                            : "← Torna al piano"
                    }

                </Link>


                <form
                    onSubmit={handleSubmit}
                    style={styles.card}
                >


                    {/* HEADER */}


                    <div>

                        <h1 style={styles.title}>

                            Nuova prova

                        </h1>


                        <p style={styles.subtitle}>

                            Piano: {

                            loadingData

                                ? "Caricamento..."

                                : pianoNome

                        }

                        </p>

                    </div>


                    <SectionTitle>

                        Dati della prova

                    </SectionTitle>


                    {/* PROVA */}


                    <div style={styles.grid}>


                        <SelectField

                            label="Tipologia prova *"

                            value={
                                esecuzione
                                    .prova
                                    .provaId
                            }

                            onChange={
                                handleProvaChange
                            }

                            error={
                                errors.prova
                            }

                        >

                            <option value="">

                                Seleziona tipologia

                            </option>


                            {
                                prove.map(prova => (

                                    <option

                                        key={
                                            prova.provaId
                                        }

                                        value={
                                            prova.provaId
                                        }

                                    >

                                        {prova.nomeProva}

                                    </option>

                                ))
                            }

                        </SelectField>


                        <SelectField

                            label="Stato *"

                            value={
                                esecuzione.stato
                            }

                            onChange={
                                handleStatoChange
                            }

                            disabled={
                                Boolean(ispezioneId)
                            }

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


                            {
                                ispezioneId &&

                                <option value="AGGIUNTA_IN_SITO">

                                    Aggiunta in sito

                                </option>
                            }

                        </SelectField>


                    </div>


                    {/* CODICE PROVA */}


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

                                min="1"

                                value={
                                    esecuzione.numero
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="Numero"

                                style={styles.numeroInput}

                            />


                        </div>


                        <FieldError
                            message={errors.numero}
                        />

                    </div>


                    {/* ELEMENTO ORIGINE */}


                    <SelectField

                        label={
                            isSpostata

                                ? "Elemento di origine *"

                                : "Elemento *"
                        }

                        value={
                            esecuzione
                                .elemento
                                .elementoId
                        }

                        onChange={
                            handleElementoChange
                        }

                        error={
                            errors.elemento
                        }

                    >

                        <option value="">

                            Seleziona elemento

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

                    </SelectField>


                    <InputField

                        label="Punto previsto *"

                        name="puntoPrevisto"

                        value={
                            esecuzione.puntoPrevisto
                        }

                        onChange={
                            handleChange
                        }

                        error={
                            errors.puntoPrevisto
                        }

                    />


                    {/* SPOSTAMENTO */}


                    {
                        isSpostata && (

                            <>

                                <SectionTitle>

                                    Spostamento della prova

                                </SectionTitle>


                                <SelectField

                                    label="Spostata su elemento *"

                                    value={
                                        esecuzione
                                            .spostatoElemento
                                            ?.elementoId
                                        ||
                                        ""
                                    }

                                    onChange={
                                        handleSpostatoElementoChange
                                    }

                                    error={
                                        errors.spostatoElemento
                                    }

                                >

                                    <option value="">

                                        Seleziona elemento di destinazione

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

                                </SelectField>

                            </>

                        )
                    }


                    {/* ISPEZIONE */}


                    {
                        mostraIspezione && (

                            <>

                                <SectionTitle>

                                    Ispezione

                                </SectionTitle>


                                <SelectField

                                    label={

                                        ispezioneObbligatoria

                                            ? "Ispezione *"

                                            : "Ispezione"

                                    }

                                    value={
                                        esecuzione
                                            .ispezione
                                            ?.ispezioneId
                                        ||
                                        ""
                                    }

                                    onChange={
                                        handleIspezioneChange
                                    }

                                    disabled={
                                        Boolean(ispezioneId)
                                    }

                                    error={
                                        errors.ispezione
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

                                </SelectField>

                            </>

                        )
                    }


                    {/* TIMESTAMP */}


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
                                        esecuzione.timestamp
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


                    {/* FOTO PIANO */}


                    <SectionTitle>

                        Foto della prova

                    </SectionTitle>


                    <p style={styles.helperText}>

                        Immagini previste dal piano di indagine.

                    </p>


                    <div style={styles.grid}>


                        <InputField

                            label="Foto piano"

                            name="fotoPiano1"

                            value={
                                esecuzione.fotoPiano1
                            }

                            onChange={
                                handleChange
                            }

                        />


                        <InputField

                            label="Foto sezione"

                            name="fotoPiano2"

                            value={
                                esecuzione.fotoPiano2
                            }

                            onChange={
                                handleChange
                            }

                        />


                        <InputField

                            label="Foto realistica"

                            name="fotoPiano3"

                            value={
                                esecuzione.fotoPiano3
                            }

                            onChange={
                                handleChange
                            }

                        />


                    </div>


                    {/* FOTO CANTIERE */}


                    {
                        mostraFotoCantiere && (

                            <>

                                <SectionTitle>

                                    Foto di cantiere

                                </SectionTitle>


                                <div style={styles.grid}>


                                    <InputField

                                        label="Foto cantiere 1"

                                        name="fotoCantiere1"

                                        value={
                                            esecuzione.fotoCantiere1
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    />


                                    <InputField

                                        label="Foto cantiere 2"

                                        name="fotoCantiere2"

                                        value={
                                            esecuzione.fotoCantiere2
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    />


                                </div>

                            </>

                        )
                    }


                    {/* GPS */}


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
                                            esecuzione.latitudine
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
                                            esecuzione.longitudine
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    />


                                </div>

                            </>

                        )
                    }


                    {/* NOTE */}


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

                            name="note"

                            value={
                                esecuzione.note
                            }

                            onChange={
                                handleChange
                            }

                            style={styles.textarea}

                        />


                        <FieldError
                            message={errors.note}
                        />


                    </div>


                    {/* SUBMIT */}


                    <button

                        type="submit"

                        disabled={
                            loading
                            ||
                            loadingData
                        }

                        style={styles.button}

                    >

                        {
                            loading

                                ? "Salvataggio..."

                                : "Crea prova"
                        }

                    </button>


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

                type={type}

                name={name}

                value={value}

                onChange={onChange}

                step={
                    type === "number"
                        ? "any"
                        : undefined
                }

                style={styles.input}

            />


            <FieldError
                message={error}
            />


        </div>

    );

}


// =========================
// SELECT FIELD
// =========================

function SelectField({

                         label,

                         value,

                         onChange,

                         error,

                         disabled = false,

                         children

                     }) {

    return (

        <div style={styles.group}>


            <label style={styles.label}>

                {label}

            </label>


            <select

                value={value}

                onChange={onChange}

                disabled={disabled}

                style={styles.input}

            >

                {children}

            </select>


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

        <p style={styles.error}>

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


    backButton: {

        display: "inline-block",

        width: "fit-content",

        marginBottom: "20px",

        backgroundColor: "#ffffff",

        color: "#1e293b",

        padding: "10px 14px",

        borderRadius: "10px",

        textDecoration: "none",

        border: "1px solid #e2e8f0",

        fontWeight: "600"

    },


    card: {

        background: "#ffffff",

        border: "1px solid #e2e8f0",

        borderRadius: "18px",

        padding: "24px",

        display: "flex",

        flexDirection: "column",

        gap: "20px"

    },


    title: {

        margin: 0,

        color: "#1e293b"

    },


    subtitle: {

        marginTop: "6px",

        marginBottom: 0,

        color: "#64748b"

    },


    sectionHeader: {

        borderBottom: "1px solid #e2e8f0",

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


    group: {

        display: "flex",

        flexDirection: "column",

        gap: "8px"

    },


    label: {

        fontSize: "13px",

        fontWeight: "700",

        color: "#475569"

    },


    input: {

        height: "48px",

        borderRadius: "10px",

        border: "1px solid #cbd5e1",

        padding: "0 14px",

        outline: "none",

        background: "#ffffff",

        boxSizing: "border-box",

        width: "100%"

    },


    textarea: {

        minHeight: "130px",

        borderRadius: "12px",

        border: "1px solid #cbd5e1",

        padding: "14px",

        resize: "vertical",

        boxSizing: "border-box",

        width: "100%"

    },


    codeRow: {

        display: "flex",

        gap: "12px"

    },


    siglaInput: {

        width: "110px",

        height: "48px",

        borderRadius: "10px",

        border: "1px solid #cbd5e1",

        padding: "0 12px",

        background: "#f8fafc",

        fontWeight: "700",

        textAlign: "center",

        boxSizing: "border-box"

    },


    numeroInput: {

        flex: 1,

        height: "48px",

        borderRadius: "10px",

        border: "1px solid #cbd5e1",

        padding: "0 14px",

        outline: "none",

        boxSizing: "border-box"

    },


    error: {

        color: "#dc2626",

        fontSize: "13px",

        margin: 0

    },


    success: {

        background: "#dcfce7",

        color: "#166534",

        padding: "12px",

        borderRadius: "10px",

        fontWeight: "600"

    },


    serverError: {

        background: "#fee2e2",

        color: "#991b1b",

        padding: "12px",

        borderRadius: "10px",

        fontWeight: "600"

    },


    button: {

        height: "50px",

        background: "#1e293b",

        color: "#ffffff",

        border: "none",

        borderRadius: "10px",

        cursor: "pointer",

        fontWeight: "700"

    }

};


export default CreateEsecuzionePage;