
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const isPasswordChangeOperationEnabled = async (operationId) => {
    const apiResult = await fetch(`${SIS_API_URL}/officer/password/operation/enabled/${operationId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const changePassword = async (operationId, newPassword, newPasswordRepeat) => {
    const apiResult = await fetch(`${SIS_API_URL}/officer/password/operation/change`, {
        body: JSON.stringify({
            operationId: operationId,
            newPassword: newPassword,
            newPasswordRepeat: newPasswordRepeat
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    });
    return await apiResult.json();
};

const forgotPassword = async (officerId) => {
    const apiResult = await fetch(`${SIS_API_URL}/officer/password/operation/forgot`, {
        body: JSON.stringify({
            officerId: officerId
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    });
    return await apiResult.json();
};


const OfficerPasswordOperationController = {
    isPasswordChangeOperationEnabled,
    changePassword,
    forgotPassword
};

export default OfficerPasswordOperationController;