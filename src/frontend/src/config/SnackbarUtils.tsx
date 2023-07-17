import { ProviderContext, VariantType, useSnackbar } from 'notistack'
import * as React from 'react'


interface IProps {
    setUseSnackbarRef: (showSnackbar: ProviderContext) => void
}

const InnerSnackbarUtilsConfigurator: React.FC<IProps> = (props: IProps) => {
    props.setUseSnackbarRef(useSnackbar())
    return null
}

let useSnackbarRef: ProviderContext
const setUseSnackbarRef = (useSnackbarRefProp: ProviderContext) => {
    useSnackbarRef = useSnackbarRefProp
}

export const SnackbarUtilsConfigurator = () => {
    return (
        <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
    )
}

export default {
    success(msg: string) {
        this.toast(msg, 'success')
    },
    warning(msg: string) {
        this.toast(msg, 'warning')
    },
    info(msg: string) {
        this.toast(msg, 'info')
    },
    error(msg: string) {
        this.toast(msg, 'error')
    },
    toast(msg: string, variant: VariantType = 'default') {
        useSnackbarRef.enqueueSnackbar(msg, { variant })
    }
}
