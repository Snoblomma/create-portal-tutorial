import { useState, createContext, ReactNode, useCallback } from "react";

export type TutorialStep = {
    id: number,
    elementId: string,
    tip: string,
}


const tutorialSteps: TutorialStep[] =
    [{
        id: 1,
        elementId: 'home',
        tip: 'Welcome to the new dashboard!'
    },
    {
        id: 2,
        elementId: 'reports',
        tip: 'You can view your reports here'
    },
    {
        id: 3,
        elementId: 'notifications',
        tip: 'You will receive notification once order is completed'
    },
    {
        id: 4,
        elementId: 'recentOrders',
        tip: 'Your orders will be listed here'
    }]


export const TutorialContext = createContext(
    {
        currentStep: tutorialSteps[0],
        tutorialOpen: false,
        onTutorialContinue: () => { },
        toggleTutorial: () => { }
    }
);

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
    const [tutorialOpen, setTutorialOpen] = useState<boolean>(false)
    const [currentStep, setCurrentStep] = useState<TutorialStep>(tutorialSteps[0])

    const onTutorialContinue = useCallback(
        () => {
            const currentStepIndex = tutorialSteps.indexOf(currentStep)
            const isLastStep = currentStepIndex === tutorialSteps.length - 1
            setTutorialOpen(!isLastStep)
            setCurrentStep(isLastStep ? tutorialSteps[0] : tutorialSteps[currentStepIndex + 1])
        },
        [currentStep],
    )

    const toggleTutorial = (): void => {
        setTutorialOpen(!tutorialOpen)
    }

    return (
        <TutorialContext.Provider value={{ currentStep, tutorialOpen, onTutorialContinue, toggleTutorial }}>
            {children}
        </TutorialContext.Provider>
    );
};