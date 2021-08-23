/* eslint-disable no-await-in-loop */
import React, { useState } from 'react';
import { Card, CardHeader, CardActions, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PdfParse from 'pdf-parse';
import fs from 'fs';
import ReactDiffViewer from 'react-diff-viewer';
import NotifierDialog from 'components/std/notifierDialog';
import Breadcrumb from 'components/std/breadcrumb';

const useStyles = makeStyles({
    root: {
        contentVisibility: 'auto',
        margin: '30px auto',
        width: '100%',
        borderBottom: '10px solid red',
        '& .MuiCardHeader-root': {
            textAlign: 'center',
            // color: '#fff',
        },
        '& .MuiCardHeader-avatar': {
            padding: 6,
            backgroundColor: '#fff',
            borderRadius: 10,
        },
        '& .MuiCardContent-root': {
            // height: '200px',
        },
        '& .MuiCardActions-root': {
            justifyContent: 'center',
        },
        '& .MuiCardHeader-content span': {
            textTransform: 'uppercase',
            fontWeight: 'bold',
        },
    },
    cardContent: {
        backgroundColor: '#fff',
        margin: 10,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, auto))',
        gap: 20,
        justifyContent: 'center',
        '& form div': {
            width: '100%',
        },
        '& table': {
            tableLayout: 'initial',
        },
    },
    selectBrand: {
        height: 80,
        width: 300,
        margin: '0 auto',
    },
    iframeContainer: {
        position: 'relative',
        overflowY: 'scroll',
        width: '100%',
        height: 700,
    },
    responsiveIframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
    },
    modelHolder: {
        marginBottom: 30,
        borderBottom: '10px solid red',
        '& .MuiCardHeader-content span': {
            textTransform: 'uppercase',
            fontWeight: 'bold',
            textAlign: 'center',
        },
    },
    modelDiff: {
        '& .MuiCardActions-root': {
            justifyContent: 'center',
        },
    },
    pdfViewer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20,
    },
});

const Compare = (props) => {
    const { result, brandName, baseDate, currentDate } = props;
    const classes = useStyles();
    const [visibleModelPdf, setVisibleModelPdf] = useState(null);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });
    const handleSetVisibleModelPdf = (event) => {
        if (event.target.id) {
            setVisibleModelPdf(event.target.id);
        } else {
            setVisibleModelPdf(null);
        }
    };

    const handleNotificationDismiss = () => {
        setNotification({
            status: '',
            title: '',
            message: '',
            errors: {},
        });
    };
    if (result === 'error') {
        return <p>{result}</p>;
    }

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        href: '/data',
                        text: 'data',
                    },
                    {
                        href: null,
                        text: 'compare',
                    },
                ]}
            />
            <div>
                <Card className={classes.root}>
                    <CardHeader title="wandaloo" />
                    <CardContent className={classes.cardContent}>
                        <ReactDiffViewer
                            oldValue={result.wandaloo.baseFile}
                            newValue={result.wandaloo.currFile}
                            splitView
                            disableWordDiff
                        />
                    </CardContent>
                </Card>
                {result.models.map((model) => (
                    <Card key={model.model} className={classes.modelHolder}>
                        <CardHeader title={model.model} />
                        <CardContent className={classes.modelDiff}>
                            <Card>
                                <CardHeader title="JS" />
                                <CardContent className={classes.cardContent}>
                                    {model.textBaseJs || model.textCurrJs ? (
                                        <ReactDiffViewer
                                            oldValue={
                                                model?.textBaseJs?.text || 'no value'
                                            }
                                            newValue={
                                                model?.textCurrJs?.text || 'no value'
                                            }
                                            splitView
                                        />
                                    ) : (
                                        <p>no pdf available</p>
                                    )}
                                </CardContent>
                            </Card>
                        </CardContent>
                        <CardActions>
                            {model.basePath || model.currPath ? (
                                <>
                                    <button
                                        type="button"
                                        id={model.model}
                                        data-model={model.model}
                                        onClick={handleSetVisibleModelPdf}
                                    >
                                        View
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSetVisibleModelPdf}
                                    >
                                        Hide
                                    </button>
                                </>
                            ) : (
                                <p>no pdf file available</p>
                            )}
                        </CardActions>
                        {visibleModelPdf === model.model && (
                            <>
                                <div className={classes.pdfViewer}>
                                    <Card>
                                        <CardHeader title="base" />
                                        <CardContent>
                                            <div className={classes.iframeContainer}>
                                                {model.basePath ? (
                                                    <object
                                                        className={
                                                            classes.responsiveIframe
                                                        }
                                                        data={`${
                                                            process.env
                                                                .NEXT_PUBLIC_API_HOST
                                                        }/specs/${brandName}/${baseDate.substring(
                                                            0,
                                                            4,
                                                        )}/${baseDate.slice(-2)}/${
                                                            model.model
                                                        }.pdf`}
                                                        type="application/pdf"
                                                    />
                                                ) : (
                                                    <p>no pdf available</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader title="current" />
                                        <CardContent>
                                            <div className={classes.iframeContainer}>
                                                <object
                                                    className={classes.responsiveIframe}
                                                    data={`${
                                                        process.env.NEXT_PUBLIC_API_HOST
                                                    }/specs/${brandName}/${currentDate.substring(
                                                        0,
                                                        4,
                                                    )}/${currentDate.slice(-2)}/${
                                                        model.model
                                                    }.pdf`}
                                                    type="application/pdf"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </>
                        )}
                    </Card>
                ))}
            </div>
            <NotifierDialog
                notification={notification}
                handleNotificationDismiss={handleNotificationDismiss}
            />
        </>
    );
};

export default Compare;

const queryAxios = (baseDate, currentDate, brandName) => {
    return axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_HOST}/data/compare`,
        data: {
            baseDir: baseDate,
            currDir: currentDate,
            brand: brandName,
        },
    }).then((response) => {
        return response;
    });
};

async function getPdf(path) {
    const file = fs.readFileSync(path);
    const val = await PdfParse(file)
        .then((resp) => {
            return resp;
        })
        .catch((error) => {
            console.log('error', error);
        });
    return val;
}

export async function getServerSideProps({ query }) {
    const { brandName, baseDate, currentDate } = query;
    const data = await queryAxios(baseDate, currentDate, brandName);
    let result = 'error';
    if (data.status !== 200 || data.data.result !== 'ok') {
        result = 'error';
    } else {
        result = data.data.response;
    }
    if (result !== 'error') {
        for (let index = 0; index < result.models.length; index++) {
            if (
                result.models[index]?.basePath?.includes('pdf') ||
                result.models[index]?.currPath?.includes('pdf')
            ) {
                let base = null;
                if (result.models[index].basePath) {
                    base = await getPdf(result.models[index].basePath);
                    delete base.metadata;
                }
                let curr = null;
                if (result.models[index].currPath) {
                    curr = await getPdf(result.models[index].currPath);
                    delete curr.metadata;
                }
                result.models[index].textBaseJs = base;
                result.models[index].textCurrJs = curr;
            }
        }
    }
    return {
        props: {
            result,
            brandName,
            baseDate,
            currentDate,
        },
    };
}
