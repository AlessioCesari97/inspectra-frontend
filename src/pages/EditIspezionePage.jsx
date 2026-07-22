import { useEffect, useState } from "react";

import {
    useParams,
    useNavigate,
    Link
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
    getIspezioneById,
    updateIspezione
} from "../api/api";


function EditIspezionePage() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [formData, setFormData] =
        useState(null);


    const [errors, setErrors] =
        useState({});


    const [error, setError] =
        useState("");


    const [success, setSuccess] =
        useState("");


    const [loading, setLoading] =
        useState(false);

    const [statoOriginale, setStatoOriginale] =
        useState("");

    useEffect(() => {

        loadData();

    }, [id]);


    async function loadData() {

        try {

            setError("");


            const ispezione =
                await getIspezioneById(id);

            setStatoOriginale(
                ispezione.stato
            );


            setFormData({

                titoloIspezione:
                    ispezione.titoloIspezione || "",

                stato:
                    ispezione.stato || "BOZZA",

                dataIspezione:
                    ispezione.dataIspezione || "",


                operatoreProve:
                    ispezione.operatoreProve || "",

                ingegnere:
                    ispezione.ingegnere || "",

                referenteConcessionaria:
                    ispezione.referenteConcessionaria || "",


                installazioneCantiere:
                    formatDateTimeLocal(
                        ispezione.installazioneCantiere
                    ),

                inizioLavori:
                    formatDateTimeLocal(
                        ispezione.inizioLavori
                    ),

                fineLavori:
                    formatDateTimeLocal(
                        ispezione.fineLavori
                    ),


                firmaOperatore:
                    ispezione.firmaOperatore || "",

                firmaIngegnere:
                    ispezione.firmaIngegnere || "",

                firmaConcessionaria:
                    ispezione.firmaConcessionaria || "",


                createdBy:
                    ispezione.createdBy || "",

                annotazioniAggiuntive:
                    ispezione.annotazioniAggiuntive || "",

                report:
                    ispezione.report || ""

            });

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Errore durante il caricamento dell'ispezione"
            );

        }

    }


    function handleChange(event) {

        const {
            name,
            value
        } = event.target;


        setFormData(prev => ({

            ...prev,

            [name]: value

        }));


        setErrors(prev => ({

            ...prev,

            [name]: ""

        }));


        setError("");

        setSuccess("");

    }


    function handleStatoChange(event) {

        const nuovoStato =
            event.target.value;


        setFormData(prev => ({

            ...prev,

            stato: nuovoStato

        }));


        setErrors({});

        setError("");

        setSuccess("");

    }


    function validate() {

        const newErrors = {};


        if (
            !formData
                .titoloIspezione
                .trim()
        ) {

            newErrors.titoloIspezione =
                "Il titolo dell'ispezione è obbligatorio";

        }


        if (!formData.dataIspezione) {

            newErrors.dataIspezione =
                "La data dell'ispezione è obbligatoria";

        }


        if (
            !formData
                .createdBy
                .trim()
        ) {

            newErrors.createdBy =
                "Il creatore dell'ispezione è obbligatorio";

        }


        if (
            formData.stato === "IN_CORSO"

            ||

            formData.stato === "COMPLETATA"

            ||

            formData.stato === "FIRMATA"
        ) {

            if (
                !formData.installazioneCantiere
            ) {

                newErrors.installazioneCantiere =
                    "La data e l'ora di installazione del cantiere sono obbligatorie";

            }


            if (!formData.inizioLavori) {

                newErrors.inizioLavori =
                    "La data e l'ora di inizio lavori sono obbligatorie";

            }

        }


        if (
            formData.stato === "COMPLETATA"

            ||

            formData.stato === "FIRMATA"
        ) {

            if (!formData.fineLavori) {

                newErrors.fineLavori =
                    "La data e l'ora di fine lavori sono obbligatorie";

            }

        }


        if (
            formData.stato ===
            "FIRMATA"
        ) {

            if (
                !formData.firmaOperatore.trim()
            ) {

                newErrors.firmaOperatore =
                    "La firma dell'operatore è obbligatoria";

            }


            if (
                !formData.firmaIngegnere.trim()
            ) {

                newErrors.firmaIngegnere =
                    "La firma dell'ingegnere è obbligatoria";

            }


            if (
                !formData
                    .firmaConcessionaria
                    .trim()
            ) {

                newErrors.firmaConcessionaria =
                    "La firma della concessionaria è obbligatoria";

            }

        }


        return newErrors;

    }


    async function handleSubmit(event) {

        event.preventDefault();


        setError("");

        setSuccess("");


        const newErrors =
            validate();


        setErrors(
            newErrors
        );


        if (
            Object.keys(newErrors).length > 0
        ) {

            setError(
                "Controlla i campi obbligatori"
            );

            return;

        }


        try {

            setLoading(true);


            await updateIspezione(

                id,

                formData

            );


            setSuccess(
                "Ispezione modificata correttamente"
            );


            setTimeout(() => {

                navigate(
                    `/ispezione/${id}`
                );

            }, 1000);

        } catch (error) {

            console.error(error);


            setError(

                error.message

                ||

                "Errore durante la modifica dell'ispezione"

            );

        } finally {

            setLoading(false);

        }

    }


    if (!formData) {

        return (

            <MainLayout>

                <div style={styles.loading}>

                    {
                        error ||
                        "Caricamento..."
                    }

                </div>

            </MainLayout>

        );

    }


    const stato =
        formData.stato;


    const isBozza =
        stato === "BOZZA";


    const isInCorso =
        stato === "IN_CORSO";


    const isCompletata =
        stato === "COMPLETATA";


    const isFirmata =
        stato === "FIRMATA";


    const isArchiviata =
        stato === "ARCHIVIATA";


    const mostraLavori =

        isInCorso

        ||

        isCompletata

        ||

        isFirmata

        ||

        isArchiviata;


    const mostraFirme =

        isCompletata

        ||

        isFirmata

        ||

        isArchiviata;


    const mostraReport =

        isFirmata

        ||

        isArchiviata;


    /*
     * statoOriginale rappresenta
     * lo stato realmente salvato nel database.
     *
     * formData.stato rappresenta
     * lo stato che l'utente vuole raggiungere.
     */

    const bloccaDati =

        statoOriginale === "FIRMATA"

        ||

        statoOriginale === "ARCHIVIATA";


    const bloccaReport =

        statoOriginale === "ARCHIVIATA";


    function getStatiDisponibili() {

        if (isBozza) {

            return [

                {
                    value: "BOZZA",
                    label: "Bozza"
                },

                {
                    value: "IN_CORSO",
                    label: "In corso"
                }

            ];

        }


        if (isInCorso) {

            return [

                {
                    value: "IN_CORSO",
                    label: "In corso"
                },

                {
                    value: "COMPLETATA",
                    label: "Completata"
                }

            ];

        }


        if (isCompletata) {

            return [

                {
                    value: "COMPLETATA",
                    label: "Completata"
                },

                {
                    value: "FIRMATA",
                    label: "Firmata"
                }

            ];

        }


        if (isFirmata) {

            return [

                {
                    value: "FIRMATA",
                    label: "Firmata"
                },

                {
                    value: "ARCHIVIATA",
                    label: "Archiviata"
                }

            ];

        }


        return [

            {
                value: "ARCHIVIATA",
                label: "Archiviata"
            }

        ];

    }


    return (

        <MainLayout>


            <div style={styles.container}>


                <Link

                    to={`/ispezione/${id}`}

                    style={styles.backButton}

                >

                    ← Torna all'ispezione

                </Link>


                <form

                    onSubmit={handleSubmit}

                    style={styles.card}

                >


                    <div>


                        <h1 style={styles.title}>

                            Modifica Ispezione

                        </h1>


                        <p style={styles.subtitle}>

                            Aggiorna le informazioni e lo stato dell'ispezione.

                        </p>


                    </div>


                    {

                        success &&

                        <div style={styles.success}>

                            {success}

                        </div>

                    }


                    {

                        error &&

                        <div style={styles.error}>

                            {error}

                        </div>

                    }


                    {

                        isArchiviata &&

                        <div style={styles.lockedBox}>

                            L'ispezione è archiviata e non può più essere modificata.

                        </div>

                    }


                    <SectionTitle>

                        Informazioni principali

                    </SectionTitle>


                    <div style={styles.grid}>


                        <div style={styles.group}>


                            <label style={styles.label}>

                                Stato *

                            </label>


                            <select

                                name="stato"

                                value={
                                    formData.stato
                                }

                                onChange={
                                    handleStatoChange
                                }

                                style={styles.input}

                                disabled={isArchiviata}

                            >

                                {

                                    getStatiDisponibili()
                                        .map(option => (

                                            <option

                                                key={option.value}

                                                value={option.value}

                                            >

                                                {option.label}

                                            </option>

                                        ))

                                }

                            </select>


                        </div>


                        <InputField

                            label="Titolo ispezione *"

                            name="titoloIspezione"

                            value={
                                formData.titoloIspezione
                            }

                            onChange={
                                handleChange
                            }

                            error={
                                errors.titoloIspezione
                            }

                            disabled={bloccaDati}

                        />


                        <InputField

                            label="Data ispezione *"

                            name="dataIspezione"

                            type="date"

                            value={
                                formData.dataIspezione
                            }

                            onChange={
                                handleChange
                            }

                            error={
                                errors.dataIspezione
                            }

                            disabled={bloccaDati}

                        />


                        <InputField

                            label="Creato da *"

                            name="createdBy"

                            value={
                                formData.createdBy
                            }

                            onChange={
                                handleChange
                            }

                            error={
                                errors.createdBy
                            }

                            disabled={bloccaDati}

                        />


                    </div>


                    <SectionTitle>

                        Personale

                    </SectionTitle>


                    <div style={styles.grid}>


                        <InputField

                            label="Operatore prove"

                            name="operatoreProve"

                            value={
                                formData.operatoreProve
                            }

                            onChange={
                                handleChange
                            }

                            disabled={bloccaDati}

                        />


                        <InputField

                            label="Ingegnere"

                            name="ingegnere"

                            value={
                                formData.ingegnere
                            }

                            onChange={
                                handleChange
                            }

                            disabled={bloccaDati}

                        />


                        <InputField

                            label="Referente concessionaria"

                            name="referenteConcessionaria"

                            value={
                                formData.referenteConcessionaria
                            }

                            onChange={
                                handleChange
                            }

                            disabled={bloccaDati}

                        />


                    </div>


                    {

                        mostraLavori &&

                        <>


                            <SectionTitle>

                                Attività operative

                            </SectionTitle>


                            <div style={styles.grid}>


                                <InputField

                                    label="Installazione cantiere *"

                                    name="installazioneCantiere"

                                    type="datetime-local"

                                    value={
                                        formData.installazioneCantiere
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    error={
                                        errors.installazioneCantiere
                                    }

                                    disabled={bloccaDati}

                                />


                                <InputField

                                    label="Inizio lavori *"

                                    name="inizioLavori"

                                    type="datetime-local"

                                    value={
                                        formData.inizioLavori
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    error={
                                        errors.inizioLavori
                                    }

                                    disabled={bloccaDati}

                                />


                                <InputField

                                    label={

                                        isInCorso

                                            ? "Fine lavori"

                                            : "Fine lavori *"

                                    }

                                    name="fineLavori"

                                    type="datetime-local"

                                    value={
                                        formData.fineLavori
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    error={
                                        errors.fineLavori
                                    }

                                    disabled={bloccaDati}

                                />


                            </div>


                        </>

                    }


                    {

                        mostraFirme &&

                        <>


                            <SectionTitle>

                                Firme

                            </SectionTitle>


                            <div style={styles.grid}>


                                <InputField

                                    label={

                                        isCompletata

                                            ? "Firma operatore"

                                            : "Firma operatore *"

                                    }

                                    name="firmaOperatore"

                                    value={
                                        formData.firmaOperatore
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    error={
                                        errors.firmaOperatore
                                    }

                                    disabled={bloccaDati}

                                />


                                <InputField

                                    label={

                                        isCompletata

                                            ? "Firma ingegnere"

                                            : "Firma ingegnere *"

                                    }

                                    name="firmaIngegnere"

                                    value={
                                        formData.firmaIngegnere
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    error={
                                        errors.firmaIngegnere
                                    }

                                    disabled={bloccaDati}

                                />


                                <InputField

                                    label={

                                        isCompletata

                                            ? "Firma concessionaria"

                                            : "Firma concessionaria *"

                                    }

                                    name="firmaConcessionaria"

                                    value={
                                        formData.firmaConcessionaria
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    error={
                                        errors.firmaConcessionaria
                                    }

                                    disabled={bloccaDati}

                                />


                            </div>


                        </>

                    }


                    {

                        mostraReport &&

                        <>


                            <SectionTitle>

                                Report

                            </SectionTitle>


                            <div style={styles.group}>


                                <label style={styles.label}>

                                    Report

                                </label>


                                <textarea

                                    name="report"

                                    value={
                                        formData.report
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    style={styles.textarea}

                                    disabled={
                                        bloccaReport
                                    }

                                />


                            </div>


                        </>

                    }


                    <SectionTitle>

                        Annotazioni

                    </SectionTitle>


                    <div style={styles.group}>


                        <label style={styles.label}>

                            Annotazioni aggiuntive

                        </label>


                        <textarea

                            name="annotazioniAggiuntive"

                            value={
                                formData.annotazioniAggiuntive
                            }

                            onChange={
                                handleChange
                            }

                            style={styles.textarea}

                            disabled={bloccaDati}

                        />


                    </div>

                    {
                        statoOriginale !== "ARCHIVIATA" &&

                        <button

                            type="submit"

                            style={styles.button}

                            disabled={loading}

                        >

                            {

                                loading

                                    ? "Salvataggio..."

                                    : formData.stato === "ARCHIVIATA"

                                        ? "Archivia Ispezione"

                                        : formData.stato === "FIRMATA"

                                            ? "Firma Ispezione"

                                            : "Salva Modifiche"

                            }

                        </button>

                    }


                </form>


            </div>


        </MainLayout>

    );

}


function SectionTitle({
                          children
                      }) {

    return (

        <div style={styles.sectionHeader}>

            <h3 style={styles.sectionTitle}>

                {children}

            </h3>

        </div>

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


function formatDateTimeLocal(value) {

    if (!value) {

        return "";

    }

    return value.substring(0, 16);

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

        background: "#ffffff",

        color: "#1e293b",

        padding: "10px 14px",

        borderRadius: "10px",

        border: "1px solid #e2e8f0",

        textDecoration: "none",

        fontWeight: "700"

    },


    card: {

        background: "#ffffff",

        padding: "25px",

        borderRadius: "18px",

        border: "1px solid #e2e8f0",

        boxShadow:
            "0 4px 12px rgba(15,23,42,0.05)",

        display: "flex",

        flexDirection: "column",

        gap: "20px"

    },


    title: {

        margin: 0,

        fontSize: "32px",

        color: "#1e293b",

        fontWeight: "700"

    },


    subtitle: {

        marginTop: "6px",

        marginBottom: 0,

        color: "#64748b",

        fontSize: "14px"

    },


    sectionHeader: {

        borderBottom:
            "1px solid #e2e8f0",

        paddingBottom: "8px",

        marginTop: "4px"

    },


    sectionTitle: {

        margin: 0,

        color: "#1e293b",

        fontSize: "17px"

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

        boxSizing: "border-box",

        width: "100%"

    },


    inputError: {

        border: "1px solid #dc2626"

    },


    disabledInput: {

        background: "#f8fafc",

        color: "#64748b",

        cursor: "not-allowed"

    },


    textarea: {

        minHeight: "110px",

        padding: "12px",

        borderRadius: "10px",

        border: "1px solid #cbd5e1",

        resize: "vertical",

        boxSizing: "border-box",

        width: "100%"

    },


    button: {

        height: "50px",

        borderRadius: "10px",

        border: "none",

        background: "#1e293b",

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

        fontWeight: "700"

    },


    error: {

        background: "#fee2e2",

        color: "#991b1b",

        padding: "12px",

        borderRadius: "10px",

        fontWeight: "700"

    },


    lockedBox: {

        background: "#f1f5f9",

        color: "#475569",

        padding: "12px",

        borderRadius: "10px",

        fontWeight: "600"

    },


    fieldError: {

        color: "#dc2626",

        fontSize: "13px",

        fontWeight: "600"

    },


    loading: {

        padding: "30px",

        color: "#64748b"

    }

};


export default EditIspezionePage;