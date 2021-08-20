const statusSave = (message) => {
    return {
        status: true,
        message: message
    }
}

const statusToList = (data) => {
    return {
        status: true,
        info: data,
        count: data.length
    }
}

const statusErrorInternal = (error) => {
    return {
        status: false,
        error: error
    }
}

const statusErrorValidation = (message) => {
    return {
        status: false,
        message: message
    }
}


export {
    statusSave,
    statusToList,
    statusErrorInternal,
    statusErrorValidation
}