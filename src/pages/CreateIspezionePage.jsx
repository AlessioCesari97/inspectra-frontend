import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams,
    Link
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
    createIspezione,
    getAssets,
    getAssetById,
    getPianoById
} from "../api/api";


function CreateIspezionePage() {


    const navigate = useNavigate();

    const {
        assetId,
        pianoId
    } = useParams();


    const [assets, setAssets] =
        useState([]);


    const [assetNome, setAssetNome] =
        useState("");


    const [piani, setPiani] =
        useState([]);


    const [errors, setErrors] =
        useState({});


    const [error, setError] =
        useState("");


    const [success, setSuccess] =
        useState("");


    const [ispezione, setIspezione] =
        useState({

            titoloIspezione: "",

            dataIspezione: "",

            operatoreProve: "",

            ingegnere: "",

            referenteConcessionaria: "",

            annotazioniAggiuntive: "",

            stato: "BOZZA",

            createdBy: "",

            asset: {

                assetId:
                    assetId || ""

            },

            pianoIndagine: {

                pianoId:
                    pianoId || ""

            }

        });


    useEffect(() => {

        loadData();

    }, []);


    async function loadData() {

        try {

            // =========================
            // CREAZIONE DA PIANO
            // =========================

            if (pianoId) {

                const piano =
                    await getPianoById(
                        pianoId
                    );

                setAssetNome(
                    piano.assetNome
                );

                setIspezione(prev => ({

                    ...prev,

                    asset: {

                        assetId: piano.assetId

                    },

                    pianoIndagine: {

                        pianoId: piano.pianoId

                    }

                }));


                const asset =
                    await getAssetById(
                        piano.assetId
                    );

                setPiani(
                    asset.piani || []
                );

                return;

            }


            // =========================
            // CREAZIONE DA ASSET
            // =========================

            if (assetId) {

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

                return;

            }


            // =========================
            // CREAZIONE DAL MENU
            // =========================

            const data =
                await getAssets();

            setAssets(
                data
            );

        }

        catch (error) {

            console.error(error);

            setError(
                "Errore durante il caricamento dei dati"
            );

        }

    }


    async function handleAssetChange(event) {

        const id =
            event.target.value;


        setIspezione({

            ...ispezione,

            asset: {

                assetId: id

            },

            pianoIndagine: {

                pianoId: ""

            }

        });


        setPiani([]);


        if (id) {

            try {

                const asset =
                    await getAssetById(id);


                setPiani(
                    asset.piani || []
                );

            } catch (error) {

                console.error(error);

                setError(
                    "Errore durante il caricamento dei piani di indagine"
                );

            }

        }

    }


    function handlePianoChange(event) {

        setIspezione({

            ...ispezione,

            pianoIndagine: {

                pianoId:
                event.target.value

            }

        });


        setError("");

        setSuccess("");

    }


    function handleChange(event) {

        const {
            name,
            value
        } = event.target;


        setIspezione({

            ...ispezione,

            [name]: value

        });


        setErrors({

            ...errors,

            [name]: ""

        });


        setError("");

        setSuccess("");

    }


    function validateForm() {

        const newErrors = {};


        if (
            !ispezione
                .titoloIspezione
                .trim()
        ) {

            newErrors.titoloIspezione =

                "Il titolo dell'ispezione è obbligatorio";

        }


        if (!ispezione.dataIspezione) {

            newErrors.dataIspezione =

                "La data dell'ispezione è obbligatoria";

        }


        if (
            !ispezione
                .createdBy
                .trim()
        ) {

            newErrors.createdBy =

                "Il creatore dell'ispezione è obbligatorio";

        }


        setErrors(
            newErrors
        );


        return (
            Object.keys(newErrors).length === 0
        );

    }


    async function handleSubmit(event) {

        event.preventDefault();


        setError("");

        setSuccess("");


        if (!validateForm()) {

            setError(
                "Controlla i campi obbligatori"
            );

            return;

        }


        try {

            await createIspezione(
                ispezione
            );


            setSuccess(
                "Ispezione creata correttamente"
            );


            setTimeout(() => {

                navigate(
                    "/ispezioni"
                );

            }, 1000);

        } catch (error) {

            console.error(error);


            setError(

                error.message

                ||

                "Errore durante la creazione dell'ispezione"

            );

        }

    }


    return (

        <MainLayout>


            <div style={styles.container}>


                <Link

                    to="/ispezioni"

                    style={styles.backButton}

                >

                    ← Torna alle ispezioni

                </Link>


                <div style={styles.headerCard}>


                    <h1 style={styles.title}>

                        Nuova Ispezione

                    </h1>


                    <p style={styles.subtitle}>

                        Crea una nuova ispezione.
                        Lo stato iniziale sarà BOZZA.

                    </p>


                </div>


                <form

                    onSubmit={handleSubmit}

                    style={styles.formCard}

                >


                    {

                        success &&

                        <div style={styles.successBox}>

                            {success}

                        </div>

                    }


                    {

                        error &&

                        <div style={styles.errorBox}>

                            {error}

                        </div>

                    }


                    <h3 style={styles.sectionTitle}>

                        Informazioni principali

                    </h3>


                    <div style={styles.grid}>


                        {

                            !assetId && !pianoId

                                ?

                                <SelectField

                                    label="Opera"

                                    value={
                                        ispezione
                                            .asset
                                            .assetId
                                    }

                                    onChange={
                                        handleAssetChange
                                    }

                                >

                                    <option value="">

                                        Seleziona Opera

                                    </option>


                                    {

                                        assets.map((asset) => (

                                            <option

                                                key={
                                                    asset.assetId
                                                }

                                                value={
                                                    asset.assetId
                                                }

                                            >

                                                {asset.nome}

                                            </option>

                                        ))

                                    }

                                </SelectField>

                                :

                                <InputField

                                    label="Opera"

                                    value={assetNome}

                                    disabled

                                />

                        }


                        {
                            pianoId

                                ?

                                <InputField

                                    label="Piano di indagine"

                                    value={
                                        piani.find(

                                            p =>

                                                p.pianoId ===
                                                Number(ispezione.pianoIndagine.pianoId)

                                        )?.codicePiano || ""

                                    }

                                    disabled

                                />

                                :

                                <SelectField

                                    label="Piano di indagine"

                                    value={
                                        ispezione.pianoIndagine.pianoId
                                    }

                                    onChange={
                                        handlePianoChange
                                    }

                                >

                                    <option value="">

                                        Nessun piano di indagine

                                    </option>

                                    {

                                        piani.map((piano) => (

                                            <option

                                                key={piano.pianoId}

                                                value={piano.pianoId}

                                            >

                                                {piano.codicePiano}

                                            </option>

                                        ))

                                    }

                                </SelectField>

                        }


                        <InputField

                            label="Titolo ispezione *"

                            name="titoloIspezione"

                            value={
                                ispezione
                                    .titoloIspezione
                            }

                            onChange={
                                handleChange
                            }

                            error={
                                errors.titoloIspezione
                            }

                        />


                        <InputField

                            label="Data ispezione *"

                            name="dataIspezione"

                            type="date"

                            value={
                                ispezione
                                    .dataIspezione
                            }

                            onChange={
                                handleChange
                            }

                            error={
                                errors.dataIspezione
                            }

                        />


                        <InputField

                            label="Creato da *"

                            name="createdBy"

                            value={
                                ispezione.createdBy
                            }

                            onChange={
                                handleChange
                            }

                            error={
                                errors.createdBy
                            }

                        />


                    </div>


                    <h3 style={styles.sectionTitle}>

                        Personale

                    </h3>


                    <div style={styles.grid}>


                        <InputField

                            label="Operatore prove"

                            name="operatoreProve"

                            value={
                                ispezione
                                    .operatoreProve
                            }

                            onChange={
                                handleChange
                            }

                        />


                        <InputField

                            label="Ingegnere"

                            name="ingegnere"

                            value={
                                ispezione
                                    .ingegnere
                            }

                            onChange={
                                handleChange
                            }

                        />


                        <InputField

                            label="Referente concessionaria"

                            name="referenteConcessionaria"

                            value={
                                ispezione
                                    .referenteConcessionaria
                            }

                            onChange={
                                handleChange
                            }

                        />


                    </div>


                    <div style={styles.group}>


                        <label style={styles.label}>

                            Annotazioni aggiuntive

                        </label>


                        <textarea

                            name="annotazioniAggiuntive"

                            value={
                                ispezione
                                    .annotazioniAggiuntive
                            }

                            onChange={
                                handleChange
                            }

                            style={styles.textarea}

                        />


                    </div>


                    <button

                        type="submit"

                        style={styles.button}

                    >

                        Crea Ispezione

                    </button>


                </form>


            </div>


        </MainLayout>

    );

}


function InputField({

                        label,

                        name,

                        value,

                        onChange,

                        type = "text",

                        error,

                        disabled = false

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

                disabled={disabled}

                style={{

                    ...styles.input,

                    ...(error
                        ? styles.inputError
                        : {}),

                    ...(disabled
                        ? styles.disabledInput
                        : {})

                }}

            />


            {

                error &&

                <span style={styles.fieldError}>

                    {error}

                </span>

            }


        </div>

    );

}


function SelectField({

                         label,

                         value,

                         onChange,

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

                style={styles.input}

            >

                {children}

            </select>


        </div>

    );

}


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

        width: "fit-content",

        backgroundColor: "#ffffff",

        color: "#1e293b",

        padding: "10px 14px",

        borderRadius: "10px",

        border: "1px solid #e2e8f0",

        textDecoration: "none",

        fontWeight: "700"

    },


    headerCard: {

        backgroundColor: "#ffffff",

        padding: "22px",

        borderRadius: "18px",

        border: "1px solid #e2e8f0",

        display: "flex",

        flexDirection: "column",

        gap: "6px"

    },


    title: {

        margin: 0,

        color: "#1e293b",

        fontSize: "30px",

        fontWeight: "700"

    },


    subtitle: {

        margin: 0,

        color: "#64748b",

        fontSize: "14px"

    },


    formCard: {

        backgroundColor: "#ffffff",

        padding: "22px",

        borderRadius: "18px",

        border: "1px solid #e2e8f0",

        display: "flex",

        flexDirection: "column",

        gap: "20px",

        boxShadow:
            "0 4px 12px rgba(15,23,42,0.05)"

    },


    sectionTitle: {

        margin: "10px 0 0",

        color: "#1e293b"

    },


    grid: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",

        gap: "16px"

    },


    group: {

        display: "flex",

        flexDirection: "column",

        gap: "8px"

    },


    label: {

        fontWeight: "700",

        color: "#475569",

        fontSize: "14px"

    },


    input: {

        height: "46px",

        padding: "0 12px",

        borderRadius: "10px",

        border: "1px solid #cbd5e1",

        outline: "none",

        fontSize: "14px",

        color: "#1e293b",

        backgroundColor: "#ffffff",

        boxSizing: "border-box"

    },


    inputError: {

        border: "1px solid #dc2626"

    },


    disabledInput: {

        backgroundColor: "#f8fafc",

        color: "#64748b",

        cursor: "not-allowed"

    },


    textarea: {

        minHeight: "120px",

        padding: "12px",

        borderRadius: "10px",

        border: "1px solid #cbd5e1",

        resize: "vertical",

        outline: "none",

        fontSize: "14px",

        boxSizing: "border-box"

    },


    fieldError: {

        color: "#dc2626",

        fontSize: "13px",

        fontWeight: "600"

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


    errorBox: {

        backgroundColor: "#fee2e2",

        color: "#991b1b",

        padding: "12px 14px",

        borderRadius: "10px",

        fontWeight: "600",

        border: "1px solid #fecaca"

    },


    successBox: {

        backgroundColor: "#dcfce7",

        color: "#166534",

        padding: "12px 14px",

        borderRadius: "10px",

        fontWeight: "600",

        border: "1px solid #bbf7d0"

    }

};


export default CreateIspezionePage;