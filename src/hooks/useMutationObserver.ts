import { useEffect, useState } from "react";

const DEFAULT_OPTIONS = { config: { attributes: true, childList: true, subtree: true } }

function useMutationObservable(
    target: Element,
    callback: MutationCallback,
    options = DEFAULT_OPTIONS
) {
    const [observer, setObserver] = useState<MutationObserver | null>(null);

    useEffect(() => {
        const obs = new MutationObserver(callback);
        setObserver(obs)
    }, [callback, options, setObserver])

    useEffect(() => {
        if (!observer) return
        const { config } = options;
        observer.observe(target, config);
        return () => {
            if (observer) {
                observer.disconnect()
            }
        }
    }, [observer, options, target])

}

export default useMutationObservable;