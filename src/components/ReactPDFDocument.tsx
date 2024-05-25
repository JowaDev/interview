import React, {FC} from 'react';
import {Document, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {interviewStep} from "@/components/GlobalContext";

const styles = StyleSheet.create({
    page: {
        padding: 40
    },
    section: {
        marginBottom: 10
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        margin: 20
    },
    question: {
        fontSize: 12,
        marginBottom: 10
    },
    answer: {
        fontSize: 12,
        marginBottom: 20
    },
    logo: {
        width: 110,
        height: 45,
        marginBottom: 20,
        alignSelf: 'flex-end'
    }
});

interface ReactPDFDocumentProps {
    jobSelection: string;
    interviewSelectionTypeState: string;
    steps: interviewStep[];
}

export const ReactPDFDocument: FC<ReactPDFDocumentProps> = ({jobSelection, interviewSelectionTypeState, steps}) => (
    <Document>
        <Page style={styles.page}>
            <Image
                style={styles.logo}
                src='public/logo/HES.png'
            />
            <Text style={styles.header}>Questions d&apos;interview</Text>
            <Text>Sélection d&apos;emploi: {jobSelection}</Text>
            <Text>Type d&apos;interview: {interviewSelectionTypeState}</Text>
            <View style={styles.section}>
                {steps.map((step, index) => (
                    <View key={index}>
                        <Text style={styles.question}>Question {index + 1}: {step.question}</Text>
                        <Text style={styles.answer}>Réponse {index + 1}: {step.answer as string}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);
