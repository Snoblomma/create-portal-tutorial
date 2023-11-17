import React, { useCallback, useContext, useState } from 'react'
import { TutorialContext } from '../providers/TutorialProvider';
import { Backdrop, Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { createPortal } from 'react-dom';
import useMutationObserver from '../hooks/useMutationObserver';

const TutorialPopover = () => {
    const { tutorialOpen, currentStep, onTutorialContinue } = useContext(TutorialContext);
    const [DOMReady, setDOMReady] = useState(false)

    const onListMutation = useCallback(
        () => {
            setDOMReady(!!document.getElementById(currentStep.elementId))
        },
        [currentStep.elementId],
    )

    useMutationObserver(document.body, onListMutation)

    if (!tutorialOpen || !DOMReady) return null

    return (
        <Backdrop open>
            {
                document.getElementById(currentStep.elementId) &&
                createPortal(
                    <Tooltip open title={
                        <Stack>
                            <Typography variant='body2'>
                                Tip #{currentStep.id}
                            </Typography>
                            <Typography>
                                {currentStep.tip}
                            </Typography>
                            <Button variant='contained' onClick={onTutorialContinue}>
                                Got it
                            </Button>
                        </Stack>
                    }>
                        <Box></Box>
                    </Tooltip>,
                    document.getElementById(currentStep.elementId) as Element
                )
            }
        </Backdrop>
    )
}

export default TutorialPopover