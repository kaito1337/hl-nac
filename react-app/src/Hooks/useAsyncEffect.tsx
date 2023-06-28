import {useEffect} from "react";

export const useAsyncEffect = async (callback: () => Promise<any>, deps: any[]) => {
    useEffect(() => {
        (async () => {
            await callback()
        })()
    }, deps)
}
